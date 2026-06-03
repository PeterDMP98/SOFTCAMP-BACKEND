import { HistorialClinicoRepository } from "../repositories/historialClinicoRepository.js";
import { GanadoRepository } from "../repositories/ganadoRepository.js";

export const HistorialClinicoService = {
  async getByGanado(id_ganado, id_usuario) {
    const ganado = await GanadoRepository.findByIdAndUser(id_ganado, id_usuario);
    if (!ganado) {
      throw new Error("Ganado no encontrado o no autorizado");
    }
    return await HistorialClinicoRepository.findByGanado(id_ganado, id_usuario);
  },

  async getById(id_historial_clinico, id_usuario) {
    const historial = await HistorialClinicoRepository.findByIdAndUser(id_historial_clinico, id_usuario);
    if (!historial) {
      throw new Error("Historial clínico no encontrado");
    }
    return historial;
  },

  async create(id_ganado, data, id_usuario) {
    const ganado = await GanadoRepository.findByIdAndUser(id_ganado, id_usuario);
    if (!ganado) {
      throw new Error("Ganado no encontrado o no autorizado");
    }
    return await HistorialClinicoRepository.create(id_ganado, data, id_usuario);
  },

  async update(id_historial_clinico, data, id_usuario) {
    const existente = await HistorialClinicoRepository.findByIdAndUser(id_historial_clinico, id_usuario);
    if (!existente) {
      throw new Error("Historial clínico no encontrado o no autorizado");
    }
    return await HistorialClinicoRepository.update(id_historial_clinico, data, id_usuario);
  },

  async delete(id_historial_clinico, id_usuario) {
    const existente = await HistorialClinicoRepository.findByIdAndUser(id_historial_clinico, id_usuario);
    if (!existente) {
      throw new Error("Historial clínico no encontrado o no autorizado");
    }
    const result = await HistorialClinicoRepository.delete(id_historial_clinico, id_usuario);
    if (!result) {
      throw new Error("Error al eliminar historial clínico");
    }
    return { success: true, message: "Historial clínico eliminado correctamente" };
  }
};