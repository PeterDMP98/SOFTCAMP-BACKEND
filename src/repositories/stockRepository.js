import pool from "../config/db.js";

export const StockRepository = {
  findByUser: async (id_usuario) => {
    const query = `SELECT s.*, p.nombre as producto_nombre FROM stock_producto s JOIN productos p ON s.id_producto = p.id_producto WHERE s.id_usuario = $1 ORDER BY s.fecha_publicacion DESC`;
    const { rows } = await pool.query(query, [id_usuario]);
    return rows;
  },
  findById: async (id_stock) => {
    const query = `SELECT s.*, p.nombre as producto_nombre FROM stock_producto s JOIN productos p ON s.id_producto = p.id_producto WHERE s.id_stock_producto = $1`;
    const { rows } = await pool.query(query, [id_stock]);
    return rows[0];
  },
  findByIdAndUser: async (id_stock, id_usuario) => {
    const query = `SELECT * FROM stock_producto WHERE id_stock_producto = $1 AND id_usuario = $2`;
    const { rows } = await pool.query(query, [id_stock, id_usuario]);
    return rows[0];
  },
  create: async (data, id_usuario) => {
    const query = `INSERT INTO stock_producto (id_producto, id_usuario, unidad_de_medida, tipo_paquete, cantidad_en_paquetes, cantidad_stock, precio, estado, fecha_vencimiento, detalle, sync_status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`;
    const { rows } = await pool.query(query, [data.id_producto, id_usuario, data.unidad_de_medida || null, data.tipo_paquete || null, data.cantidad_en_paquetes || 0, data.cantidad_stock || 0, data.precio || 0, data.estado || 'disponible', data.fecha_vencimiento || null, data.detalle || null, false]);
    return rows[0];
  },
  update: async (id_stock, data, id_usuario) => {
    const existing = await this.findByIdAndUser(id_stock, id_usuario);
    if (!existing) return null;
    const merged = { ...existing, ...data };
    const query = `UPDATE stock_producto SET unidad_de_medida=$1, tipo_paquete=$2, cantidad_en_paquetes=$3, cantidad_stock=$4, precio=$5, estado=$6, fecha_vencimiento=$7, detalle=$8, sync_status=$9 WHERE id_stock_producto=$10 AND id_usuario=$11 RETURNING *`;
    const { rows } = await pool.query(query, [merged.unidad_de_medida, merged.tipo_paquete, merged.cantidad_en_paquetes, merged.cantidad_stock, merged.precio, merged.estado, merged.fecha_vencimiento, merged.detalle, true, id_stock, id_usuario]);
    return rows[0];
  },
  delete: async (id_stock, id_usuario) => {
    const query = `DELETE FROM stock_producto WHERE id_stock_producto = $1 AND id_usuario = $2 RETURNING id_stock_producto`;
    const { rows } = await pool.query(query, [id_stock, id_usuario]);
    return rows[0];
  }
};