import pool from "../config/db.js";

export const HistorialClinicoModel = {

	async getByGanado(id_ganado, id_usuario) {
		const { rows } = await pool.query(
			`SELECT *
       FROM historial_clinico
       WHERE id_ganado = $1 AND id_usuario_campesino = $2
       ORDER BY fecha_de_registro DESC`,
			[id_ganado, id_usuario]
		);
		return rows;
	},

	async getById(id_historial_clinico) {
		const { rows } = await pool.query(
			`SELECT hc.*, g.id_usuario
     FROM historial_clinico hc
     JOIN ganado g ON g.id_ganado = hc.id_ganado
     WHERE hc.id_historial_clinico = $1`,
			[id_historial_clinico]
		);
		return rows[0];
	}
	,

	async create(id_ganado, data, id_usuario) {
		const {
			nombre_de_veterinario,
			telefono,
			correo,
			fecha_de_registro,
			fecha_de_cierre,
			tipo,
			detalles,
			estado_de_consulta,
			precio
		} = data;

		const { rows } = await pool.query(
			`INSERT INTO historial_clinico (
        nombre_de_veterinario,
        telefono,
        correo,
        id_ganado,
        id_usuario_campesino,
        fecha_de_registro,
        fecha_de_cierre,
        tipo,
        detalles,
        estado_de_consulta,
        precio
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
      RETURNING *`,
			[
				nombre_de_veterinario || null,
				telefono || null,
				correo || null,
				id_ganado,
				id_usuario,
				fecha_de_registro,
				fecha_de_cierre || null,
				tipo || null,
				detalles || null,
				estado_de_consulta || null,
				precio || null
			]
		);

		return rows[0];
	},

	async update(id_historial_clinico, data, id_usuario) {
		const existente = await this.getById(id_historial_clinico);
		if (!existente || existente.id_usuario_campesino !== id_usuario) return null;

		const actualizado = {
			...existente,
			...data
		};

		const { rows } = await pool.query(
			`UPDATE historial_clinico SET
        nombre_de_veterinario=$1,
        telefono=$2,
        correo=$3,
        fecha_de_registro=$4,
        fecha_de_cierre=$5,
        tipo=$6,
        detalles=$7,
        estado_de_consulta=$8,
        precio=$9
      WHERE id_historial_clinico=$10
      RETURNING *`,
			[
				actualizado.nombre_de_veterinario,
				actualizado.telefono,
				actualizado.correo,
				actualizado.fecha_de_registro,
				actualizado.fecha_de_cierre,
				actualizado.tipo,
				actualizado.detalles,
				actualizado.estado_de_consulta,
				actualizado.precio,
				id_historial_clinico
			]
		);

		return rows[0];
	},

	async delete(id_historial_clinico, id_usuario) {
		const existente = await this.getById(id_historial_clinico);
		if (!existente || existente.id_usuario_campesino !== id_usuario) return false;

		await pool.query(
			`DELETE FROM historial_clinico WHERE id_historial_clinico=$1`,
			[id_historial_clinico]
		);

		return true;
	}
};
