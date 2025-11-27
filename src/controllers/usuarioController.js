import { UsuarioModel } from "../models/usuarioModel.js";
import pool from "../config/db.js";


// ============================
// ✅ Crear usuario (ADMIN o sistema)
// ============================
export const createUser = async (req, res) => {
  try {
    const { nombre, correo, telefono, direccion, password, id_rol } = req.body;

    if (!nombre || !correo || !telefono || !password || !id_rol) {
      return res.status(400).json({ message: "Faltan datos obligatorios" });
    }

    const existing = await UsuarioModel.getByEmail(correo);
    if (existing) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    const newUser = await UsuarioModel.create({
      nombre,
      correo,
      telefono,
      direccion,
      password,
      id_rol
    });

    return res.json({
      message: "Usuario creado correctamente",
      usuario: newUser
    });

  } catch (error) {
    console.error("❌ Error al crear usuario:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// ============================
// ✅ Obtener usuario por correo
// ============================
export const getUsuarioByEmail = async (req, res) => {
  try {
    const { correo } = req.params;

    const user = await UsuarioModel.getByEmail(correo);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.json(user);

  } catch (error) {
    console.error("❌ Error obteniendo usuario:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// ============================
// ✅ Eliminar usuario
// ============================
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `DELETE FROM usuario WHERE id_usuario = $1 RETURNING id_usuario`;
    const result = await pool.query(query, [id]);

    if (!result.rows.length) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.json({ message: "Usuario eliminado correctamente" });

  } catch (error) {
    console.error("❌ Error al eliminar usuario:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
