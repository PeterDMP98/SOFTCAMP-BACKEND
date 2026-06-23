import pool from "../config/db.js";

export const RolesRepository = {
  async findAllWithGrupo() {
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
    const { rows } = await pool.query(query);
    return rows;
  },

  async findAllGrupos() {
    const query = `SELECT id_grupo, nombre FROM roles_grupo ORDER BY id_grupo`;
    const { rows } = await pool.query(query);
    return rows;
  },

  async findByGrupo(id_grupo) {
    const query = `
      SELECT id_rol, nombre
      FROM roles
      WHERE id_grupo = $1
      ORDER BY id_rol
    `;
    const { rows } = await pool.query(query, [id_grupo]);
    return rows;
  },

  async findFirstRolByGrupo(id_grupo) {
    const query = `
      SELECT id_rol
      FROM roles
      WHERE id_grupo = $1
      ORDER BY id_rol
      LIMIT 1
    `;
    const { rows } = await pool.query(query, [id_grupo]);
    return rows[0] || null;
  },

  async findGrupoById(id_grupo) {
    const query = `SELECT id_grupo, nombre FROM roles_grupo WHERE id_grupo = $1`;
    const { rows } = await pool.query(query, [id_grupo]);
    return rows[0] || null;
  },
};
