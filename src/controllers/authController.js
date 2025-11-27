import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { UsuarioModel } from "../models/usuarioModel.js";
import pool from "../config/db.js";

// ============================
// ✅ REGISTRO DE USUARIO
// ============================
export const register = async (req, res) => {
  try {
    const { nombre, correo, telefono, direccion, password, id_grupo } = req.body;

    if (!nombre || !correo || !telefono || !password || !id_grupo) {
      return res.status(400).json({ message: "Faltan datos obligatorios" });
    }

    const existing = await UsuarioModel.getByEmail(correo);
    if (existing) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    const rolResult = await pool.query(
      `SELECT id_rol FROM roles WHERE id_grupo = $1 ORDER BY id_rol LIMIT 1`,
      [id_grupo]
    );

    if (!rolResult.rows.length) {
      return res.status(400).json({ message: "No existe rol asignable para el grupo" });
    }

    const id_rol = rolResult.rows[0].id_rol;

    await UsuarioModel.create({
      nombre,
      correo,
      telefono,
      direccion,
      password,
      id_rol
    });

    // ✅ Volver a consultar para obtener rol y grupo
    const newUser = await UsuarioModel.getByEmail(correo);

    return res.status(201).json({
      message: "Usuario registrado con éxito",
      user: {
        id_usuario: newUser.id_usuario,
        nombre: newUser.nombre,
        correo: newUser.correo,
        telefono: newUser.telefono,
        direccion: newUser.direccion,
        id_rol: newUser.id_rol,
        rol: newUser.rol,
        id_grupo: newUser.id_grupo,
        grupo: newUser.grupo,
        fecha_registro: newUser.fecha_registro
      }
    });

  } catch (error) {
    console.error("❌ Error en registro:", error);
    return res.status(500).json({ message: "Error interno en el servidor" });
  }
};


// ============================
// ✅ LOGIN DE USUARIO
// ============================
export const login = async (req, res) => {
  try {
    const { correo, password } = req.body;

    if (!correo || !password) {
      return res.status(400).json({ message: "Correo y contraseña son obligatorios" });
    }

    const user = await UsuarioModel.getByEmail(correo);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const validPassword = await bcrypt.compare(password, user.contrasena);
    if (!validPassword) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Crear token JWT consistente con middleware
    const token = jwt.sign(
      {
        id_usuario: user.id_usuario,
        id_rol: user.id_rol,
        id_grupo: user.id_grupo,
        rol: user.rol,
        grupo: user.grupo
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.json({
      message: "Login exitoso",
      token,
      user: {
        id_usuario: user.id_usuario,
        nombre: user.nombre,
        correo: user.correo,
        rol: user.rol,
        grupo: user.grupo
      }
    });

  } catch (error) {
    console.error("❌ Error en login:", error);
    return res.status(500).json({ message: "Error interno en el servidor" });
  }
};
