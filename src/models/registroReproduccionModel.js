import pool from "../config/db.js";

export const RegistroReproduccionModel = {

  async getByGanado(id_ganado) {
    const { rows } = await pool.query(
      `SELECT *
       FROM registros_reproduccion
       WHERE id_madre = $1
          OR id_padre = $1
          OR id_hijo = $1
       ORDER BY fecha_evento DESC`,
      [id_ganado]
    );
    return rows;
  },

  async getById(id_registros_reproduccion) {
    const { rows } = await pool.query(
      `SELECT rr.*, g.id_usuario
FROM registros_reproduccion rr
JOIN ganado g
  ON g.id_ganado IN (rr.id_madre, rr.id_padre, rr.id_hijo)
WHERE rr.id_registros_reproduccion = $1
LIMIT 1
      WHERE rr.id_registros_reproduccion = $1`,
      [id_registros_reproduccion]
    );
    return rows[0];
  },

  async create(data) {
    const {
      id_hijo,
      id_madre,
      id_padre,
      tipo_evento,
      detalles
    } = data;

    const { rows } = await pool.query(
      `INSERT INTO registros_reproduccion
       (id_hijo, id_madre, id_padre, tipo_evento, detalles)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [
        id_hijo || null,
        id_madre,
        id_padre || null,
        tipo_evento,
        detalles || null
      ]
    );

    return rows[0];
  },

    async update(data) {
    const {
      id_hijo,
      id_madre,
      id_padre,
      tipo_evento,
      detalles
    } = data;

    const { rows } = await pool.query(
      `UPDATE registros_reproduccion SET
      id_hijo, id_madre, id_padre, tipo_evento, detalles)
      VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [
        id_hijo || null,
        id_madre,
        id_padre || null,
        tipo_evento,
        detalles || null
      ]
    );

    return rows[0];
  },

  async deactivate(id_registros_reproduccion) {
    const { rowCount } = await pool.query(
      `UPDATE registros_reproduccion SER activo = false
       WHERE id_registros_reproduccion = $1`,
      [id_registros_reproduccion]
    );
    return rowCount > 0;
  }
};

