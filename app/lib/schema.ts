import { sql } from '@vercel/postgres';

export async function createTables() {
  try {
    // Crear tabla de clientes
    await sql`
      CREATE TABLE IF NOT EXISTS customers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(50),
        address TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Crear tabla de facturas
    await sql`
      CREATE TABLE IF NOT EXISTS invoices (
        id SERIAL PRIMARY KEY,
        customer_id INTEGER REFERENCES customers(id),
        amount DECIMAL(10, 2) NOT NULL,
        status VARCHAR(50) NOT NULL,
        date DATE NOT NULL,
        due_date DATE,
        description TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;

    console.log('Tablas creadas correctamente');
    return { success: true };
  } catch (error) {
    console.error('Error al crear tablas:', error);
    return { success: false, error };
  }
}