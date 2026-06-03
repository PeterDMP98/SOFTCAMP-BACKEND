import pool from './src/config/db.js';

async function fix() {
  try {
    const client = await pool.connect();
    await client.query("ALTER TABLE ONLY public.convenio ADD COLUMN IF NOT EXISTS sync_status BOOLEAN DEFAULT false;");
    client.release();
    console.log("Columna añadida");
    process.exit(0);
  } catch(e) {
    console.log(e.message);
    process.exit(1);
  }
}
fix();