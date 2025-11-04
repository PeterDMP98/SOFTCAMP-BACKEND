import bcrypt from 'bcrypt';
import { pool } from '../db.js';

export const registrarUsuario = async (req, res) => {
  try {
    const { nombre, correo, telefono, direccion, contrasena } = req.body;

    const hashedPassword = await bcrypt.hash(contrasena, 10);
    const query = `
      INSERT INTO usuario (nombre, correo, telefono, direccion, contrasena)
      VALUES ($1, $2, $3, $4, $5) RETURNING idusuario, nombre, correo;
    `;

    const result = await pool.query(query, [nombre, correo, telefono, direccion, hashedPassword]);
    res.status(201).json({ success: true, usuario: result.rows[0] });

  } catch (error) {
    console.error('Error al registrar usuario:', error.message);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
};
