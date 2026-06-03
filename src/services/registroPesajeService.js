import { RegistroPesajeRepository } from "../repositories/registroPesajeRepository.js";
import { GanadoRepository } from "../repositories/ganadoRepository.js";

export const RegistroPesajeService = {
  async getByGanado(id_ganado, id_usuario) {
    const ganado = await GanadoRepository.findByIdAndUser(id_ganado, id_usuario);
    if (!ganado) throw new Error("Ganado no encontrado o no autorizado");
    return await RegistroPesajeRepository.findByGanado(id_ganado);
  },

  async getById(id_registro_pesaje, id_usuario) {
    const registro = await RegistroPesajeRepository.findByIdAndUser(id_registro_pesaje, id_usuario);
    if (!registro) throw new Error("Registro de pesaje no encontrado");
    return registro;
  },

  async create(id_ganado, data, id_usuario) {
    const ganado = await GanadoRepository.findByIdAndUser(id_ganado, id_usuario);
    if (!ganado) throw new Error("Ganado no encontrado o no autorizado");
    if (!data.peso || data.peso <= 0) throw new Error("El peso debe ser mayor a 0");
    return await RegistroPesajeRepository.create(id_ganado, data);
  },

  async update(id_registro_pesaje, data, id_usuario) {
    const existente = await RegistroPesajeRepository.findByIdAndUser(id_registro_pesaje, id_usuario);
    if (!existente) throw new Error("Registro de pesaje no encontrado o no autorizado");
    if (data.peso && data.peso <= 0) throw new Error("El peso debe ser mayor a 0");
    return await RegistroPesajeRepository.update(id_registro_pesaje, data, id_usuario);
  },

  async delete(id_registro_pesaje, id_usuario) {
    const existente = await RegistroPesajeRepository.findByIdAndUser(id_registro_pesaje, id_usuario);
    if (!existente) throw new Error("Registro de pesaje no encontrado o no autorizado");
    const result = await RegistroPesajeRepository.delete(id_registro_pesaje, id_usuario);
    if (!result) throw new Error("Error al eliminar registro de pesaje");
    return { success: true, message: "Registro de pesaje eliminado correctamente" };
  }
};