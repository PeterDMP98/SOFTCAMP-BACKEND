import pool from "../config/db.js";

export const LoteRepository = {
  async findByUser(id_usuario, includeInactive = false) {
    const query = includeInactive
      ? `SELECT * FROM lotes WHERE id_usuario = $1 ORDER BY fecha_registro DESC`
      : `SELECT * FROM lotes WHERE id_usuario = $1 AND activo = true ORDER BY fecha_registro DESC`;
    const { rows } = await pool.query(query, [id_usuario]);
    return rows;
  },

  async findById(id_lote, id_usuario) {
    const query = `SELECT * FROM lotes WHERE id_lote = $1 AND id_usuario = $2`;
    const { rows } = await pool.query(query, [id_lote, id_usuario]);
    return rows[0];
  },

  async findByIdAndUser(id_lote, id_usuario) {
    return this.findById(id_lote, id_usuario);
  },

  async findInactiveByUser(id_usuario) {
    const query = `SELECT * FROM lotes WHERE id_usuario = $1 AND activo = false ORDER BY fecha_registro DESC`;
    const { rows } = await pool.query(query, [id_usuario]);
    return rows;
  },

  async create(data, id_usuario) {
    const query = `
      INSERT INTO lotes (nombre, tamano_hectareas, descripcion, id_usuario, sync_status)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const { rows } = await pool.query(query, [
      data.nombre,
      data.tamano_hectareas || null,
      data.descripcion || null,
      id_usuario,
      false
    ]);
    return rows[0];
  },

  async update(id_lote, data, id_usuario) {
    const existing = await this.findByIdAndUser(id_lote, id_usuario);
    if (!existing) return null;

    const mergedData = { ...existing, ...data };

    const query = `
      UPDATE lotes SET
        nombre = $1,
        tamano_hectareas = $2,
        descripcion = $3,
        sync_status = $4
      WHERE id_lote = $5 AND id_usuario = $6
      RETURNING *
    `;
    const { rows } = await pool.query(query, [
      mergedData.nombre,
      mergedData.tamano_hectareas || null,
      mergedData.descripcion || null,
      true,
      id_lote,
      id_usuario
    ]);
    return rows[0];
  },

  async deactivate(id_lote, id_usuario) {
    const query = `
      UPDATE lotes SET activo = false, sync_status = true
      WHERE id_lote = $1 AND id_usuario = $2
      RETURNING *
    `;
    const { rows } = await pool.query(query, [id_lote, id_usuario]);
    return rows[0];
  },

  async reactivate(id_lote, id_usuario) {
    const query = `
      UPDATE lotes SET activo = true, sync_status = true
      WHERE id_lote = $1 AND id_usuario = $2
      RETURNING *
    `;
    const { rows } = await pool.query(query, [id_lote, id_usuario]);
    return rows[0];
  },

  async delete(id_lote, id_usuario) {
    const query = `DELETE FROM lotes WHERE id_lote = $1 AND id_usuario = $2 RETURNING id_lote`;
    const { rows } = await pool.query(query, [id_lote, id_usuario]);
    return rows[0];
  }
};