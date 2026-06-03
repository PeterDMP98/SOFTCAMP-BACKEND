import pool from "../config/db.js";

export const SiembraRepository = {
  async findByUser(id_usuario) {
    const query = `
      SELECT s.*, l.nombre as nombre_lote
      FROM siembra s
      LEFT JOIN lotes l ON s.id_lote = l.id_lote
      WHERE s.id_usuario = $1
      ORDER BY s.fecha_de_siembra DESC
    `;
    const { rows } = await pool.query(query, [id_usuario]);
    return rows;
  },

  async findById(id_siembra) {
    const query = `
      SELECT s.*, l.nombre as nombre_lote
      FROM siembra s
      LEFT JOIN lotes l ON s.id_lote = l.id_lote
      WHERE s.id_siembra = $1
    `;
    const { rows } = await pool.query(query, [id_siembra]);
    return rows[0];
  },

  async findByIdAndUser(id_siembra, id_usuario) {
    const query = `SELECT * FROM siembra WHERE id_siembra = $1 AND id_usuario = $2`;
    const { rows } = await pool.query(query, [id_siembra, id_usuario]);
    return rows[0];
  },

  async create(data, id_usuario) {
    const query = `
      INSERT INTO siembra (nombre, fecha_de_siembra, fecha_de_cosecha, estado, cantidad, id_usuario, id_lote, sync_status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;
    const { rows } = await pool.query(query, [
      data.nombre, data.fecha_de_siembra, data.fecha_de_cosecha || null,
      data.estado || 'Abierta', data.cantidad || null, id_usuario, data.id_lote || null, false
    ]);
    return rows[0];
  },

  async update(id_siembra, data, id_usuario) {
    const existing = await this.findByIdAndUser(id_siembra, id_usuario);
    if (!existing) return null;

    const mergedData = { ...existing, ...data };
    const query = `
      UPDATE siembra SET
        nombre = $1, fecha_de_siembra = $2, fecha_de_cosecha = $3,
        estado = $4, cantidad = $5, id_lote = $6, sync_status = $7
      WHERE id_siembra = $8 AND id_usuario = $9
      RETURNING *
    `;
    const { rows } = await pool.query(query, [
      mergedData.nombre, mergedData.fecha_de_siembra, mergedData.fecha_de_cosecha,
      mergedData.estado, mergedData.cantidad, mergedData.id_lote, true,
      id_siembra, id_usuario
    ]);
    return rows[0];
  },

  async delete(id_siembra, id_usuario) {
    const query = `DELETE FROM siembra WHERE id_siembra = $1 AND id_usuario = $2 RETURNING id_siembra`;
    const { rows } = await pool.query(query, [id_siembra, id_usuario]);
    return rows[0];
  }
};