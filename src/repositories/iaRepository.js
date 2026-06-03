import pool from "../config/db.js";

export const iaRepository = {
  // CHAT OPERATIONS
  async createChat(id_usuario, titulo) {
    const query = `
      INSERT INTO chat_ia (id_usuario, titulo, created_at, updated_at)
      VALUES ($1, $2, NOW(), NOW())
      RETURNING *;
    `;
    const result = await pool.query(query, [id_usuario, titulo || `Chat ${new Date().toLocaleDateString()}`]);
    return result.rows[0];
  },

  async getChatById(id_chat, id_usuario) {
    const query = `
      SELECT * FROM chat_ia
      WHERE id_chat = $1 AND id_usuario = $2;
    `;
    const result = await pool.query(query, [id_chat, id_usuario]);
    return result.rows[0];
  },

  async getUserChats(id_usuario, limit = 20, offset = 0) {
    const query = `
      SELECT * FROM chat_ia
      WHERE id_usuario = $1
      ORDER BY updated_at DESC
      LIMIT $2 OFFSET $3;
    `;
    const result = await pool.query(query, [id_usuario, limit, offset]);
    return result.rows;
  },

  async updateChatTitle(id_chat, id_usuario, titulo) {
    const query = `
      UPDATE chat_ia
      SET titulo = $1, updated_at = NOW()
      WHERE id_chat = $2 AND id_usuario = $3
      RETURNING *;
    `;
    const result = await pool.query(query, [titulo, id_chat, id_usuario]);
    return result.rows[0];
  },

  async deleteChat(id_chat, id_usuario) {
    const query = `
      DELETE FROM chat_ia
      WHERE id_chat = $1 AND id_usuario = $2
      RETURNING id_chat;
    `;
    const result = await pool.query(query, [id_chat, id_usuario]);
    return result.rows[0];
  },

  // MESSAGE OPERATIONS
  async addMessage(id_chat, rol, contenido, metadata = null) {
    const query = `
      INSERT INTO mensajes_chat (id_chat, rol, contenido, metadata, created_at)
      VALUES ($1, $2, $3, $4, NOW())
      RETURNING *;
    `;
    const result = await pool.query(query, [
      id_chat,
      rol,
      contenido,
      metadata ? JSON.stringify(metadata) : null,
    ]);
    return result.rows[0];
  },

  async getChatMessages(id_chat, limit = 50, offset = 0) {
    const query = `
      SELECT * FROM mensajes_chat
      WHERE id_chat = $1
      ORDER BY created_at ASC
      LIMIT $2 OFFSET $3;
    `;
    const result = await pool.query(query, [id_chat, limit, offset]);
    return result.rows;
  },

  async getLatestMessages(id_chat, limit = 10) {
    const query = `
      SELECT * FROM mensajes_chat
      WHERE id_chat = $1
      ORDER BY created_at DESC
      LIMIT $2;
    `;
    const result = await pool.query(query, [id_chat, limit]);
    return result.rows.reverse();
  },

  // RECOMMENDATION OPERATIONS
  async createRecomendacion(id_usuario, tipo, titulo, descripcion, confianza, datos_contexto) {
    const query = `
      INSERT INTO recomendaciones_ia 
      (id_usuario, tipo, titulo, descripcion, confianza, datos_contexto, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
      RETURNING *;
    `;
    const result = await pool.query(query, [
      id_usuario,
      tipo,
      titulo,
      descripcion,
      confianza || 0.75,
      datos_contexto ? JSON.stringify(datos_contexto) : null,
    ]);
    return result.rows[0];
  },

  async getUserRecomendaciones(id_usuario, aceptadas = null, limit = 20, offset = 0) {
    let query = `
      SELECT * FROM recomendaciones_ia
      WHERE id_usuario = $1
    `;
    const params = [id_usuario];

    if (aceptadas !== null) {
      query += ` AND aceptada = $${params.length + 1}`;
      params.push(aceptadas);
    }

    query += ` ORDER BY created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);

    const result = await pool.query(query, params);
    return result.rows;
  },

  async getRecomendacionById(id_recomendacion, id_usuario) {
    const query = `
      SELECT * FROM recomendaciones_ia
      WHERE id_recomendacion = $1 AND id_usuario = $2;
    `;
    const result = await pool.query(query, [id_recomendacion, id_usuario]);
    return result.rows[0];
  },

  async acceptRecomendacion(id_recomendacion, id_usuario) {
    const query = `
      UPDATE recomendaciones_ia
      SET aceptada = TRUE, updated_at = NOW()
      WHERE id_recomendacion = $1 AND id_usuario = $2
      RETURNING *;
    `;
    const result = await pool.query(query, [id_recomendacion, id_usuario]);
    return result.rows[0];
  },

  async rejectRecomendacion(id_recomendacion, id_usuario) {
    const query = `
      UPDATE recomendaciones_ia
      SET descartada = TRUE, updated_at = NOW()
      WHERE id_recomendacion = $1 AND id_usuario = $2
      RETURNING *;
    `;
    const result = await pool.query(query, [id_recomendacion, id_usuario]);
    return result.rows[0];
  },

  // GENERATED TASKS
  async createGeneratedTask(id_usuario, id_recomendacion, titulo, descripcion, prioridad, fecha_sugerida) {
    const query = `
      INSERT INTO tareas_generadas_ia
      (id_usuario, id_recomendacion, titulo, descripcion, prioridad, fecha_sugerida, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, NOW())
      RETURNING *;
    `;
    const result = await pool.query(query, [
      id_usuario,
      id_recomendacion,
      titulo,
      descripcion,
      prioridad || "media",
      fecha_sugerida || null,
    ]);
    return result.rows[0];
  },

  async getUserGeneratedTasks(id_usuario, limit = 20, offset = 0) {
    const query = `
      SELECT * FROM tareas_generadas_ia
      WHERE id_usuario = $1 AND creada_en_sistema = FALSE
      ORDER BY created_at DESC
      LIMIT $2 OFFSET $3;
    `;
    const result = await pool.query(query, [id_usuario, limit, offset]);
    return result.rows;
  },

  async markTaskAsCreated(id_tarea_ia, id_usuario) {
    const query = `
      UPDATE tareas_generadas_ia
      SET creada_en_sistema = TRUE
      WHERE id_tarea_ia = $1 AND id_usuario = $2
      RETURNING *;
    `;
    const result = await pool.query(query, [id_tarea_ia, id_usuario]);
    return result.rows[0];
  },

  // UTILITY FUNCTIONS
  async deleteOldChats(id_usuario, daysOld = 30) {
    const query = `
      DELETE FROM chat_ia
      WHERE id_usuario = $1 AND created_at < NOW() - INTERVAL '${daysOld} days'
      RETURNING id_chat;
    `;
    const result = await pool.query(query, [id_usuario]);
    return result.rows;
  },

  async getUserChatStats(id_usuario) {
    const query = `
      SELECT 
        COUNT(DISTINCT c.id_chat) as total_chats,
        COUNT(DISTINCT m.id_mensaje) as total_messages,
        COUNT(DISTINCT CASE WHEN r.aceptada = TRUE THEN r.id_recomendacion END) as accepted_recommendations,
        COUNT(DISTINCT t.id_tarea_ia) as generated_tasks
      FROM chat_ia c
      LEFT JOIN mensajes_chat m ON c.id_chat = m.id_chat
      LEFT JOIN recomendaciones_ia r ON r.id_usuario = $1
      LEFT JOIN tareas_generadas_ia t ON t.id_usuario = $1
      WHERE c.id_usuario = $1;
    `;
    const result = await pool.query(query, [id_usuario]);
    return result.rows[0];
  },
};
