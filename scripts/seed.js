// scripts/seed.js
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { Client } = require('pg');

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
      if (value.length > 0 && value.charAt(0) === '"' && value.charAt(value.length - 1) === '"') {
        value = value.substring(1, value.length - 1);
      }
      env[key] = value;
    }
  });
  return env;
}

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

async function run() {
  const env = loadEnv();
  const databaseUrl = env.DATABASE_URL;
  if (!databaseUrl) {
    console.error('DATABASE_URL no está definida en .env.local');
    process.exit(1);
  }

  console.log('Conectando a la base de datos Supabase para sembrar datos...');
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  const client = new Client({ 
    connectionString: databaseUrl,
    ssl: { rejectUnauthorized: false }
  });
  
  try {
    await client.connect();

    // Verificar si ya hay usuarios
    const countRes = await client.query('SELECT COUNT(*) FROM users');
    const count = parseInt(countRes.rows[0].count || '0', 10);
    
    if (count > 0) {
      console.log('La base de datos ya contiene registros. Limpiando para re-sembrar...');
      await client.query('TRUNCATE users, patient_profiles, specialist_profiles, cases, case_notes, appointments, audit_logs CASCADE');
    }

    const defaultPasswordHash = hashPassword('clinica123');

    // 1. Paciente Demo
    console.log('Insertando Paciente...');
    const pRes = await client.query(
      'INSERT INTO users (email, password_hash, role, full_name) VALUES ($1, $2, $3, $4) RETURNING id',
      ['paciente@cip.com', defaultPasswordHash, 'paciente', 'Carlos Gómez']
    );
    const pacienteId = pRes.rows[0].id;
    await client.query(
      'INSERT INTO patient_profiles (user_id, dob, gender, phone, height, weight, imc, historial_de_intentos, candidate_score) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
      [pacienteId, '1990-05-15', 'Masculino', '555-0199', 175.0, 95.0, 31.02, 'Intentó dieta keto en 2024 y ayuno intermitente sin supervisión médica, con rebote de 5kg.', 85]
    );

    // 2. Especialista Demo
    console.log('Insertando Especialista...');
    const eRes = await client.query(
      'INSERT INTO users (email, password_hash, role, full_name) VALUES ($1, $2, $3, $4) RETURNING id',
      ['doctor@cip.com', defaultPasswordHash, 'especialista', 'Dra. Elena Centeno']
    );
    const especialistaId = eRes.rows[0].id;
    await client.query(
      'INSERT INTO specialist_profiles (user_id, specialty, license_number) VALUES ($1, $2, $3)',
      [especialistaId, 'Nutrición y Control Metabólico', 'MET-894723']
    );

    // 3. Administrador TI Demo
    console.log('Insertando Administrador TI...');
    const aRes = await client.query(
      'INSERT INTO users (email, password_hash, role, full_name) VALUES ($1, $2, $3, $4) RETURNING id',
      ['admin@cip.com', defaultPasswordHash, 'admin_ti', 'Ing. Jorge Rodríguez']
    );
    const adminId = aRes.rows[0].id;

    // 4. Coordinador Demo
    console.log('Insertando Coordinador...');
    const cRes = await client.query(
      'INSERT INTO users (email, password_hash, role, full_name) VALUES ($1, $2, $3, $4) RETURNING id',
      ['coordinador@cip.com', defaultPasswordHash, 'coordinador', 'Mónica Sánchez']
    );
    const coordinadorId = cRes.rows[0].id;

    // Crear un caso clínico inicial
    console.log('Insertando Caso Clínico y Notas...');
    const caseRes = await client.query(
      'INSERT INTO cases (patient_id, title, description, status) VALUES ($1, $2, $3, $4) RETURNING id',
      [pacienteId, 'Caso 01-CG: Obesidad Grado I con Resistencia a la Insulina', 'Paciente varón de 36 años con IMC de 31.02. Muestra fatiga crónica y dificultad para perder peso. Exámenes de laboratorio indican glucosa en ayunas elevada (108 mg/dL) e insulina alta.', 'abierto']
    );
    const caseId = caseRes.rows[0].id;

    // Agregar una nota inicial del especialista
    await client.query(
      'INSERT INTO case_notes (case_id, author_id, note_content) VALUES ($1, $2, $3)',
      [caseId, especialistaId, 'Se recomienda iniciar el protocolo de optimización metabólica de 4 pilares. Ajustar carbohidratos en dieta y programar cita de seguimiento en 2 semanas. Realizar perfil lipídico y tiroideo completo.']
    );

    // Agregar una cita de prueba
    console.log('Insertando Cita de prueba...');
    await client.query(
      "INSERT INTO appointments (patient_id, specialist_id, appointment_date, google_event_id, notes) VALUES ($1, $2, NOW() + INTERVAL '3 days', $3, $4)",
      [pacienteId, especialistaId, 'evt_gcal_abc123xyz', 'Primera cita de ajuste del protocolo nutricional y control de bioimpedancia clínica. Traer orden de laboratorios.']
    );

    // Agregar logs de auditoría iniciales
    console.log('Insertando Logs de auditoría...');
    await client.query(
      'INSERT INTO audit_logs (user_id, action, details) VALUES ($1, $2, $3)',
      [coordinadorId, 'Creación de Cita', 'Cita agendada para el paciente Carlos Gómez con la Dra. Elena Centeno para dentro de 3 días.']
    );
    await client.query(
      'INSERT INTO audit_logs (user_id, action, details) VALUES ($1, $2, $3)',
      [especialistaId, 'Añadir Nota de Caso', 'Nota clínica de diagnóstico inicial añadida al caso del paciente Carlos Gómez (Caso 01-CG).']
    );
    await client.query(
      'INSERT INTO audit_logs (user_id, action, details) VALUES ($1, $2, $3)',
      [adminId, 'Configuración del Sistema', 'Inicialización y migración del esquema de base de datos Postgres en Neon completada.']
    );

    console.log('¡Base de datos sembrada con éxito!');
  } catch (error) {
    console.error('Error al sembrar la base de datos:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

run();
