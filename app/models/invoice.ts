import { sql } from '@vercel/postgres';

export async function getInvoices() {
  const { rows } = await sql`
    SELECT i.*, c.name as customer_name 
    FROM invoices i
    JOIN customers c ON i.customer_id = c.id
    ORDER BY i.date DESC
  `;
  return rows;
}

export async function getInvoiceById(id) {
  const { rows } = await sql`
    SELECT i.*, c.name as customer_name 
    FROM invoices i
    JOIN customers c ON i.customer_id = c.id
    WHERE i.id = ${id}
  `;
  return rows[0];
}

export async function createInvoice(invoiceData) {
  const { customer_id, amount, status, date, due_date, description } = invoiceData;
  const { rows } = await sql`
    INSERT INTO invoices (customer_id, amount, status, date, due_date, description)
    VALUES (${customer_id}, ${amount}, ${status}, ${date}, ${due_date}, ${description})
    RETURNING *
  `;
  return rows[0];
}

export async function updateInvoice(id, invoiceData) {
  const { customer_id, amount, status, date, due_date, description } = invoiceData;
  const { rows } = await sql`
    UPDATE invoices
    SET customer_id = ${customer_id},
        amount = ${amount},
        status = ${status},
        date = ${date},
        due_date = ${due_date},
        description = ${description}
    WHERE id = ${id}
    RETURNING *
  `;
  return rows[0];
}

export async function deleteInvoice(id) {
  const { rows } = await sql`DELETE FROM invoices WHERE id = ${id} RETURNING *`;
  return rows[0];
}

export async function getInvoiceCount() {
  const { rows } = await sql`SELECT COUNT(*) FROM invoices`;
  return parseInt(rows[0].count);
}

export async function getInvoicesByStatus() {
  const { rows } = await sql`
    SELECT status, COUNT(*) as count
    FROM invoices
    GROUP BY status
  `;
  return rows;
}