import pool from "../config/db.js";

export const RolesModel = {

  // Obtener todos los roles con su grupo
  async getAll() {
    const query = `
      SELECT 
        r.id_rol,
        r.nombre AS rol,
        rg.id_grupo,
        rg.nombre AS grupo
      FROM roles r
      JOIN roles_grupo rg ON r.id_grupo = rg.id_grupo
      ORDER BY r.id_rol
    `;
    const result = await pool.query(query);
    return result.rows;
  },

  // Obtener roles filtrados por grupo
  async getRolesByGrupo(id_grupo) {
    const query = `
      SELECT id_rol, nombre
      FROM roles
      WHERE id_grupo = $1
      ORDER BY id_rol
    `;
    const result = await pool.query(query, [id_grupo]);
    return result.rows;
  }
};
