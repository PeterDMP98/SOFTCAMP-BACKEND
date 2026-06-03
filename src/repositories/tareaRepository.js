import pool from "../config/db.js";

export const TareaRepository = {
  findByUsuario: async (id_usuario) => {
    const query = `SELECT * FROM tarea WHERE id_usuario = $1 ORDER BY fecha_limite ASC, creado_en DESC`;
    const { rows } = await pool.query(query, [id_usuario]);
    return rows;
  },
  findById: async (id_tarea) => {
    const query = `SELECT * FROM tarea WHERE id_tarea = $1`;
    const { rows } = await pool.query(query, [id_tarea]);
    return rows[0];
  },
  findByIdAndUser: async (id_tarea, id_usuario) => {
    const query = `SELECT * FROM tarea WHERE id_tarea = $1 AND id_usuario = $2`;
    const { rows } = await pool.query(query, [id_tarea, id_usuario]);
    return rows[0];
  },
  create: async (data, id_usuario) => {
    const query = `INSERT INTO tarea (titulo, detalle, estado, prioridad, fecha_limite, recordatorio, tipo_referencia, id_referencia, id_usuario, sync_status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`;
    const { rows } = await pool.query(query, [data.titulo, data.detalle || null, data.estado || 'pendiente', data.prioridad || 'media', data.fecha_limite || null, data.recordatorio || null, data.tipo_referencia || null, data.id_referencia || null, id_usuario, false]);
    return rows[0];
  },
  update: async (id_tarea, data, id_usuario) => {
    const existing = await this.findByIdAndUser(id_tarea, id_usuario);
    if (!existing) return null;
    const merged = { ...existing, ...data };
    const query = `UPDATE tarea SET titulo=$1, detalle=$2, estado=$3, prioridad=$4, fecha_limite=$5, recordatorio=$6, sync_status=$7 WHERE id_tarea=$8 AND id_usuario=$9 RETURNING *`;
    const { rows } = await pool.query(query, [merged.titulo, merged.detalle, merged.estado, merged.prioridad, merged.fecha_limite, merged.recordatorio, true, id_tarea, id_usuario]);
    return rows[0];
  },
  delete: async (id_tarea, id_usuario) => {
    const query = `DELETE FROM tarea WHERE id_tarea = $1 AND id_usuario = $2 RETURNING id_tarea`;
    const { rows } = await pool.query(query, [id_tarea, id_usuario]);
    return rows[0];
  }
};