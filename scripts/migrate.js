// scripts/migrate.js
const fs = require('fs');
const path = require('path');

// Función para cargar variables de entorno de .env.local de forma manual
function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env.local');
  if (!fs.existsSync(envPath)) {
    console.error('No se encontró el archivo .env.local');
    process.exit(1);
  }
  const content = fs.readFileSync(envPath, 'utf8');
  const env = {};
  content.split('\n').forEach(line => {
    const match = line.match(/^\s*([\w.\-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      let key = match[1];
      let value = match[2] || '';
      // Quitar comillas si las tiene
      if (value.length > 0 && value.charAt(0) === '"' && value.charAt(value.length - 1) === '"') {
        value = value.substring(1, value.length - 1);
      }
      env[key] = value;
    }
  });
  return env;
}

async function run() {
  const env = loadEnv();
  const databaseUrl = env.DATABASE_URL;
  if (!databaseUrl) {
    console.error('DATABASE_URL no está definida en .env.local');
    process.exit(1);
  }

  console.log('Conectando a la base de datos Supabase...');
  const migrationPath = path.join(__dirname, '..', 'migrations', '001_initial_schema.sql');
  console.log(`Leyendo migración desde: ${migrationPath}`);
  const sqlContent = fs.readFileSync(migrationPath, 'utf8');

  const { Client } = require('pg');
  const client = new Client({ 
    connectionString: databaseUrl,
    ssl: { rejectUnauthorized: false }
  });
  
  try {
    await client.connect();
    console.log('Conexión exitosa. Ejecutando migración SQL...');
    await client.query(sqlContent);
    console.log('¡Migración completada con éxito!');
  } catch (error) {
    console.error('Error al ejecutar la migración:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

run();
