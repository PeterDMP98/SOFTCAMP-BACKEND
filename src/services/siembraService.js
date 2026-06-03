import { SiembraRepository } from "../repositories/siembraRepository.js";

const ESTADOS_VALIDOS = ['Abierta', 'En proceso', 'Cerrado'];

export const SiembraService = {
  async getAllByUser(id_usuario) {
    return await SiembraRepository.findByUser(id_usuario);
  },

  async getById(id_siembra, id_usuario) {
    const siembra = await SiembraRepository.findByIdAndUser(id_siembra, id_usuario);
    if (!siembra) throw new Error("Siembra no encontrada o no autorizada");
    return await SiembraRepository.findById(id_siembra);
  },

  async create(data, id_usuario) {
    this.validateSiembraData(data);
    return await SiembraRepository.create(data, id_usuario);
  },

  async update(id_siembra, data, id_usuario) {
    const existente = await SiembraRepository.findByIdAndUser(id_siembra, id_usuario);
    if (!existente) throw new Error("Siembra no encontrada o no autorizada");
    if (data.estado && !ESTADOS_VALIDOS.includes(data.estado)) throw new Error("Estado inválido");
    return await SiembraRepository.update(id_siembra, data, id_usuario);
  },

  async delete(id_siembra, id_usuario) {
    const existente = await SiembraRepository.findByIdAndUser(id_siembra, id_usuario);
    if (!existente) throw new Error("Siembra no encontrada o no autorizada");
    const result = await SiembraRepository.delete(id_siembra, id_usuario);
    if (!result) throw new Error("Error al eliminar siembra");
    return { success: true, message: "Siembra eliminada correctamente" };
  },

  validateSiembraData(data, isUpdate = false) {
    if (!data.nombre || data.nombre.trim() === "") throw new Error("El nombre es requerido");
    if (data.nombre && data.nombre.length > 100) throw new Error("El nombre no puede exceder 100 caracteres");
    if (data.cantidad && data.cantidad <= 0) throw new Error("La cantidad debe ser mayor a 0");
    if (data.estado && !ESTADOS_VALIDOS.includes(data.estado)) throw new Error("Estado inválido: Abierta, En proceso, Cerrado");
    return true;
  }
};