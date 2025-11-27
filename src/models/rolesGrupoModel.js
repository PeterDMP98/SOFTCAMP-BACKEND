import pool from "../config/db.js";

export const RolesGrupoModel = {

  // Listar grupos existentes
  getAll: async () => {
    const query = `SELECT id_grupo, nombre FROM roles_grupo ORDER BY id_grupo`;
    const result = await pool.query(query);
    return result.rows;
  },

  // Obtener grupo por ID
  async getById(id_grupo) {
    const query = `
      SELECT id_grupo, nombre
      FROM roles_grupo
      WHERE id_grupo = $1
    `;
    const result = await pool.query(query, [id_grupo]);
    return result.rows[0] || null;
  }
};
