import { PagoRepository } from "../repositories/pagoRepository.js";

export const PagoService = {
  getByUsuario: async (id_usuario) => await PagoRepository.findByUsuario(id_usuario),
  getById: async (id_pago) => await PagoRepository.findById(id_pago),
  create: async (data) => {
    if (!data.id_pedido) throw new Error("El pedido es requerido");
    if (!data.monto || data.monto <= 0) throw new Error("El monto debe ser mayor a 0");
    return await PagoRepository.create(data);
  },
  updateEstado: async (id_pago, estado) => {
    const pago = await PagoRepository.findById(id_pago);
    if (!pago) throw new Error("Pago no encontrado");
    return await PagoRepository.updateEstado(id_pago, estado);
  }
};