import { TareaService } from "../services/tareaService.js";
import { validateTareaCreate, validateTareaUpdate } from "../validations/tarea.validation.js";
import { CreateTareaDTO, UpdateTareaDTO, TareaResponseDTO, TareaListDTO, UpdateTareaEstadoDTO } from "../dtos/index.js";

export const getTareas = async (req, res) => {
  try {
    const tareas = await TareaService.getAllByUser(req.user.id_usuario);
    const data = tareas.map(t => new TareaListDTO(t).toObject());
    return res.json({ message: "Tareas obtenidas correctamente", data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTareaById = async (req, res) => {
  try {
    const tarea = await TareaService.getById(req.params.id, req.user.id_usuario);
    const data = new TareaResponseDTO(tarea).toObject();
    return res.json({ message: "Tarea obtenida correctamente", data });
  } catch (error) {
    const status = error.message.includes("no encontrada") ? 404 : 500;
    return res.status(status).json({ message: error.message });
  }
};

export const createTarea = async (req, res) => {
  try {
    const validation = validateTareaCreate(req.body);
    if (!validation.success) {
      return res.status(400).json({ message: "Error de validación", errors: validation.error.errors.map(e => ({ field: e.path.join("."), message: e.message })) });
    }
    const createDTO = new CreateTareaDTO(validation.data);
    const nueva = await TareaService.create(createDTO.toObject(), req.user.id_usuario);
    const responseDTO = new TareaResponseDTO(nueva);
    return res.status(201).json({ message: "Tarea creada correctamente", data: responseDTO.toObject() });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const updateTarea = async (req, res) => {
  try {
    const validation = validateTareaUpdate(req.body);
    if (!validation.success) {
      return res.status(400).json({ message: "Error de validación", errors: validation.error.errors.map(e => ({ field: e.path.join("."), message: e.message })) });
    }
    const updateDTO = new UpdateTareaDTO(validation.data);
    const actualizada = await TareaService.update(req.params.id, updateDTO.toObjectFiltered(), req.user.id_usuario);
    const responseDTO = new TareaResponseDTO(actualizada);
    return res.json({ message: "Tarea actualizada correctamente", data: responseDTO.toObject() });
  } catch (error) {
    const status = error.message.includes("no encontrada") ? 404 : 400;
    return res.status(status).json({ message: error.message });
  }
};

export const deleteTarea = async (req, res) => {
  try {
    await TareaService.delete(req.params.id, req.user.id_usuario);
    return res.json({ message: "Tarea eliminada correctamente" });
  } catch (error) {
    const status = error.message.includes("no encontrada") ? 404 : 400;
    return res.status(status).json({ message: error.message });
  }
};