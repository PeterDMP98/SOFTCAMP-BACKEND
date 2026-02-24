import pool from '../config/db.js';

export const LoteModel = {

	async getAllByUser(id_usuario) {
		const { rows } = await pool.query(
			`SELECT * FROM lotes WHERE id_usuario = $1 AND activo = true ORDER BY fecha_registro DESC`,
			[id_usuario]
		);
		return rows;
	},

	async getById(id_lote, id_usuario) {
		const { rows } = await pool.query(
			`SELECT * FROM lotes WHERE id_lote = $1 AND id_usuario = $2 AND activo = true`,
			[id_lote, id_usuario]
		);
		return rows[0];
	},

	async getInactiveByUser(id_usuario) {
		const { rows } = await pool.query(
			`SELECT * FROM lotes
    WHERE id_usuario = $1 AND activo = false
    ORDER BY fecha_registro DESC`,
			[id_usuario]
		);
		return rows;
	},

	async create(data, id_usuario) {
		const { nombre, tamano_hectareas, descripcion } = data;

		const { rows } = await pool.query(
			`INSERT INTO lotes (nombre, tamano_hectareas, descripcion, id_usuario)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
			[
				nombre,
				tamano_hectareas || null,
				descripcion || null,
				id_usuario
			]
		);
		return rows[0];
	},

	async update(id_lote, data, id_usuario) {
		const { nombre, tamano_hectareas, descripcion } = data;

		const { rows } = await pool.query(
			`UPDATE lotes SET
        nombre = $1,
        tamano_hectareas = $2,
        descripcion = $3
       WHERE id_lote = $4 AND id_usuario = $5
       RETURNING *`,
			[
				nombre,
				tamano_hectareas || null,
				descripcion || null,
				id_lote,
				id_usuario
			]
		);
		return rows[0];
	},

	async deactivate(id_lote, id_usuario) {
		const { rows } = await pool.query(
			`UPDATE lotes
    SET activo = false
    WHERE id_lote = $1 AND id_usuario = $2
     RETURNING *`,
			[id_lote, id_usuario]
		);
		return rows[0];
	},

	async reactivate(id_lote, id_usuario) {
		const { rows } = await pool.query(
			`UPDATE lotes
    SET activo = true
    WHERE id_lote = $1 AND id_usuario = $2
     RETURNING *`,
			[id_lote, id_usuario]
		);
		return rows[0];
	}



};
