import { PedidoRepository } from "../repositories/pedidoRepository.js";

export const PedidoService = {
  getByUsuario: async (id_usuario) => await PedidoRepository.findByUsuario(id_usuario),
  getById: async (id_pedido, id_usuario) => {
    const pedido = await PedidoRepository.findByIdAndUser(id_pedido, id_usuario);
    if (!pedido) throw new Error("Pedido no encontrado o no autorizado");
    return await PedidoRepository.findById(id_pedido);
  },
  create: async (data, id_campesino, id_comprador) => {
    if (!data.total || data.total <= 0) throw new Error("El total debe ser mayor a 0");
    return await PedidoRepository.create(data, id_campesino, id_comprador);
  },
  update: async (id_pedido, data, id_usuario) => {
    const existente = await PedidoRepository.findByIdAndUser(id_pedido, id_usuario);
    if (!existente) throw new Error("Pedido no encontrado o no autorizado");
    return await PedidoRepository.update(id_pedido, data, id_usuario);
  },
  delete: async (id_pedido, id_usuario) => {
    const existente = await PedidoRepository.findByIdAndUser(id_pedido, id_usuario);
    if (!existente) throw new Error("Pedido no encontrado o no autorizado");
    const result = await PedidoRepository.delete(id_pedido, id_usuario);
    if (!result) throw new Error("Error al eliminar");
    return { success: true, message: "Pedido eliminado correctamente" };
  }
};