import { StockRepository } from "../repositories/stockRepository.js";

const ESTADOS = ['disponible', 'reservado', 'vendido', 'agotado'];

export const StockService = {
  getAllByUser: async (id_usuario) => await StockRepository.findByUser(id_usuario),
  getById: async (id_stock, id_usuario) => {
    const stock = await StockRepository.findByIdAndUser(id_stock, id_usuario);
    if (!stock) throw new Error("Stock no encontrado o no autorizado");
    return await StockRepository.findById(id_stock);
  },
  create: async (data, id_usuario) => {
    if (!data.id_producto) throw new Error("El producto es requerido");
    if (data.cantidad_stock !== undefined && data.cantidad_stock < 0) throw new Error("La cantidad no puede ser negativa");
    return await StockRepository.create(data, id_usuario);
  },
  update: async (id_stock, data, id_usuario) => {
    const existente = await StockRepository.findByIdAndUser(id_stock, id_usuario);
    if (!existente) throw new Error("Stock no encontrado o no autorizado");
    if (data.estado && !ESTADOS.includes(data.estado)) throw new Error("Estado inválido");
    return await StockRepository.update(id_stock, data, id_usuario);
  },
  delete: async (id_stock, id_usuario) => {
    const existente = await StockRepository.findByIdAndUser(id_stock, id_usuario);
    if (!existente) throw new Error("Stock no encontrado o no autorizado");
    const result = await StockRepository.delete(id_stock, id_usuario);
    if (!result) throw new Error("Error al eliminar stock");
    return { success: true, message: "Stock eliminado correctamente" };
  }
};