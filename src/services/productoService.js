import { ProductoRepository } from "../repositories/productoRepository.js";

export const ProductoService = {
  getAllByUser: async (id_usuario) => await ProductoRepository.findByUser(id_usuario),
  getById: async (id_producto, id_usuario) => {
    const prod = await ProductoRepository.findByIdAndUser(id_producto, id_usuario);
    if (!prod) throw new Error("Producto no encontrado o no autorizado");
    return await ProductoRepository.findById(id_producto);
  },
  create: async (data, id_usuario) => {
    if (!data.nombre) throw new Error("El nombre es requerido");
    if (!data.unidad_de_medida) throw new Error("La unidad de medida es requerida");
    return await ProductoRepository.create(data, id_usuario);
  },
  update: async (id_producto, data, id_usuario) => {
    const existente = await ProductoRepository.findByIdAndUser(id_producto, id_usuario);
    if (!existente) throw new Error("Producto no encontrado o no autorizado");
    return await ProductoRepository.update(id_producto, data, id_usuario);
  },
  delete: async (id_producto, id_usuario) => {
    const existente = await ProductoRepository.findByIdAndUser(id_producto, id_usuario);
    if (!existente) throw new Error("Producto no encontrado o no autorizado");
    const result = await ProductoRepository.delete(id_producto, id_usuario);
    if (!result) throw new Error("Error al eliminar producto");
    return { success: true, message: "Producto eliminado correctamente" };
  }
};