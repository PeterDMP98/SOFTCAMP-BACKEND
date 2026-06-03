import pool from "../config/db.js";

export const ProductoRepository = {
  findByUser: async (id_usuario) => {
    const query = `SELECT p.*, c.nombre as categoria_nombre FROM productos p LEFT JOIN categoria_producto c ON p.id_categoria = c.id_categoria_producto WHERE p.id_usuario = $1 ORDER BY p.creado_en DESC`;
    const { rows } = await pool.query(query, [id_usuario]);
    return rows;
  },
  findById: async (id_producto) => {
    const query = `SELECT p.*, c.nombre as categoria_nombre FROM productos p LEFT JOIN categoria_producto c ON p.id_categoria = c.id_categoria_producto WHERE p.id_producto = $1`;
    const { rows } = await pool.query(query, [id_producto]);
    return rows[0];
  },
  findByIdAndUser: async (id_producto, id_usuario) => {
    const query = `SELECT * FROM productos WHERE id_producto = $1 AND id_usuario = $2`;
    const { rows } = await pool.query(query, [id_producto, id_usuario]);
    return rows[0];
  },
  create: async (data, id_usuario) => {
    const query = `INSERT INTO productos (nombre, id_categoria, origen_tipo, origen_id, descriptcion, unidad_de_medida, cantidad_total, id_usuario, sync_status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`;
    const { rows } = await pool.query(query, [data.nombre, data.id_categoria || 1, data.origen_tipo || null, data.origen_id || null, data.descriptcion || null, data.unidad_de_medida, data.cantidad_total || 0, id_usuario, false]);
    return rows[0];
  },
  update: async (id_producto, data, id_usuario) => {
    const existing = await this.findByIdAndUser(id_producto, id_usuario);
    if (!existing) return null;
    const merged = { ...existing, ...data };
    const query = `UPDATE productos SET nombre=$1, id_categoria=$2, descriptcion=$3, unidad_de_medida=$4, cantidad_total=$5, sync_status=$6 WHERE id_producto=$7 AND id_usuario=$8 RETURNING *`;
    const { rows } = await pool.query(query, [merged.nombre, merged.id_categoria, merged.descriptcion, merged.unidad_de_medida, merged.cantidad_total, true, id_producto, id_usuario]);
    return rows[0];
  },
  delete: async (id_producto, id_usuario) => {
    const query = `DELETE FROM productos WHERE id_producto = $1 AND id_usuario = $2 RETURNING id_producto`;
    const { rows } = await pool.query(query, [id_producto, id_usuario]);
    return rows[0];
  }
};