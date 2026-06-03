import { LoteService } from "../services/loteService.js";
import { validateLoteCreate, validateLoteUpdate } from "../validations/lote.validation.js";
import { CreateLoteDTO, UpdateLoteDTO, LoteResponseDTO, LoteListDTO } from "../dtos/index.js";

export const getLotes = async (req, res) => {
  try {
    const id_usuario = req.user.id_usuario;
    const lotes = await LoteService.getAllByUser(id_usuario);
    // Transformar a DTOs
    const data = lotes.map(l => new LoteListDTO(l).toObject());
    return res.json({ message: "Lotes obtenidos correctamente", data });
  } catch (error) {
    console.error("Error obteniendo lotes:", error);
    return res.status(500).json({ message: error.message || "Error al obtener los lotes" });
  }
};

export const getInactiveLotes = async (req, res) => {
  try {
    const id_usuario = req.user.id_usuario;
    const lotes = await LoteService.getInactiveByUser(id_usuario);
    // Transformar a DTOs
    const data = lotes.map(l => new LoteListDTO(l).toObject());
    return res.json({ message: "Lotes inactivos obtenidos correctamente", data });
  } catch (error) {
    console.error("Error obteniendo lotes inactivos:", error);
    return res.status(500).json({ message: error.message || "Error al obtener los lotes" });
  }
};

export const getLoteById = async (req, res) => {
  try {
    const id_usuario = req.user.id_usuario;
    const lote = await LoteService.getById(req.params.id, id_usuario);
    // Transformar a DTO
    const data = new LoteResponseDTO(lote).toObject();
    return res.json({ message: "Lote obtenido correctamente", data });
  } catch (error) {
    console.error("Error obteniendo lote:", error);
    const status = error.message.includes("no encontrado") ? 404 : 500;
    return res.status(status).json({ message: error.message || "Error al obtener el lote" });
  }
};

export const createLote = async (req, res) => {
  try {
    const validation = validateLoteCreate(req.body);
    if (!validation.success) {
      const errors = validation.error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message
      }));
      return res.status(400).json({ message: "Error de validación", errors });
    }

    // Transformar a DTO
    const createDTO = new CreateLoteDTO(validation.data);
    const id_usuario = req.user.id_usuario;
    const lote = await LoteService.create(createDTO.toObject(), id_usuario);
    
    // Transformar respuesta a DTO
    const responseDTO = new LoteResponseDTO(lote);
    return res.status(201).json({ message: "Lote creado correctamente", data: responseDTO.toObject() });
  } catch (error) {
    console.error("Error creando lote:", error);
    return res.status(400).json({ message: error.message || "Error al crear el lote" });
  }
};

export const updateLote = async (req, res) => {
  try {
    const validation = validateLoteUpdate(req.body);
    if (!validation.success) {
      const errors = validation.error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message
      }));
      return res.status(400).json({ message: "Error de validación", errors });
    }

    // Transformar a DTO (solo actualiza campos definidos)
    const updateDTO = new UpdateLoteDTO(validation.data);
    const id_usuario = req.user.id_usuario;
    const lote = await LoteService.update(req.params.id, updateDTO.toObjectFiltered(), id_usuario);
    
    // Transformar respuesta a DTO
    const responseDTO = new LoteResponseDTO(lote);
    return res.json({ message: "Lote actualizado correctamente", data: responseDTO.toObject() });
  } catch (error) {
    console.error("Error actualizando lote:", error);
    const status = error.message.includes("no encontrado") ? 404 : 400;
    return res.status(status).json({ message: error.message || "Error al actualizar el lote" });
  }
};

export const deactivateLote = async (req, res) => {
  try {
    const id_usuario = req.user.id_usuario;
    const result = await LoteService.deactivate(req.params.id, id_usuario);
    return res.json({ message: "Lote desactivado correctamente" });
  } catch (error) {
    console.error("Error desactivando lote:", error);
    const status = error.message.includes("no encontrado") ? 404 : 400;
    return res.status(status).json({ message: error.message || "Error al desactivar el lote" });
  }
};

export const reactivateLote = async (req, res) => {
  try {
    const id_usuario = req.user.id_usuario;
    const result = await LoteService.reactivate(req.params.id, id_usuario);
    return res.json({ message: "Lote reactivado correctamente" });
  } catch (error) {
    console.error("Error reactivando lote:", error);
    const status = error.message.includes("no encontrado") ? 404 : 400;
    return res.status(status).json({ message: error.message || "Error al activar el lote" });
  }
};