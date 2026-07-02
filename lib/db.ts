// lib/db.ts
import { neon } from '@neondatabase/serverless';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not set in environment variables.');
}

// Cliente nativo de base de datos Postgres de Neon usando SQL puro (con tag function)
// De acuerdo con la directriz 'Neon Data Architect', usamos el tag function nativo.
// El driver de Neon retorna un array de filas para consultas SQL estructuradas.
export const sql = neon(connectionString);

// Helper para ejecutar consultas SQL seguras con tipado de retorno
export async function query<T = any>(
  strings: TemplateStringsArray,
  ...values: any[]
): Promise<T[]> {
  try {
    // La función neon permite usarse como tagged template
    // Ejemplo: const users = await query`SELECT * FROM users WHERE email = ${email}`;
    const result = await sql(strings, ...values);
    return result as unknown as T[];
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}
