import pool from "../config/db.js";
import bcrypt from "bcryptjs";

export const UsuarioModel = {

  // Buscar usuario por correo con rol y grupo
  async getByEmail(correo) {
    const query = `
      SELECT 
        u.id_usuario,
        u.nombre,
        u.correo,
        u.telefono,
        u.direccion,
        u.contrasena,
        u.estado,
        u.fecha_registro,
        r.id_rol,
        r.nombre AS rol,
        rg.id_grupo,
        rg.nombre AS grupo
      FROM usuario u
      JOIN roles r ON u.id_rol = r.id_rol
      JOIN roles_grupo rg ON r.id_grupo = rg.id_grupo
      WHERE u.correo = $1
      LIMIT 1
    `;
    const result = await pool.query(query, [correo]);
    return result.rows[0] || null;
  },

  // Buscar usuario por ID
  async getById(id_usuario) {
    const query = `
      SELECT 
        u.id_usuario,
        u.nombre,
        u.correo,
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
      WHERE u.id_usuario = $1
    `;
    const result = await pool.query(query, [id_usuario]);
    return result.rows[0] || null;
  },

  // Crear usuario
  async create({ nombre, correo, telefono, direccion, password, id_rol }) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO usuario (
        nombre,
        correo,
        telefono,
        direccion,
        contrasena,
        id_rol,
        estado,
        fecha_registro
      )
      VALUES ($1,$2,$3,$4,$5,$6,'activo',CURRENT_TIMESTAMP)
      RETURNING id_usuario, nombre, correo, telefono, id_rol
    `;

    const values = [nombre, correo, telefono, direccion, hashedPassword, id_rol];

    const result = await pool.query(query, values);
    return result.rows[0];
  }
};
