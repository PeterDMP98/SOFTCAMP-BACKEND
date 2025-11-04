import { pool } from '../db.js';
import bcrypt from 'bcrypt';

// Login de usuario
export const loginUser = async (req, res) => {
  try {
    const { correo, password } = req.body;

    if (!correo || !password) {
      return res.status(400).json({ error: 'Correo y contraseña son obligatorios' });
    }

    // Buscar usuario por correo
    const result = await pool.query('SELECT * FROM usuario WHERE correo = $1', [correo]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const user = result.rows[0];

    // Verificar contraseña (usa 'contrasena' en lugar de 'password')
    const isMatch = await bcrypt.compare(password, user.contrasena);
    if (!isMatch) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Si todo está bien, enviar los datos básicos del usuario
    res.json({
      message: 'Inicio de sesión exitoso',
      user: {
        id: user.id_usuario,
        nombre: user.nombre,
        correo: user.correo,
        rol: user.id_rol,
      },
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
