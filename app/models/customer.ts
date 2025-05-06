import { sql } from '@vercel/postgres';

export async function getCustomers() {
  const { rows } = await sql`SELECT * FROM customers ORDER BY name`;
  return rows;
}

export async function getCustomerById(id) {
  const { rows } = await sql`SELECT * FROM customers WHERE id = ${id}`;
  return rows[0];
}

export async function createCustomer(customerData) {
  const { name, email, phone, address } = customerData;
  const { rows } = await sql`
    INSERT INTO customers (name, email, phone, address)
    VALUES (${name}, ${email}, ${phone}, ${address})
    RETURNING *
  `;
  return rows[0];
}

export async function getCustomerCount() {
  const { rows } = await sql`SELECT COUNT(*) FROM customers`;
  return parseInt(rows[0].count);
}