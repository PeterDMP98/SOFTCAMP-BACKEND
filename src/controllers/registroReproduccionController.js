import { RegistroReproduccionService } from "../services/registroReproduccionService.js";
import { validateRegistroReproduccionCreate, validateRegistroReproduccionUpdate } from "../validations/registroReproduccion.validation.js";
import { RegistroReproduccionResponseDTO, RegistroReproduccionListDTO } from "../dtos/index.js";
import { mapToDto, mapListToDto } from "../utils/dtoMapper.js";

export const getReproduccionByGanado = async (req, res) => {
  try {
    const registros = await RegistroReproduccionService.getByGanado(req.params.id, req.user.id_usuario);
    return res.json({
      message: "Registros de reproducción obtenidos correctamente",
      data: mapListToDto(RegistroReproduccionListDTO, registros),
    });
  } catch (error) {
    console.error("Error obteniendo registros de reproducción:", error);
    return res.status(500).json({ message: error.message || "Error obteniendo registros de reproducción" });
  }
};

export const getReproduccionById = async (req, res) => {
  try {
    const registro = await RegistroReproduccionService.getById(req.params.id, req.user.id_usuario);
    return res.json({
      message: "Registro de reproducción obtenido correctamente",
      data: mapToDto(RegistroReproduccionResponseDTO, registro),
    });
  } catch (error) {
    console.error("Error obteniendo registro de reproducción:", error);
    const status = error.message.includes("no encontrado") ? 404 : 500;
    return res.status(status).json({ message: error.message || "Error obteniendo registro de reproducción" });
  }
};

export const createReproduccion = async (req, res) => {
  try {
    const validation = validateRegistroReproduccionCreate(req.body);
    if (!validation.success) {
      const errors = validation.error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      return res.status(400).json({ message: "Error de validación", errors });
    }

    const nuevo = await RegistroReproduccionService.create(validation.data, req.user.id_usuario);
    return res.status(201).json({
      message: "Registro de reproducción creado correctamente",
      data: mapToDto(RegistroReproduccionResponseDTO, nuevo),
    });
  } catch (error) {
    console.error("Error creando registro de reproducción:", error);
    return res.status(400).json({ message: error.message || "Error creando registro de reproducción" });
  }
};

export const updateReproduccion = async (req, res) => {
  try {
    const validation = validateRegistroReproduccionUpdate(req.body);
    if (!validation.success) {
      const errors = validation.error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      return res.status(400).json({ message: "Error de validación", errors });
    }

    const actualizado = await RegistroReproduccionService.update(
      req.params.id,
      validation.data,
      req.user.id_usuario
    );
    return res.json({
      message: "Registro de reproducción actualizado correctamente",
      data: mapToDto(RegistroReproduccionResponseDTO, actualizado),
    });
  } catch (error) {
    console.error("Error actualizando registro de reproducción:", error);
    const status = error.message.includes("no encontrado") ? 404 : 400;
    return res.status(status).json({ message: error.message || "Error actualizando registro de reproducción" });
  }
};

export const deleteReproduccion = async (req, res) => {
  try {
    await RegistroReproduccionService.delete(req.params.id, req.user.id_usuario);
    return res.json({ message: "Registro de reproducción eliminado correctamente" });
  } catch (error) {
    console.error("Error eliminando registro de reproducción:", error);
    const status = error.message.includes("no encontrado") ? 404 : 400;
    return res.status(status).json({ message: error.message || "Error eliminando registro de reproducción" });
  }
};
