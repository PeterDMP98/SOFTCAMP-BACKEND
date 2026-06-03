import { TareaRepository } from "../repositories/tareaRepository.js";

const ESTADOS = ['pendiente', 'en_proceso', 'completada', 'cancelada'];
const PRIORIDADES = ['baja', 'media', 'alta'];

export const TareaService = {
  getAllByUser: async (id_usuario) => await TareaRepository.findByUsuario(id_usuario),
  getById: async (id_tarea, id_usuario) => {
    const tarea = await TareaRepository.findByIdAndUser(id_tarea, id_usuario);
    if (!tarea) throw new Error("Tarea no encontrada o no autorizada");
    return tarea;
  },
  create: async (data, id_usuario) => {
    if (!data.titulo || data.titulo.trim() === "") throw new Error("El título es requerido");
    if (data.estado && !ESTADOS.includes(data.estado)) throw new Error("Estado inválido");
    if (data.prioridad && !PRIORIDADES.includes(data.prioridad)) throw new Error("Prioridad inválida");
    return await TareaRepository.create(data, id_usuario);
  },
  update: async (id_tarea, data, id_usuario) => {
    const existente = await TareaRepository.findByIdAndUser(id_tarea, id_usuario);
    if (!existente) throw new Error("Tarea no encontrada o no autorizada");
    if (data.estado && !ESTADOS.includes(data.estado)) throw new Error("Estado inválido");
    if (data.prioridad && !PRIORIDADES.includes(data.prioridad)) throw new Error("Prioridad inválida");
    return await TareaRepository.update(id_tarea, data, id_usuario);
  },
  delete: async (id_tarea, id_usuario) => {
    const existente = await TareaRepository.findByIdAndUser(id_tarea, id_usuario);
    if (!existente) throw new Error("Tarea no encontrada o no autorizada");
    const result = await TareaRepository.delete(id_tarea, id_usuario);
    if (!result) throw new Error("Error al eliminar tarea");
    return { success: true, message: "Tarea eliminada correctamente" };
  }
};