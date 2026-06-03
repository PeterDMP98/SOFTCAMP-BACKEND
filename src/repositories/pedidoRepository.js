import pool from "../config/db.js";

export const PedidoRepository = {
  findByUsuario: async (id_usuario) => {
    const query = `SELECT p.*, e.nombre as estado_nombre FROM pedido p LEFT JOIN estado_pedido e ON p.id_estado = e.id_estado WHERE p.id_usuario_campesino = $1 OR p.id_usuario_comprador = $1 ORDER BY p.fecha_de_pedido DESC`;
    const { rows } = await pool.query(query, [id_usuario]);
    return rows;
  },
  findById: async (id_pedido) => {
    const query = `SELECT p.*, e.nombre as estado_nombre FROM pedido p LEFT JOIN estado_pedido e ON p.id_estado = e.id_estado WHERE p.id_pedido = $1`;
    const { rows } = await pool.query(query, [id_pedido]);
    return rows[0];
  },
  findByIdAndUser: async (id_pedido, id_usuario) => {
    const query = `SELECT * FROM pedido WHERE id_pedido = $1 AND (id_usuario_campesino = $2 OR id_usuario_comprador = $2)`;
    const { rows } = await pool.query(query, [id_pedido, id_usuario]);
    return rows[0];
  },
  create: async (data, id_campesino, id_comprador) => {
    const query = `INSERT INTO pedido (codigo_de_compra, id_usuario_campesino, id_usuario_comprador, id_estado, tipo_de_envio, direccion, quien_recibe, fecha_de_entrega, total_descuentos, total, sync_status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`;
    const codigo = 'PED-' + Date.now();
    const { rows } = await pool.query(query, [codigo, id_campesino, id_comprador, 1, data.tipo_de_envio || null, data.direccion || null, data.quien_recibe || null, data.fecha_de_entrega || null, data.total_descuentos || 0, data.total || 0, false]);
    return rows[0];
  },
  update: async (id_pedido, data, id_usuario) => {
    const existing = await this.findByIdAndUser(id_pedido, id_usuario);
    if (!existing) return null;
    const merged = { ...existing, ...data };
    const query = `UPDATE SET tipo_de_envio=$1, direccion=$2, quien_recibe=$3, fecha_de_entrega=$4, id_estado=$5, sync_status=$6 WHERE id_pedido=$7 RETURNING *`;
    const { rows } = await pool.query(query, [merged.tipo_de_envio, merged.direccion, merged.quien_recibe, merged.fecha_de_entrega, merged.id_estado || 1, true, id_pedido]);
    return rows[0];
  },
  delete: async (id_pedido, id_usuario) => {
    const query = `DELETE FROM pedido WHERE id_pedido = $1 AND id_usuario_campesino = $2 RETURNING id_pedido`;
    const { rows } = await pool.query(query, [id_pedido, id_usuario]);
    return rows[0];
  }
};