import { pool } from '../db.js';

// Crear nuevo rol
export const createRol = async (req, res) => {
  try {
    const { rol } = req.body;

    if (!rol) {
      return res.status(400).json({ error: 'El campo "rol" es obligatorio' });
    }

    const result = await pool.query(
      'INSERT INTO rol (rol) VALUES ($1) RETURNING *',
      [rol]
    );

    return res.status(201).json({
      message: 'Rol creado correctamente',
      rol: result.rows[0],
    });

  } catch (error) {
    console.error('Error al crear rol:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
