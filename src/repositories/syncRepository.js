import pool from "../config/db.js";

const SYNC_TABLES = [
  { key: "ganado", table: "ganado", id: "id_ganado", userCol: "id_usuario" },
  { key: "lotes", table: "lotes", id: "id_lote", userCol: "id_usuario" },
  { key: "tareas", table: "tarea", id: "id_tarea", userCol: "id_usuario" },
  { key: "siembra", table: "siembra", id: "id_siembra", userCol: "id_usuario" },
  { key: "productos", table: "productos", id: "id_producto", userCol: "id_usuario" },
  { key: "stock", table: "stock_producto", id: "id_stock_producto", userCol: "id_usuario" },
];

export const SyncRepository = {
  async markSynced(table, idColumn, id) {
    const query = `UPDATE ${table} SET sync_status = false WHERE ${idColumn} = $1`;
    await pool.query(query, [id]);
  },

  async getPendingCountsByUser(id_usuario) {
    const parts = SYNC_TABLES.map(
      ({ key, table, userCol }) =>
        `(SELECT COUNT(*)::int FROM ${table} WHERE ${userCol} = $1 AND sync_status = true) AS ${key}_pendiente`
    );
    const query = `SELECT ${parts.join(", ")}`;
    const { rows } = await pool.query(query, [id_usuario]);
    return rows[0];
  },

  SYNC_TABLES,
};
