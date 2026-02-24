import pool from "../config/db.js";

export const HistorialClinicoModel = {

async getByGanado(id_ganado, id_usuario) {
  const { rows } = await pool.query(
    `SELECT hc.*
    FROM historial_clinico hc
    JOIN ganado g ON g.id_ganado = hc.id_ganado
    WHERE hc.id_ganado = $1 AND g.id_usuario = $2
    ORDER BY hc.fecha_de_registro DESC`,
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
        tipo,
        detalles,
        estado_de_consulta,
        precio
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
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

async updateSeguimiento(id_historial_clinico, data, id_usuario) {
  const existente = await this.getById(id_historial_clinico);
  if (!existente || existente.id_usuario !== id_usuario) return null;

  const { fecha_de_cierre, detalles, estado_de_consulta } = data;

  const { rows } = await pool.query(
    `UPDATE historial_clinico SET
      fecha_de_cierre = $1,
      detalles = $2,
      estado_de_consulta = $3
    WHERE id_historial_clinico = $4
     RETURNING *`,
    [
      fecha_de_cierre ?? existente.fecha_de_cierre,
      detalles ?? existente.detalles,
      estado_de_consulta ?? existente.estado_de_consulta,
      id_historial_clinico
    ]
  );

  return rows[0];
},

async updateCorreccion(id_historial_clinico, data, id_usuario) {
  const existente = await this.getById(id_historial_clinico);
  if (!existente || existente.id_usuario !== id_usuario) return null;

  const ahora = new Date();
  const fechaRegistro = new Date(existente.fecha_de_registro);
  const unaHora = 60 * 60 * 1000;

  if (ahora - fechaRegistro > unaHora) {
    return "TIME_EXPIRED";
  }

  const {
    nombre_de_veterinario,
    telefono,
    correo,
    tipo,
    precio
  } = data;

  const { rows } = await pool.query(
    `UPDATE historial_clinico SET
      nombre_de_veterinario = $1,
      telefono = $2,
      correo = $3,
      tipo = $4,
      precio = $5
    WHERE id_historial_clinico = $6
     RETURNING *`,
    [
      nombre_de_veterinario ?? existente.nombre_de_veterinario,
      telefono ?? existente.telefono,
      correo ?? existente.correo,
      tipo ?? existente.tipo,
      precio ?? existente.precio,
      id_historial_clinico
    ]
  );

  return rows[0];
},
};
