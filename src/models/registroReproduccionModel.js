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
      LIMIT 1`,
      [id_registros_reproduccion]
    );
    return rows[0];
  },

  async create(data) {
    const { id_madre, id_padre, tipo_servicio, detalles } = data;

    const { rows } = await pool.query(
      `INSERT INTO registros_reproduccion
    (id_madre, id_padre, tipo_servicio, detalles)
    VALUES ($1, $2, $3, $4)
     RETURNING *`,
      [
        id_madre,
        id_padre || null,
        tipo_servicio,
        detalles || null
      ]
    );

    return rows[0];
  },

async update(id, data) {
  const {
    estado_reproduccion,
    id_hijo,
    detalles
  } = data;

  const esFinal = [
    'PARTO_EXITOSO',
    'SERVICIO_FALLIDO',
    'ABORTO',
    'FETO_MUERTO',
    'DIAGNOSTICO_NEGATIVO',
    'ERROR_REGISTRO',
    'DUPLICADO'
  ].includes(estado_reproduccion);

  const { rows } = await pool.query(
    `UPDATE registros_reproduccion SET
      estado_reproduccion = $1,
      id_hijo = $2,
      detalles = $3,
      updated_at = NOW(),
      fecha_cierre = CASE WHEN $4 THEN NOW() ELSE fecha_cierre END
    WHERE id_registros_reproduccion = $5
     RETURNING *`,
    [
      estado_reproduccion,
      id_hijo || null,
      detalles || null,
      esFinal,
      id
    ]
  );

  return rows[0];
},
};

