import fetch from 'node-fetch';
import fs from 'fs-extra';
import path from 'path';
import { parse } from 'csv-parse/sync';

// Configuración de carpetas por categoría
const categoryFolders = {
  icons: 'public/icons/',
  logos: 'public/logos/',
  illustrations: 'public/illustrations/',
  images: 'public/images/',
  videos: 'public/videos/',
  fonts: 'public/fonts/',
  colors: 'public/colors/',
  background: 'public/backgrounds/',
  tools: 'public/tools/',
  components: 'public/components/',
  inspirations: 'public/inspirations/',
  librerias: 'public/librerias/',
  ia: 'public/ia/'
};

// Función para limpiar nombre de archivo
function cleanFileName(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remover caracteres especiales
    .replace(/\s+/g, '-')     // Reemplazar espacios con guiones
    .replace(/-+/g, '-')      // Evitar guiones múltiples
    .trim();
}

// Función para descargar imagen
async function downloadImage(imageUrl, destPath) {
  try {
    console.log(`Descargando imagen: ${imageUrl}`);
    
    const response = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const buffer = await response.buffer();
    
    // Asegurar que el directorio existe
    await fs.ensureDir(path.dirname(destPath));
    
    // Escribir el archivo
    await fs.writeFile(destPath, buffer);
    console.log(`✅ Imagen guardada: ${destPath}`);
    
    return true;
  } catch (error) {
    console.error(`❌ Error descargando imagen ${imageUrl}:`, error.message);
    return false;
  }
}

// Función para obtener extensión de archivo desde URL
function getFileExtension(url) {
  try {
    const pathname = new URL(url).pathname;
    const ext = path.extname(pathname).toLowerCase();
    
    // Extensiones válidas para imágenes
    const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    
    if (validExtensions.includes(ext)) {
      return ext;
    }
    
    // Si no hay extensión válida, usar .jpg por defecto
    return '.jpg';
  } catch (error) {
    console.warn(`No se pudo determinar extensión para ${url}, usando .jpg`);
    return '.jpg';
  }
}

// Función para leer el archivo resources.js actual
function readResourcesFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Extraer el objeto resources usando regex
    const match = content.match(/const resources = ({[\s\S]*?});[\s\S]*export default resources/);
    
    if (!match) {
      throw new Error('No se pudo encontrar el objeto resources en el archivo');
    }
    
    // Evaluar el objeto JavaScript de forma segura
    const resourcesString = match[1];
    const resources = eval(`(${resourcesString})`);
    
    return resources;
  } catch (error) {
    console.error('Error leyendo el archivo resources.js:', error.message);
    process.exit(1);
  }
}

// Función para escribir el archivo resources.js actualizado
function writeResourcesFile(filePath, resources) {
  try {
    const newContent = `const resources = ${JSON.stringify(resources, null, 2)};

export default resources;`;
    
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log('✅ Archivo resources.js actualizado correctamente');
  } catch (error) {
    console.error('Error escribiendo el archivo resources.js:', error.message);
    process.exit(1);
  }
}

// Función principal
async function processResources() {
  console.log('🚀 Iniciando procesamiento de recursos...\n');
  
  // Rutas de archivos
  const csvPath = 'resources.csv';
  const resourcesPath = 'data/resources.js';
  
  // Verificar que existan los archivos
  if (!fs.existsSync(csvPath)) {
    console.error(`❌ No se encuentra el archivo CSV: ${csvPath}`);
    process.exit(1);
  }
  
  if (!fs.existsSync(resourcesPath)) {
    console.error(`❌ No se encuentra el archivo resources.js: ${resourcesPath}`);
    process.exit(1);
  }
  
  // Leer CSV
  console.log('📄 Leyendo archivo CSV...');
  const csvContent = fs.readFileSync(csvPath, 'utf8');
  const records = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true
  });
  
  console.log(`📊 Encontrados ${records.length} registros en el CSV\n`);
  
  // Leer archivo resources.js actual
  console.log('📄 Leyendo archivo resources.js actual...');
  const resources = readResourcesFile(resourcesPath);
  
  let processedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;
  
  // Procesar cada registro
  for (const [index, record] of records.entries()) {
    console.log(`\n📝 Procesando registro ${index + 1}/${records.length}:`);
    console.log(`   Título: ${record.title}`);
    console.log(`   Categoría: ${record.category}`);
    
    const { category, title, description, url, imageUrl, tags } = record;
    
    // Validar campos requeridos
    if (!category || !title || !description || !url || !imageUrl) {
      console.error('❌ Faltan campos requeridos, saltando registro');
      skippedCount++;
      continue;
    }
    
    // Verificar que la categoría existe
    if (!resources[category]) {
      console.error(`❌ Categoría '${category}' no existe en resources.js`);
      skippedCount++;
      continue;
    }
    
    // Verificar si ya existe (por título o URL)
    const existsByTitle = resources[category].some(r => r.title === title);
    const existsByUrl = resources[category].some(r => r.url === url);
    
    if (existsByTitle || existsByUrl) {
      console.log('⚠️  El recurso ya existe, saltando...');
      skippedCount++;
      continue;
    }
    
    // Obtener carpeta de destino
    const folder = categoryFolders[category];
    if (!folder) {
      console.error(`❌ No hay carpeta configurada para la categoría '${category}'`);
      skippedCount++;
      continue;
    }
    
    // Generar nombre de archivo para la imagen
    const fileExtension = getFileExtension(imageUrl);
    const fileName = cleanFileName(title) + fileExtension;
    const destPath = path.join(folder, fileName);
    
    // Descargar imagen
    const downloadSuccess = await downloadImage(imageUrl, destPath);
    
    if (!downloadSuccess) {
      console.error('❌ No se pudo descargar la imagen, saltando recurso');
      errorCount++;
      continue;
    }
    
    // Calcular nuevo ID
    const maxId = resources[category].reduce((max, r) => {
      return (r.id && r.id > max) ? r.id : max;
    }, 0);
    
    // Crear nuevo recurso
    const newResource = {
      id: maxId + 1,
      title: title,
      description: description,
      url: url,
      image: `/${category}/${fileName}`,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
    };
    
    // Agregar al final del array de la categoría
    resources[category].push(newResource);
    
    console.log(`✅ Recurso agregado con ID ${newResource.id}`);
    processedCount++;
    
    // Pequeña pausa para evitar sobrecargar el servidor
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  // Guardar archivo resources.js actualizado
  if (processedCount > 0) {
    console.log('\n💾 Guardando cambios en resources.js...');
    writeResourcesFile(resourcesPath, resources);
  }
  
  // Resumen final
  console.log('\n📊 RESUMEN:');
  console.log(`✅ Recursos procesados: ${processedCount}`);
  console.log(`⚠️  Recursos saltados: ${skippedCount}`);
  console.log(`❌ Errores: ${errorCount}`);
  console.log(`📄 Total de registros: ${records.length}`);
  
  if (processedCount > 0) {
    console.log('\n🎉 ¡Proceso completado exitosamente!');
  } else {
    console.log('\n⚠️  No se procesaron nuevos recursos.');
  }
}

// Ejecutar script
processResources().catch(error => {
  console.error('💥 Error fatal:', error);
  process.exit(1);
});

export { processResources };