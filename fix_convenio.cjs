const pool = require('./src/config/db.js');

async function fix() {
  try {
    await pool.query("ALTER TABLE ONLY public.convenio ADD COLUMN sync_status BOOLEAN DEFAULT false;");
    console.log("Columna añadida");
    process.exit(0);
  } catch(e) {
    console.log(e.message);
    process.exit(1);
  }
}
fix();