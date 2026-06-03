import pool from "../config/db.js";

export const HistorialClinicoRepository = {
  async findByGanado(id_ganado, id_usuario) {
    const query = `
      SELECT hc.*
      FROM historial_clinico hc
      JOIN ganado g ON g.id_ganado = hc.id_ganado
      WHERE hc.id_ganado = $1 AND g.id_usuario = $2
      ORDER BY hc.fecha_de_registro DESC
    `;
    const { rows } = await pool.query(query, [id_ganado, id_usuario]);
    return rows;
  },

  async findById(id_historial_clinico) {
    const query = `
      SELECT hc.*, g.id_usuario
      FROM historial_clinico hc
      JOIN ganado g ON g.id_ganado = hc.id_ganado
      WHERE hc.id_historial_clinico = $1
    `;
    const { rows } = await pool.query(query, [id_historial_clinico]);
    return rows[0];
  },

  async findByIdAndUser(id_historial_clinico, id_usuario) {
    const query = `
      SELECT hc.* FROM historial_clinico hc
      JOIN ganado g ON g.id_ganado = hc.id_ganado
      WHERE hc.id_historial_clinico = $1 AND g.id_usuario = $2
    `;
    const { rows } = await pool.query(query, [id_historial_clinico, id_usuario]);
    return rows[0];
  },

  async create(id_ganado, data, id_usuario) {
    const query = `
      INSERT INTO historial_clinico (
        nombre_de_veterinario, telefono, correo, id_ganado, id_usuario_campesino,
        fecha_de_registro, tipo, detalles, precio, sync_status
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      RETURNING *
    `;
    const { rows } = await pool.query(query, [
      data.nombre_de_veterinario || null,
      data.telefono || null,
      data.correo || null,
      id_ganado,
      id_usuario,
      data.fecha_de_registro || new Date(),
      data.tipo || null,
      data.detalles || null,
      data.precio || null,
      false
    ]);
    return rows[0];
  },

  async update(id_historial_clinico, data, id_usuario) {
    const existing = await this.findByIdAndUser(id_historial_clinico, id_usuario);
    if (!existing) return null;

    const mergedData = { ...existing, ...data };
    const query = `
      UPDATE historial_clinico SET
        nombre_de_veterinario = $1, telefono = $2, correo = $3,
        fecha_de_cierre = $4, tipo = $5, detalles = $6, estado_de_consulta = $7, precio = $8, sync_status = $9
      WHERE id_historial_clinico = $10
      RETURNING *
    `;
    const { rows } = await pool.query(query, [
      mergedData.nombre_de_veterinario, mergedData.telefono, mergedData.correo,
      mergedData.fecha_de_cierre, mergedData.tipo, mergedData.detalles, mergedData.estado_de_consulta, mergedData.precio,
      true, id_historial_clinico
    ]);
    return rows[0];
  },

  async delete(id_historial_clinico, id_usuario) {
    const query = `
      DELETE FROM historial_clinico hc
      USING ganado g 
      WHERE g.id_ganado = hc.id_ganado 
        AND hc.id_historial_clinico = $1 
        AND g.id_usuario = $2
      RETURNING id_historial_clinico
    `;
    const { rows } = await pool.query(query, [id_historial_clinico, id_usuario]);
    return rows[0];
  }
};