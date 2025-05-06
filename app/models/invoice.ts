import pool from '../lib/db';

export async function getInvoices() {
  const { rows } = await pool.query('SELECT * FROM invoices ORDER BY date DESC');
  return rows;
}