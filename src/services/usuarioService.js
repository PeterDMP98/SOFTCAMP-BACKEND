import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { UsuarioRepository } from "../repositories/usuarioRepository.js";
import { RolesRepository } from "../repositories/rolesRepository.js";

const omitPassword = (user) => {
  if (!user) return null;
  const { contrasena, ...publicUser } = user;
  return publicUser;
};

const signToken = (user) =>
  jwt.sign(
    {
      id_usuario: user.id_usuario,
      id_rol: user.id_rol,
      id_grupo: user.id_grupo,
      rol: user.rol,
      grupo: user.grupo,
    },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );

export const UsuarioService = {
  async register(data) {
    const existing = await UsuarioRepository.findByEmail(data.correo);
    if (existing) {
      throw new Error("El correo ya está registrado");
    }

    const rol = await RolesRepository.findFirstRolByGrupo(data.id_grupo);
    if (!rol) {
      throw new Error("No existe rol asignable para el grupo");
    }

    await UsuarioRepository.create({
      nombre: data.nombre,
      correo: data.correo,
      telefono: data.telefono,
      direccion: data.direccion,
      password: data.password,
      id_rol: rol.id_rol,
    });

    const user = await UsuarioRepository.findByEmail(data.correo);
    return omitPassword(user);
  },

  async login(correo, password) {
    const user = await UsuarioRepository.findByEmail(correo);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    const validPassword = await bcrypt.compare(password, user.contrasena);
    if (!validPassword) {
      throw new Error("Contraseña incorrecta");
    }

    const token = signToken(user);
    return { token, user: omitPassword(user) };
  },

  async createUser(data) {
    const existing = await UsuarioRepository.findByEmail(data.correo);
    if (existing) {
      throw new Error("El correo ya está registrado");
    }

    const created = await UsuarioRepository.create(data);
    const user = await UsuarioRepository.findById(created.id_usuario);
    return omitPassword(user);
  },

  async getByEmail(correo) {
    const user = await UsuarioRepository.findByEmail(correo);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    return omitPassword(user);
  },

  async deleteUser(id_usuario) {
    const deleted = await UsuarioRepository.deleteById(id_usuario);
    if (!deleted) {
      throw new Error("Usuario no encontrado");
    }
    return deleted;
  },

  /**
   * Lista usuarios del otro rol para convenios (campesino ↔ comprador).
   */
  async getContrapartes(user) {
    const grupo = user?.grupo;
    if (grupo === "campesino") {
      return await UsuarioRepository.findByGrupoNombre("comprador");
    }
    if (grupo === "comprador") {
      return await UsuarioRepository.findByGrupoNombre("campesino");
    }
    throw new Error("Rol no autorizado para listar contrapartes");
  },
};
