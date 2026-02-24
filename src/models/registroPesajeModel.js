import pool from "../config/db.js";

export const RegistroPesajeModel = {

	async getByGanado(id_ganado) {
		const { rows } = await pool.query(
			`SELECT *
      FROM registros_pesajes
      WHERE id_ganado = $1
      ORDER BY fecha_registro DESC`,
			[id_ganado]
		);
		return rows;
	},

	async getById(id_registro_pesaje) {
		const { rows } = await pool.query(
			`SELECT rp.*, g.id_usuario
      FROM registros_pesajes rp
      JOIN ganado g ON g.id_ganado = rp.id_ganado
      WHERE rp.id_registros_pesajes = $1`,
			[id_registro_pesaje]
		);
		return rows[0];
	},

	async create(id_ganado, data) {
		const { peso, observaciones } = data;

		const { rows } = await pool.query(
			`INSERT INTO registros_pesajes
      (id_ganado, peso, observaciones)
      VALUES ($1, $2, $3)
      RETURNING *`,
			[id_ganado, peso, observaciones || null]
		);

		return rows[0];
	},

	// RegistroPesajeModel.js
async update(id_registro, data) {
  const { peso, observaciones } = data;

  const { rows } = await pool.query(
    `UPDATE registros_pesajes
    SET peso = $1,
    observaciones = $2
    WHERE id_registros_pesajes = $3
    RETURNING *`,
    [peso, observaciones || null, id_registro]
  );

  return rows[0];
}

};
