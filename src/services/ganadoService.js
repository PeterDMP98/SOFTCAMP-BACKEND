import { GanadoRepository } from "../repositories/ganadoRepository.js";

export const GanadoService = {
  async getAllByUser(id_usuario) {
    return await GanadoRepository.findByUser(id_usuario);
  },

  async getById(id_ganado) {
    const ganado = await GanadoRepository.findById(id_ganado);
    if (!ganado) {
      throw new Error("Ganado no encontrado");
    }
    return ganado;
  },

  async create(data, id_usuario) {
    this.validateGanadoData(data, false);
    return await GanadoRepository.create(data, id_usuario);
  },

  async update(id_ganado, data, id_usuario) {
    const existente = await GanadoRepository.findByIdAndUser(id_ganado, id_usuario);
    if (!existente) {
      throw new Error("Ganado no encontrado o no autorizado");
    }
    this.validateGanadoData(data, true);
    return await GanadoRepository.update(id_ganado, data, id_usuario);
  },

  async delete(id_ganado, id_usuario) {
    const existente = await GanadoRepository.findByIdAndUser(id_ganado, id_usuario);
    if (!existente) {
      throw new Error("Ganado no encontrado o no autorizado");
    }
    const result = await GanadoRepository.delete(id_ganado, id_usuario);
    if (!result) {
      throw new Error("Error al eliminar ganado");
    }
    return { success: true, message: "Ganado eliminado correctamente" };
  },

  validateGanadoData(data, isUpdate = false) {
    if (!data.nombre_animal || data.nombre_animal.trim() === "") {
      throw new Error("El nombre del animal es requerido");
    }
    
    if (!isUpdate) {
      if (!data.sexo) {
        throw new Error("El sexo del animal es requerido");
      }
      const sexosValidos = ["Macho", "Hembra"];
      if (!sexosValidos.includes(data.sexo)) {
        throw new Error("Sexo inválido. Debe ser Macho o Hembra");
      }
    } else if (data.sexo) {
      const sexosValidos = ["Macho", "Hembra"];
      if (!sexosValidos.includes(data.sexo)) {
        throw new Error("Sexo inválido. Debe ser Macho o Hembra");
      }
    }
    
    if (data.estado_salud) {
      const estadosValidos = ["SANO", "OBSERVACION", "ENFERMO", "CRITICO"];
      if (!estadosValidos.includes(data.estado_salud)) {
        throw new Error("Estado de salud inválido");
      }
    }
    if (data.estado_reproductivo) {
      const estadosReproductivos = ["Gestante", "Vacía", "Desconocido"];
      if (!estadosReproductivos.includes(data.estado_reproductivo)) {
        throw new Error("Estado reproductivo inválido");
      }
    }
    if (data.peso_actual && data.peso_actual < 0) {
      throw new Error("El peso no puede ser negativo");
    }
    if (data.precio && data.precio < 0) {
      throw new Error("El precio no puede ser negativo");
    }
    return true;
  }
};