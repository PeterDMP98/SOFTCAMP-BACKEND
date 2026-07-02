import pool from "../config/db.js";

export const RegistroPesajeRepository = {
  async findByUser(id_usuario) {
    const query = `
      SELECT rp.*, g.nombre_animal as ganado_nombre, g.numero_identificacion as ganado_identificacion
      FROM registros_pesajes rp
      JOIN ganado g ON g.id_ganado = rp.id_ganado
      WHERE g.id_usuario = $1
      ORDER BY rp.fecha_registro DESC
    `;
    const { rows } = await pool.query(query, [id_usuario]);
    return rows;
  },

  async findByGanado(id_ganado) {
    const query = `SELECT * FROM registros_pesajes WHERE id_ganado = $1 ORDER BY fecha_registro DESC`;
    const { rows } = await pool.query(query, [id_ganado]);
    return rows;
  },

  async findById(id_registro_pesaje) {
    const query = `SELECT rp.*, g.id_usuario FROM registros_pesajes rp JOIN ganado g ON g.id_ganado = rp.id_ganado WHERE rp.id_registros_pesajes = $1`;
    const { rows } = await pool.query(query, [id_registro_pesaje]);
    return rows[0];
  },

  async findByIdAndUser(id_registro_pesaje, id_usuario) {
    const query = `SELECT rp.* FROM registros_pesajes rp JOIN ganado g ON g.id_ganado = rp.id_ganado WHERE rp.id_registros_pesajes = $1 AND g.id_usuario = $2`;
    const { rows } = await pool.query(query, [id_registro_pesaje, id_usuario]);
    return rows[0];
  },

  async create(id_ganado, data) {
    const query = `INSERT INTO registros_pesajes (id_ganado, peso, observaciones, sync_status) VALUES ($1, $2, $3, $4) RETURNING *`;
    const { rows } = await pool.query(query, [id_ganado, data.peso, data.observaciones || null, false]);
    return rows[0];
  },

  async update(id_registro_pesaje, data, id_usuario) {
    const existing = await this.findByIdAndUser(id_registro_pesaje, id_usuario);
    if (!existing) return null;

    const mergedData = { ...existing, ...data };
    const query = `UPDATE registros_pesajes SET peso = $1, observaciones = $2, sync_status = $3 WHERE id_registros_pesajes = $4 RETURNING *`;
    const { rows } = await pool.query(query, [mergedData.peso, mergedData.observaciones, true, id_registro_pesaje]);
    return rows[0];
  },

  async delete(id_registro_pesaje, id_usuario) {
    const query = `DELETE FROM registros_pesajes rp USING ganado g WHERE g.id_ganado = rp.id_ganado AND rp.id_registros_pesajes = $1 AND g.id_usuario = $2 RETURNING id_registros_pesajes`;
    const { rows } = await pool.query(query, [id_registro_pesaje, id_usuario]);
    return rows[0];
  }
};