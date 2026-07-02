import pool from "../config/db.js";

export const RegistroReproduccionRepository = {
  async findByUser(id_usuario) {
    const query = `
      SELECT rr.*, gm.nombre_animal as madre_nombre, gp.nombre_animal as padre_nombre
      FROM registros_reproduccion rr
      JOIN ganado gm ON gm.id_ganado = rr.id_madre
      LEFT JOIN ganado gp ON gp.id_ganado = rr.id_padre
      WHERE gm.id_usuario = $1
      ORDER BY rr.fecha_evento DESC
    `;
    const { rows } = await pool.query(query, [id_usuario]);
    return rows;
  },

  async findByGanado(id_ganado) {
    const query = `
      SELECT * FROM registros_reproduccion 
      WHERE id_madre = $1 OR id_padre = $1 OR id_hijo = $1 
      ORDER BY fecha_evento DESC
    `;
    const { rows } = await pool.query(query, [id_ganado]);
    return rows;
  },

  async findById(id_registros_reproduccion) {
    const query = `
      SELECT rr.*, g.id_usuario FROM registros_reproduccion rr
      JOIN ganado g ON g.id_ganado IN (rr.id_madre, rr.id_padre, rr.id_hijo)
      WHERE rr.id_registros_reproduccion = $1 LIMIT 1
    `;
    const { rows } = await pool.query(query, [id_registros_reproduccion]);
    return rows[0];
  },

  async findByIdAndUser(id_registros_reproduccion, id_usuario) {
    const query = `
      SELECT rr.* FROM registros_reproduccion rr
      JOIN ganado g ON g.id_ganado IN (rr.id_madre, rr.id_padre, rr.id_hijo)
      WHERE rr.id_registros_reproduccion = $1 AND g.id_usuario = $2
    `;
    const { rows } = await pool.query(query, [id_registros_reproduccion, id_usuario]);
    return rows[0];
  },

  async create(data, id_usuario) {
    const query = `
      INSERT INTO registros_reproduccion (id_madre, id_padre, tipo_servicio, detalles, sync_status)
      VALUES ($1, $2, $3, $4, $5) RETURNING *
    `;
    const { rows } = await pool.query(query, [
      data.id_madre, data.id_padre || null, data.tipo_servicio, data.detalles || null, false
    ]);
    return rows[0];
  },

  async update(id_registros_reproduccion, data, id_usuario) {
    const existing = await this.findByIdAndUser(id_registros_reproduccion, id_usuario);
    if (!existing) return null;

    const mergedData = { ...existing, ...data };
    const esFinal = ['PARTO_EXITOSO', 'SERVICIO_FALLIDO', 'ABORTO', 'FETO_MUERTO', 'DIAGNOSTICO_NEGATIVO', 'ERROR_REGISTRO', 'DUPLICADO'].includes(mergedData.estado_reproduccion);

    const query = `
      UPDATE registros_reproduccion SET
        estado_reproduccion = $1, id_hijo = $2, detalles = $3,
        updated_at = NOW(), sync_status = $4,
        fecha_cierre = CASE WHEN $5 THEN NOW() ELSE fecha_cierre END
      WHERE id_registros_reproduccion = $6 RETURNING *
    `;
    const { rows } = await pool.query(query, [
      mergedData.estado_reproduccion, mergedData.id_hijo || null, mergedData.detalles || null,
      true, esFinal, id_registros_reproduccion
    ]);
    return rows[0];
  },

  async delete(id_registros_reproduccion, id_usuario) {
    const query = `
      DELETE FROM registros_reproduccion rr
      USING ganado g 
      WHERE g.id_ganado IN (rr.id_madre, rr.id_padre, rr.id_hijo) 
        AND rr.id_registros_reproduccion = $1 
        AND g.id_usuario = $2
      RETURNING id_registros_reproduccion
    `;
    const { rows } = await pool.query(query, [id_registros_reproduccion, id_usuario]);
    return rows[0];
  }
};