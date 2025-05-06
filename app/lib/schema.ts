import pool from './db';

export async function createTables() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS customers (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255),
      email VARCHAR(255),
      phone VARCHAR(50),
      address VARCHAR(255),
      created_at TIMESTAMP DEFAULT NOW()
    );
    CREATE TABLE IF NOT EXISTS invoices (
      id SERIAL PRIMARY KEY,
      customer_id INTEGER REFERENCES customers(id),
      amount NUMERIC,
      status VARCHAR(50),
      date DATE,
      due_date DATE,
      description TEXT,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);
}