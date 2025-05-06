import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Asegúrate de tener esta variable en Vercel y local
  ssl: { rejectUnauthorized: false }
});

export default pool;