import { CarritoRepository } from "../repositories/carritoRepository.js";

export const CarritoService = {
  getCarrito: async (id_usuario) => {
    return await CarritoRepository.findByUsuario(id_usuario);
  },

  addItem: async (id_usuario, data) => {
    if (!data.id_stock_producto) throw new Error("El producto es requerido");
    if (!data.cantidad || data.cantidad <= 0) throw new Error("La cantidad debe ser mayor a 0");
    
    const carrito = await CarritoRepository.findOrCreate(id_usuario);
    return await CarritoRepository.addItem(carrito.id_carrito, data.id_stock_producto, data.cantidad, data.precio_unitario || 0);
  },

  removeItem: async (id_usuario, id_stock_producto) => {
    const carrito = await CarritoRepository.findOrCreate(id_usuario);
    return await CarritoRepository.removeItem(carrito.id_carrito, id_stock_producto);
  },

  clear: async (id_usuario) => {
    const carrito = await CarritoRepository.findOrCreate(id_usuario);
    return await CarritoRepository.clearCarrito(carrito.id_carrito);
  }
};