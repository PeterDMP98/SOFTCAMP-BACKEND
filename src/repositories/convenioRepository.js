import pool from "../config/db.js";

export const ConvenioRepository = {
  findByCampesino: async (id_usuario_campesino) => {
    const query = `SELECT c.*, u.nombre as comprador_nombre FROM convenio c JOIN usuario u ON c.id_usuario_comprador = u.id_usuario WHERE c.id_usuario_campesino = $1 ORDER BY c.fecha_creacion DESC`;
    const { rows } = await pool.query(query, [id_usuario_campesino]);
    return rows;
  },
  findById: async (id_convenio) => {
    const query = `SELECT c.*, u.nombre as comprador_nombre FROM convenio c JOIN usuario u ON c.id_usuario_comprador = u.id_usuario WHERE c.id_convenio = $1`;
    const { rows } = await pool.query(query, [id_convenio]);
    return rows[0];
  },
  findByIdAndUser: async (id_convenio, id_usuario) => {
    const query = `SELECT * FROM convenio WHERE id_convenio = $1 AND (id_usuario_campesino = $2 OR id_usuario_comprador = $2)`;
    const { rows } = await pool.query(query, [id_convenio, id_usuario]);
    return rows[0];
  },
  create: async (data, id_usuario_campesino, id_usuario_comprador) => {
    const query = `INSERT INTO convenio (id_usuario_campesino, id_usuario_comprador, descuento, detalle_de_contrato, fecha_fin, estado, sync_status) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`;
    const { rows } = await pool.query(query, [id_usuario_campesino, id_usuario_comprador, data.descuento || 0, data.detalle_de_contrato || null, data.fecha_fin || null, data.estado || 'activo', false]);
    return rows[0];
  },
  update: async (id_convenio, data, id_usuario) => {
    const existing = await this.findByIdAndUser(id_convenio, id_usuario);
    if (!existing) return null;
    const merged = { ...existing, ...data };
    const query = `UPDATE SET descuento=$1, detalle_de_contrato=$2, fecha_fin=$3, estado=$4, sync_status=$5 WHERE id_convenio=$6 RETURNING *`;
    const { rows } = await pool.query(query, [merged.descuento, merged.detalle_de_contrato, merged.fecha_fin, merged.estado, true, id_convenio]);
    return rows[0];
  },
  delete: async (id_convenio, id_usuario) => {
    const query = `DELETE FROM convenio WHERE id_convenio = $1 AND id_usuario_campesino = $2 RETURNING id_convenio`;
    const { rows } = await pool.query(query, [id_convenio, id_usuario]);
    return rows[0];
  }
};