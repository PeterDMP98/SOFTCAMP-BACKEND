import pool from "../config/db.js";
import bcrypt from "bcryptjs";

const USER_WITH_ROLE_SELECT = `
  SELECT
    u.id_usuario,
    u.nombre,
    u.correo,
    u.contrasena,
    u.telefono,
    u.direccion,
    u.estado,
    u.fecha_registro,
    r.id_rol,
    r.nombre AS rol,
    rg.id_grupo,
    rg.nombre AS grupo
  FROM usuario u
  JOIN roles r ON u.id_rol = r.id_rol
  JOIN roles_grupo rg ON r.id_grupo = rg.id_grupo
`;

export const UsuarioRepository = {
  async findByEmail(correo) {
    const query = `${USER_WITH_ROLE_SELECT} WHERE u.correo = $1 LIMIT 1`;
    const { rows } = await pool.query(query, [correo]);
    return rows[0] || null;
  },

  async findById(id_usuario) {
    const query = `${USER_WITH_ROLE_SELECT} WHERE u.id_usuario = $1`;
    const { rows } = await pool.query(query, [id_usuario]);
    return rows[0] || null;
  },

  async create({ nombre, correo, telefono, direccion, password, id_rol }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `
      INSERT INTO usuario (
        nombre, correo, telefono, direccion, contrasena, id_rol, estado, fecha_registro
      )
      VALUES ($1, $2, $3, $4, $5, $6, 'activo', CURRENT_TIMESTAMP)
      RETURNING id_usuario, nombre, correo, telefono, direccion, id_rol, fecha_registro
    `;
    const values = [nombre, correo, telefono, direccion || null, hashedPassword, id_rol];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  async deleteById(id_usuario) {
    const query = `DELETE FROM usuario WHERE id_usuario = $1 RETURNING id_usuario`;
    const { rows } = await pool.query(query, [id_usuario]);
    return rows[0] || null;
  },

  async findByGrupoNombre(grupoNombre) {
    const query = `
      SELECT u.id_usuario, u.nombre, u.correo, u.telefono, rg.nombre AS grupo
      FROM usuario u
      JOIN roles r ON u.id_rol = r.id_rol
      JOIN roles_grupo rg ON r.id_grupo = rg.id_grupo
      WHERE rg.nombre = $1 AND u.estado = 'activo'
      ORDER BY u.nombre ASC
    `;
    const { rows } = await pool.query(query, [grupoNombre]);
    return rows;
  },
};
