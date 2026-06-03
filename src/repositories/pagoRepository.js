import pool from "../config/db.js";

export const PagoRepository = {
  findByUsuario: async (id_usuario) => {
    const query = `SELECT p.*, ped.codigo_de_compra FROM pago p JOIN pedido ped ON p.id_pedido = ped.id_pedido WHERE ped.id_usuario_campesino = $1 OR ped.id_usuario_comprador = $1 ORDER BY p.fecha_pago DESC`;
    const { rows } = await pool.query(query, [id_usuario]);
    return rows;
  },
  findById: async (id_pago) => {
    const query = `SELECT * FROM pago WHERE id_pago = $1`;
    const { rows } = await pool.query(query, [id_pago]);
    return rows[0];
  },
  create: async (data) => {
    const query = `INSERT INTO pago (id_pedido, monto, metodo_pago, estado_pago, sync_status) VALUES ($1,$2,$3,$4,$5) RETURNING *`;
    const { rows } = await pool.query(query, [data.id_pedido, data.monto, data.metodo_pago || 'efectivo', data.estado_pago || 'pendiente', false]);
    return rows[0];
  },
  updateEstado: async (id_pago, estado) => {
    const query = `UPDATE pago SET estado_pago = $1, sync_status = true WHERE id_pago = $2 RETURNING *`;
    const { rows } = await pool.query(query, [estado, id_pago]);
    return rows[0];
  }
};