import pool from "../config/db.js";

export const GanadoModel = {

  // Obtener ganado del usuario autenticado
  async getByUser(id_usuario) {
    const query = `
      SELECT 
        id_ganado,
        nombre_animal,
        numero_identificacion,
        fecha_de_ingreso,
        fecha_nacimiento,
        raza,
        sexo,
        peso_actual,
        estado_salud,
        precio
      FROM ganado
      WHERE id_usuario = $1
      ORDER BY fecha_de_ingreso DESC
    `;
    const { rows } = await pool.query(query, [id_usuario]);
    return rows;
  },

  async getById(id_ganado) {
  const result = await pool.query(
    `SELECT * FROM ganado WHERE id_ganado = $1`,
    [id_ganado]
  );

  return result.rows[0];
},


  // Crear registro de ganado
  async create(data, id_usuario) {
    const query = `
      INSERT INTO ganado (
        nombre_animal,
        numero_identificacion,
        fecha_de_ingreso,
        fecha_nacimiento,
        raza,
        sexo,
        peso_actual,
        estado_salud,
        estado_reproductivo,
        fecha_gestacion,
        detalle,
        subproducto,
        id_lote,
        precio,
        id_usuario
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
      RETURNING *
    `;
    const values = [
      data.nombre_animal,
      data.numero_identificacion || null,
      data.fecha_de_ingreso,
      data.fecha_nacimiento || null,
      data.raza || null,
      data.sexo,
      data.peso_actual || null,
      data.estado_salud || null,
      data.estado_reproductivo || null,
      data.fecha_gestacion || null,
      data.detalle || null,
      data.subproducto || null,
      data.id_lote || null,
      data.precio || null,
      id_usuario
    ];

    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  // Actualizar ganado solo si pertenece al usuario
  async update(id_ganado, data, id_usuario) {
    const query = `
      UPDATE ganado SET
        nombre_animal=$1,
        numero_identificacion=$2,
        fecha_de_ingreso=$3,
        fecha_nacimiento=$4,
        raza=$5,
        sexo=$6,
        peso_actual=$7,
        estado_salud=$8,
        estado_reproductivo=$9,
        fecha_gestacion=$10,
        detalle=$11,
        subproducto=$12,
        id_lote=$13,
        precio=$14
      WHERE id_ganado=$15 AND id_usuario=$16
      RETURNING *
    `;
    const values = [
      data.nombre_animal,
      data.numero_identificacion || null,
      data.fecha_de_ingreso,
      data.fecha_nacimiento || null,
      data.raza || null,
      data.sexo,
      data.peso_actual || null,
      data.estado_salud || null,
      data.estado_reproductivo || null,
      data.fecha_gestacion || null,
      data.detalle || null,
      data.subproducto || null,
      data.id_lote || null,
      data.precio || null,
      id_ganado,
      id_usuario
    ];

    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  // Eliminar ganado con validación de dueño
  async delete(id_ganado, id_usuario) {
    const query = `
      DELETE FROM ganado
      WHERE id_ganado=$1 AND id_usuario=$2
      RETURNING id_ganado
    `;
    const { rows } = await pool.query(query, [id_ganado, id_usuario]);

    if (!rows.length) {
      return { success: false, message: "No autorizado o no existe" };
    }

    return { success: true, message: "Ganado eliminado correctamente" };
  }
};
