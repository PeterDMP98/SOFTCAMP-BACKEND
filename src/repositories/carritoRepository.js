import pool from "../config/db.js";

export const CarritoRepository = {
  findByUsuario: async (id_usuario_comprador) => {
    const query = `SELECT c.*, p.nombre as producto_nombre, p.unidad_de_medida FROM carrito c JOIN carrito_item ci ON c.id_carrito = ci.id_carrito JOIN stock_producto s ON ci.id_stock_producto = s.id_stock_producto JOIN productos p ON s.id_producto = p.id_producto WHERE c.id_usuario_comprador = $1`;
    const { rows } = await pool.query(query, [id_usuario_comprador]);
    return rows;
  },
  
  findOrCreate: async (id_usuario_comprador) => {
    let query = `SELECT * FROM carrito WHERE id_usuario_comprador = $1`;
    let { rows } = await pool.query(query, [id_usuario_comprador]);
    if (rows.length === 0) {
      query = `INSERT INTO carrito (id_usuario_comprador, fecha_creacion, sync_status) VALUES ($1, CURRENT_DATE, false) RETURNING *`;
      ({ rows } = await pool.query(query, [id_usuario_comprador]));
    }
    return rows[0];
  },

  addItem: async (id_carrito, id_stock_producto, cantidad, precio_unitario) => {
    const query = `INSERT INTO carrito_item (id_carrito, id_stock_producto, cantidad, precio_unitario) VALUES ($1,$2,$3,$4) ON CONFLICT (id_carrito, id_stock_producto) DO UPDATE SET cantidad = cantidad + $3 RETURNING *`;
    const { rows } = await pool.query(query, [id_carrito, id_stock_producto, cantidad, precio_unitario]);
    return rows[0];
  },

  removeItem: async (id_carrito, id_stock_producto) => {
    const query = `DELETE FROM carrito_item WHERE id_carrito = $1 AND id_stock_producto = $2 RETURNING *`;
    const { rows } = await pool.query(query, [id_carrito, id_stock_producto]);
    return rows[0];
  },

  clearCarrito: async (id_carrito) => {
    const query = `DELETE FROM carrito_item WHERE id_carrito = $1`;
    await pool.query(query, [id_carrito]);
    return { success: true };
  }
};