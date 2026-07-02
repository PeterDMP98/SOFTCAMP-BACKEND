import { HistorialClinicoService } from "../services/historialClinicoService.js";
import { validateHistorialClinicoCreate, validateHistorialClinicoUpdate } from "../validations/historialClinico.validation.js";
import { HistorialClinicoResponseDTO, HistorialClinicoListDTO } from "../dtos/index.js";
import { mapToDto, mapListToDto } from "../utils/dtoMapper.js";

export const getAllHistorialClinico = async (req, res) => {
  try {
    const historial = await HistorialClinicoService.getAllByUser(req.user.id_usuario);
    return res.json({
      message: "Historial clínico obtenido correctamente",
      data: mapListToDto(HistorialClinicoListDTO, historial),
    });
  } catch (error) {
    console.error("Error obteniendo historial clínico:", error);
    return res.status(500).json({ message: error.message || "Error obteniendo historial clínico" });
  }
};

export const getHistorialClinicoByGanado = async (req, res) => {
  try {
    const { id } = req.params;
    const historial = await HistorialClinicoService.getByGanado(id, req.user.id_usuario);
    return res.json({
      message: "Historial clínico obtenido correctamente",
      data: mapListToDto(HistorialClinicoListDTO, historial),
    });
  } catch (error) {
    console.error("Error obteniendo historial clínico:", error);
    return res.status(500).json({ message: error.message || "Error obteniendo historial clínico" });
  }
};

export const getHistorialClinicoById = async (req, res) => {
  try {
    const historial = await HistorialClinicoService.getById(req.params.id, req.user.id_usuario);
    return res.json({
      message: "Historial clínico obtenido correctamente",
      data: mapToDto(HistorialClinicoResponseDTO, historial),
    });
  } catch (error) {
    console.error("Error obteniendo historial clínico:", error);
    const status = error.message.includes("no encontrado") ? 404 : 500;
    return res.status(status).json({ message: error.message || "Error obteniendo historial clínico" });
  }
};

export const createHistorialClinico = async (req, res) => {
  try {
    const validation = validateHistorialClinicoCreate(req.body);
    if (!validation.success) {
      const errors = validation.error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      return res.status(400).json({ message: "Error de validación", errors });
    }

    const nuevo = await HistorialClinicoService.create(req.params.id, validation.data, req.user.id_usuario);
    return res.status(201).json({
      message: "Historial clínico creado correctamente",
      data: mapToDto(HistorialClinicoResponseDTO, nuevo),
    });
  } catch (error) {
    console.error("Error creando historial clínico:", error);
    return res.status(400).json({ message: error.message || "Error creando historial clínico" });
  }
};

export const updateHistorialClinico = async (req, res) => {
  try {
    const validation = validateHistorialClinicoUpdate(req.body);
    if (!validation.success) {
      const errors = validation.error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      return res.status(400).json({ message: "Error de validación", errors });
    }

    const actualizado = await HistorialClinicoService.update(
      req.params.id,
      validation.data,
      req.user.id_usuario
    );
    return res.json({
      message: "Historial clínico actualizado correctamente",
      data: mapToDto(HistorialClinicoResponseDTO, actualizado),
    });
  } catch (error) {
    console.error("Error actualizando historial clínico:", error);
    const status = error.message.includes("no encontrado") ? 404 : 400;
    return res.status(status).json({ message: error.message || "Error actualizando historial clínico" });
  }
};

export const deleteHistorialClinico = async (req, res) => {
  try {
    await HistorialClinicoService.delete(req.params.id, req.user.id_usuario);
    return res.json({ message: "Historial clínico eliminado correctamente" });
  } catch (error) {
    console.error("Error eliminando historial clínico:", error);
    const status = error.message.includes("no encontrado") ? 404 : 400;
    return res.status(status).json({ message: error.message || "Error eliminando historial clínico" });
  }
};
