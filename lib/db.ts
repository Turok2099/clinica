// lib/db.ts
import postgres from 'postgres';

// Proveemos un valor de respaldo temporal ("dummy") para evitar que el compilador
// (Next.js build) falle si no encuentra la variable de entorno en tiempo de construcción.
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:dummy@localhost:5432/postgres';

// Cliente nativo de PostgreSQL usando postgres.js con soporte para Tagged Templates y Serverless
export const sql = postgres(connectionString, {
  ssl: process.env.DATABASE_URL ? 'require' : false,
  max: 10,
  idle_timeout: 20,
  connect_timeout: 10,
});

// Helper para ejecutar consultas SQL seguras con tipado de retorno
export async function query<T = any>(
  strings: TemplateStringsArray,
  ...values: any[]
): Promise<T[]> {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set in environment variables (Runtime Error).');
  }
  
  try {
    // postgres.js permite pasar directamente el TemplateStringsArray y sus valores
    const result = await sql(strings, ...values);
    return result as unknown as T[];
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}
