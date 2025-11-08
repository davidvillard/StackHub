const fs = require('fs');
const path = require('path');

// Función para limpiar valores de CSV
function cleanForCSV(str) {
  if (typeof str !== 'string') return str;
  // Escapa las comillas dobles duplicándolas
  return str.replace(/"/g, '""');
}

// Función para convertir recursos a CSV
function convertToCSV() {
  // Lee el archivo de recursos como texto
  const resourcesPath = path.join(__dirname, '..', 'data', 'resources.js');
  const resourcesContent = fs.readFileSync(resourcesPath, 'utf-8');
  
  // Extrae el objeto resources usando eval (en este contexto controlado es seguro)
  // Elimina la línea de export y ejecuta el código
  const resourcesCode = resourcesContent
    .replace('export default resources;', '')
    .replace('const resources = ', 'return ');
  
  const resources = new Function(resourcesCode)();

  // Encabezados del CSV
  let csv = 'category,title,description,url,imageUrl,tags\n';

  // Procesa cada categoría
  Object.entries(resources).forEach(([category, items]) => {
    // Verifica que items sea un array
    if (!Array.isArray(items)) {
      console.warn(`⚠️ La categoría "${category}" no contiene un array válido`);
      return;
    }

    items.forEach(item => {
      // Limpia y formatea cada campo
      const row = [
        category,
        cleanForCSV(item.title || ''),
        cleanForCSV(item.description || ''),
        item.url || '',
        item.image || '',
        Array.isArray(item.tags) ? item.tags.join(',') : ''
      ].map(field => `"${field}"`).join(',');

      csv += row + '\n';
    });
  });

  // Escribe el archivo
  const outputPath = path.join(__dirname, '..', 'resources.csv');
  fs.writeFileSync(outputPath, csv, 'utf-8');
  
  // Cuenta los recursos totales
  const totalResources = Object.values(resources).reduce((sum, items) => 
    sum + (Array.isArray(items) ? items.length : 0), 0
  );
  
  console.log('✅ Archivo CSV generado exitosamente');
  console.log(`📊 Total de recursos exportados: ${totalResources}`);
  console.log(`📁 Archivo guardado en: ${outputPath}`);
}

// Ejecuta la conversión
convertToCSV();