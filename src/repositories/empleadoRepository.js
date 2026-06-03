import pool from "../config/db.js";

export const EmpleadoRepository = {
  findByUsuarioPadre: async (id_usuario_padre) => {
    const query = `
      SELECT u.id_usuario, u.nombre, u.correo, u.telefono, u.direccion, u.estado, r.nombre as rol
      FROM usuario u
      JOIN roles r ON u.id_rol = r.id_rol
      WHERE u.id_usuario_padre = $1
      ORDER BY u.fecha_registro DESC
    `;
    const { rows } = await pool.query(query, [id_usuario_padre]);
    return rows;
  },

  findById: async (id_empleado) => {
    const query = `SELECT * FROM usuario WHERE id_usuario = $1`;
    const { rows } = await pool.query(query, [id_empleado]);
    return rows[0];
  },

  findByIdAndPadre: async (id_empleado, id_usuario_padre) => {
    const query = `SELECT * FROM usuario WHERE id_usuario = $1 AND id_usuario_padre = $2`;
    const { rows } = await pool.query(query, [id_empleado, id_usuario_padre]);
    return rows[0];
  },

  create: async (data, id_usuario_padre) => {
    const query = `
      INSERT INTO usuario (nombre, correo, telefono, direccion, contrasena, id_rol, id_usuario_padre, estado, sync_status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, 'activo', $8) RETURNING id_usuario, nombre, correo, telefono, id_rol
    `;
    const bcrypt = await import("bcryptjs");
    const hashedPassword = await bcrypt.default.hash(data.contrasena || "password123", 10);
    const { rows } = await pool.query(query, [
      data.nombre, data.correo, data.telefono, data.direccion || null, 
      hashedPassword, data.id_rol || 1, id_usuario_padre, false
    ]);
    return rows[0];
  },

  update: async (id_empleado, data, id_usuario_padre) => {
    const existing = await this.findByIdAndPadre(id_empleado, id_usuario_padre);
    if (!existing) return null;
    const merged = { ...existing, ...data };
    const query = `UPDATE usuario SET nombre=$1, telefono=$2, direccion=$3, estado=$4, sync_status=$5 WHERE id_usuario=$6 AND id_usuario_padre=$7 RETURNING *`;
    const { rows } = await pool.query(query, [merged.nombre, merged.telefono, merged.direccion, merged.estado, true, id_empleado, id_usuario_padre]);
    return rows[0];
  },

  delete: async (id_empleado, id_usuario_padre) => {
    const query = `UPDATE usuario SET estado = 'inactivo', sync_status = true WHERE id_usuario = $1 AND id_usuario_padre = $2 RETURNING id_usuario`;
    const { rows } = await pool.query(query, [id_empleado, id_usuario_padre]);
    return rows[0];
  }
};