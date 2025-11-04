import { pool } from "../db.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { nombre, correo, telefono, direccion, contrasena, rol } = req.body;

    // Validar si el usuario ya existe
    const existing = await pool.query(
      "SELECT * FROM usuario WHERE correo = $1 OR telefono = $2",
      [correo, telefono]
    );
    if (existing.rows.length > 0) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    // Buscar el rol por nombre
    const rolResult = await pool.query("SELECT id_rol FROM rol WHERE rol = $1", [rol]);
    if (rolResult.rows.length === 0) {
      return res.status(400).json({ message: "Rol no válido" });
    }
    const id_rol = rolResult.rows[0].id_rol;

    // Insertar usuario
    const result = await pool.query(
      `INSERT INTO usuario (nombre, correo, telefono, direccion, contrasena, id_rol)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id_usuario, nombre, correo`,
      [nombre, correo, telefono, direccion, hashedPassword, id_rol]
    );

    res.status(201).json({
      message: "Usuario registrado correctamente",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Error en registro:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
