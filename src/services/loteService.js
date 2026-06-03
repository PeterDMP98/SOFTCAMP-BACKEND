import { LoteRepository } from "../repositories/loteRepository.js";

export const LoteService = {
  async getAllByUser(id_usuario, includeInactive = false) {
    return await LoteRepository.findByUser(id_usuario, includeInactive);
  },

  async getInactiveByUser(id_usuario) {
    return await LoteRepository.findInactiveByUser(id_usuario);
  },

  async getById(id_lote, id_usuario) {
    const lote = await LoteRepository.findById(id_lote, id_usuario);
    if (!lote) {
      throw new Error("Lote no encontrado");
    }
    return lote;
  },

  async create(data, id_usuario) {
    this.validateLoteData(data);
    return await LoteRepository.create(data, id_usuario);
  },

  async update(id_lote, data, id_usuario) {
    const existente = await LoteRepository.findByIdAndUser(id_lote, id_usuario);
    if (!existente) {
      throw new Error("Lote no encontrado o no autorizado");
    }
    if (data.nombre) {
      this.validateLoteData(data);
    }
    return await LoteRepository.update(id_lote, data, id_usuario);
  },

  async deactivate(id_lote, id_usuario) {
    const existente = await LoteRepository.findByIdAndUser(id_lote, id_usuario);
    if (!existente) {
      throw new Error("Lote no encontrado o no autorizado");
    }
    const result = await LoteRepository.deactivate(id_lote, id_usuario);
    if (!result) {
      throw new Error("Error al desactivar lote");
    }
    return { success: true, message: "Lote desactivado correctamente" };
  },

  async reactivate(id_lote, id_usuario) {
    const existente = await LoteRepository.findByIdAndUser(id_lote, id_usuario);
    if (!existente) {
      throw new Error("Lote no encontrado o no autorizado");
    }
    const result = await LoteRepository.reactivate(id_lote, id_usuario);
    if (!result) {
      throw new Error("Error al activar lote");
    }
    return { success: true, message: "Lote activado correctamente" };
  },

  async delete(id_lote, id_usuario) {
    const existente = await LoteRepository.findByIdAndUser(id_lote, id_usuario);
    if (!existente) {
      throw new Error("Lote no encontrado o no autorizado");
    }
    const result = await LoteRepository.delete(id_lote, id_usuario);
    if (!result) {
      throw new Error("Error al eliminar lote");
    }
    return { success: true, message: "Lote eliminado correctamente" };
  },

  validateLoteData(data) {
    if (!data.nombre || data.nombre.trim() === "") {
      throw new Error("El nombre del lote es requerido");
    }
    if (data.nombre && data.nombre.length > 100) {
      throw new Error("El nombre no puede exceder 100 caracteres");
    }
    if (data.tamano_hectareas && data.tamano_hectareas <= 0) {
      throw new Error("El tamaño debe ser mayor a 0");
    }
    if (data.descripcion && data.descripcion.length > 500) {
      throw new Error("La descripción no puede exceder 500 caracteres");
    }
    return true;
  }
};