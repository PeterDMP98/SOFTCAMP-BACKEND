import pool from "../config/db.js";

export const GanadoRepository = {
  async findByUser(id_usuario) {
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

  async findById(id_ganado) {
    const query = `
      SELECT 
        g.*,
        l.nombre AS nombre_lote
      FROM ganado g
      LEFT JOIN lotes l ON g.id_lote = l.id_lote
      WHERE g.id_ganado = $1
    `;
    const result = await pool.query(query, [id_ganado]);
    return result.rows[0];
  },

  async findByIdAndUser(id_ganado, id_usuario) {
    const query = `
      SELECT * FROM ganado 
      WHERE id_ganado = $1 AND id_usuario = $2
    `;
    const result = await pool.query(query, [id_ganado, id_usuario]);
    return result.rows[0];
  },

  async create(data, id_usuario) {
    const query = `
      INSERT INTO ganado (
        nombre_animal,
        numero_identificacion,
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
        id_usuario,
        sync_status
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
      RETURNING *
    `;
    const values = [
      data.nombre_animal,
      data.numero_identificacion || null,
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
      id_usuario,
      false
    ];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  async update(id_ganado, data, id_usuario) {
    const existing = await this.findByIdAndUser(id_ganado, id_usuario);
    if (!existing) return null;

    const mergedData = { ...existing, ...data };
    
    const fields = [
      'nombre_animal', 'numero_identificacion', 'fecha_nacimiento',
      'raza', 'sexo', 'peso_actual', 'estado_salud', 'estado_reproductivo',
      'fecha_gestacion', 'detalle', 'subproducto', 'id_lote', 'precio'
    ];
    
    const setClause = fields.map((field, i) => `$${field} = $${i + 1}`).join(', ');
    const values = fields.map(field => mergedData[field] ?? null);
    
    values.push(true, id_ganado, id_usuario);
    
    const query = `
      UPDATE ganado SET
        nombre_animal=$1,
        numero_identificacion=$2,
        fecha_nacimiento=$3,
        raza=$4,
        sexo=$5,
        peso_actual=$6,
        estado_salud=$7,
        estado_reproductivo=$8,
        fecha_gestacion=$9,
        detalle=$10,
        subproducto=$11,
        id_lote=$12,
        precio=$13,
        sync_status=$14
      WHERE id_ganado=$15 AND id_usuario=$16
      RETURNING *
    `;
    
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  async delete(id_ganado, id_usuario) {
    const query = `
      DELETE FROM ganado
      WHERE id_ganado=$1 AND id_usuario=$2
      RETURNING id_ganado
    `;
    const { rows } = await pool.query(query, [id_ganado, id_usuario]);
    return rows[0];
  }
};