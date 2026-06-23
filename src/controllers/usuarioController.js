import { UsuarioService } from "../services/usuarioService.js";
import { validateCreateUser, formatZodErrors } from "../validations/usuario.validation.js";
import { UsuarioResponseDTO, UsuarioListDTO } from "../dtos/index.js";
import { mapListToDto } from "../utils/dtoMapper.js";

export const getContrapartes = async (req, res) => {
  try {
    const usuarios = await UsuarioService.getContrapartes(req.user);
    return res.json({
      message: "Contrapartes obtenidas correctamente",
      data: mapListToDto(UsuarioListDTO, usuarios),
    });
  } catch (error) {
    const status = error.message.includes("autorizado") ? 403 : 500;
    return res.status(status).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const validation = validateCreateUser(req.body);
    if (!validation.success) {
      return res.status(400).json({
        message: "Error de validación",
        errors: formatZodErrors(validation.error),
      });
    }

    const user = await UsuarioService.createUser(validation.data);

    return res.status(201).json({
      message: "Usuario creado correctamente",
      data: new UsuarioResponseDTO(user).toObject(),
    });
  } catch (error) {
    const status = error.message.includes("registrado") ? 400 : 500;
    if (status === 500) console.error("Error al crear usuario:", error);
    return res.status(status).json({ message: error.message });
  }
};

export const getUsuarioByEmail = async (req, res) => {
  try {
    const { correo } = req.params;
    const user = await UsuarioService.getByEmail(correo);

    return res.json({
      message: "Usuario obtenido correctamente",
      data: new UsuarioResponseDTO(user).toObject(),
    });
  } catch (error) {
    const status = error.message.includes("no encontrado") ? 404 : 500;
    if (status === 500) console.error("Error obteniendo usuario:", error);
    return res.status(status).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await UsuarioService.deleteUser(parseInt(id, 10));

    return res.json({
      message: "Usuario eliminado correctamente",
      data: deleted,
    });
  } catch (error) {
    const status = error.message.includes("no encontrado") ? 404 : 500;
    if (status === 500) console.error("Error al eliminar usuario:", error);
    return res.status(status).json({ message: error.message });
  }
};
