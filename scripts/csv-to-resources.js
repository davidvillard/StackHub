const fs = require('fs');
const path = require('path');
const csv = require('csv-parse/sync');
const fetch = require('node-fetch');

const csvPath = path.join(__dirname, '..', 'resources.csv');
const outputPath = path.join(__dirname, '..', 'data', 'resources.js');
const imagesDir = path.join(__dirname, '..', 'public', 'images', 'resources');

if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

function makeId(title) {
  return (title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// Función mejorada para obtener imagen
async function getResourceImage(url, title) {
  try {
    const fileName = makeId(title) + '.jpg';
    const filePath = path.join(imagesDir, fileName);

    // Si ya existe, usar la local
    if (fs.existsSync(filePath)) {
      return `/images/resources/${fileName}`;
    }

    // Reemplaza AQUI_TU_TOKEN con tu token real de screenshotapi.net
    const screenshotUrl = `https://shot.screenshotapi.net/screenshot?token=N6D0SME-1X8M98S-MYX02AW-7MZ0G52&url=${encodeURIComponent(url)}&width=1200&height=630&output=image&file_type=jpeg&wait_for_event=load`;
    
    console.log(`📸 Capturando screenshot de: ${title}`);
    const res = await fetch(screenshotUrl, { timeout: 30000 });
    
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    
    const buffer = await res.buffer();
    fs.writeFileSync(filePath, buffer);
    
    console.log(`✅ Screenshot guardado: ${fileName}`);
    return `/images/resources/${fileName}`;
  } catch (error) {
    console.warn(`⚠️  No se pudo obtener screenshot (${title}): ${error.message}`);
    // Fallback: dejar la URL original o usar un placeholder
    return url || '/images/placeholder.jpg';
  }
}

function readExistingResources() {
  if (!fs.existsSync(outputPath)) return {};
  try {
    const content = fs.readFileSync(outputPath, 'utf-8');
    const cleaned = content
      .replace(/\/\/.*\n/g, '')
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/export\s+default\s+resources\s*;?/i, '')
      .replace(/const\s+resources\s*=\s*/, 'return ');
    const resources = new Function(cleaned)();
    return resources && typeof resources === 'object' ? resources : {};
  } catch (err) {
    console.error('Error leyendo data/resources.js:', err.message);
    return {};
  }
}

async function processResources() {
  const csvContent = fs.readFileSync(csvPath, 'utf-8');
  const records = csv.parse(csvContent, { columns: true, skip_empty_lines: true });
  
  const existing = readExistingResources();
  const merged = { ...existing };

  let added = 0;
  let updated = 0;

  for (const record of records) {
    const category = (record.category || '').trim();
    const title = (record.title || '').trim();
    const description = (record.description || '').trim();
    const url = (record.url || '').trim();
    const tags = (record.tags || '').split(',').map(t => t.trim()).filter(Boolean);

    if (!category || !title) continue;

    const id = makeId(title);

    if (!Array.isArray(merged[category])) merged[category] = [];

    const existingIndex = merged[category].findIndex(
      it => (it.id && it.id === id) || (it.url && it.url === url && url)
    );

    if (existingIndex === -1) {
      // Nuevo recurso: obtener screenshot
      const localImage = await getResourceImage(url, title);
      const resource = {
        id,
        title,
        description,
        url,
        image: localImage,
        tags
      };
      merged[category].push(resource);
      added++;
      
      // Pequeña pausa entre requests para no saturar la API
      await new Promise(resolve => setTimeout(resolve, 1000));
    } else {
      const existingItem = merged[category][existingIndex];
      let changed = false;

      if ((!existingItem.description || existingItem.description.trim() === '') && description) {
        existingItem.description = description;
        changed = true;
      }
      if ((!existingItem.url || existingItem.url.trim() === '') && url) {
        existingItem.url = url;
        changed = true;
      }
      if ((!existingItem.image || /^https?:\/\//i.test(existingItem.image)) && url) {
        const localImage = await getResourceImage(url, title);
        if (localImage && localImage !== existingItem.image) {
          existingItem.image = localImage;
          changed = true;
        }
      }
      
      const existingTags = Array.isArray(existingItem.tags) ? existingItem.tags : [];
      const mergedTags = Array.from(new Set([...existingTags, ...tags]));
      if (mergedTags.length !== existingTags.length) {
        existingItem.tags = mergedTags;
        changed = true;
      }
      if (changed) updated++;
    }
  }

  const jsContent = `// Este archivo es generado automáticamente por scripts/csv-to-resources.js
// No editar manualmente

const resources = ${JSON.stringify(merged, null, 2)};

export default resources;
`;
  fs.writeFileSync(outputPath, jsContent, 'utf-8');
  console.log(`✅ Proceso finalizado. Agregados: ${added}. Actualizados: ${updated}.`);
  const total = Object.values(merged).reduce((s, arr) => s + (Array.isArray(arr) ? arr.length : 0), 0);
  console.log(`📦 Total recursos ahora: ${total}`);
}

processResources().catch(err => {
  console.error('Error en processResources:', err);
  process.exit(1);
});