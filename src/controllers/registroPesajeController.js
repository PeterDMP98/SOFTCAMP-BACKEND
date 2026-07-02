import { RegistroPesajeService } from "../services/registroPesajeService.js";
import { validateRegistroPesajeCreate, validateRegistroPesajeUpdate } from "../validations/registroPesaje.validation.js";
import { RegistroPesajeResponseDTO, RegistroPesajeListDTO } from "../dtos/index.js";
import { mapToDto, mapListToDto } from "../utils/dtoMapper.js";

export const getAllPesajes = async (req, res) => {
  try {
    const pesajes = await RegistroPesajeService.getAllByUser(req.user.id_usuario);
    return res.json({
      message: "Registros de pesaje obtenidos correctamente",
      data: mapListToDto(RegistroPesajeListDTO, pesajes),
    });
  } catch (error) {
    console.error("Error obteniendo registros de pesaje:", error);
    return res.status(500).json({ message: error.message || "Error obteniendo registros de pesaje" });
  }
};

export const getPesajesByGanado = async (req, res) => {
  try {
    const pesajes = await RegistroPesajeService.getByGanado(req.params.id, req.user.id_usuario);
    return res.json({
      message: "Registros de pesaje obtenidos correctamente",
      data: mapListToDto(RegistroPesajeListDTO, pesajes),
    });
  } catch (error) {
    console.error("Error obteniendo registros de pesaje:", error);
    return res.status(500).json({ message: error.message || "Error obteniendo registros de pesaje" });
  }
};

export const getPesajeById = async (req, res) => {
  try {
    const pesaje = await RegistroPesajeService.getById(req.params.id, req.user.id_usuario);
    return res.json({
      message: "Registro de pesaje obtenido correctamente",
      data: mapToDto(RegistroPesajeResponseDTO, pesaje),
    });
  } catch (error) {
    console.error("Error obteniendo registro de pesaje:", error);
    const status = error.message.includes("no encontrado") ? 404 : 500;
    return res.status(status).json({ message: error.message || "Error obteniendo registro de pesaje" });
  }
};

export const createPesaje = async (req, res) => {
  try {
    const validation = validateRegistroPesajeCreate(req.body);
    if (!validation.success) {
      const errors = validation.error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      return res.status(400).json({ message: "Error de validación", errors });
    }

    const nuevo = await RegistroPesajeService.create(req.params.id, validation.data, req.user.id_usuario);
    return res.status(201).json({
      message: "Registro de pesaje creado correctamente",
      data: mapToDto(RegistroPesajeResponseDTO, nuevo),
    });
  } catch (error) {
    console.error("Error creando registro de pesaje:", error);
    return res.status(400).json({ message: error.message || "Error creando registro de pesaje" });
  }
};

export const updatePesaje = async (req, res) => {
  try {
    const validation = validateRegistroPesajeUpdate(req.body);
    if (!validation.success) {
      const errors = validation.error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      return res.status(400).json({ message: "Error de validación", errors });
    }

    const actualizado = await RegistroPesajeService.update(
      req.params.id,
      validation.data,
      req.user.id_usuario
    );
    return res.json({
      message: "Registro de pesaje actualizado correctamente",
      data: mapToDto(RegistroPesajeResponseDTO, actualizado),
    });
  } catch (error) {
    console.error("Error actualizando registro de pesaje:", error);
    const status = error.message.includes("no encontrado") ? 404 : 400;
    return res.status(status).json({ message: error.message || "Error actualizando registro de pesaje" });
  }
};

export const deletePesaje = async (req, res) => {
  try {
    await RegistroPesajeService.delete(req.params.id, req.user.id_usuario);
    return res.json({ message: "Registro de pesaje eliminado correctamente" });
  } catch (error) {
    console.error("Error eliminando registro de pesaje:", error);
    const status = error.message.includes("no encontrado") ? 404 : 400;
    return res.status(status).json({ message: error.message || "Error eliminando registro de pesaje" });
  }
};
