// backend/src/controllers/registerController.js
import { pool } from '../db.js';
import bcrypt from 'bcrypt';

export const registerUser = async (req, res) => {
  try {
    const { nombre, correo, telefono, direccion, password, rol } = req.body;

    if (!nombre || !correo || !telefono || !direccion || !password || !rol) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Verificar si ya existe el correo o teléfono
    const existingUser = await pool.query(
      'SELECT * FROM usuario WHERE correo = $1 OR telefono = $2',
      [correo, telefono]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'El correo o teléfono ya están registrados' });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar usuario nuevo
    const query = `
      INSERT INTO usuario (nombre, correo, telefono, direccion, contrasena, id_rol)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id_usuario, nombre, correo, telefono, id_rol
    `;

    const values = [nombre, correo, telefono, direccion, hashedPassword, rol];

    const result = await pool.query(query, values);

    return res.status(201).json({
      message: 'Usuario registrado con éxito',
      user: result.rows[0],
    });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
