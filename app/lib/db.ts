import { sql } from '@vercel/postgres';

export async function executeQuery(query, params = []) {
  try {
    const result = await sql.query(query, params);
    return result.rows;
  } catch (error) {
    console.error('Error ejecutando la consulta:', error);
    throw new Error('Error en la base de datos');
  }
}