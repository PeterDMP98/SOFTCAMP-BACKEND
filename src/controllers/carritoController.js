import { CarritoService } from "../services/carritoService.js";

export const getCarrito = async (req, res) => {
  try {
    const items = await CarritoService.getCarrito(req.user.id_usuario);
    return res.json({ message: "Carrito obtenido correctamente", data: items });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const addItemCarrito = async (req, res) => {
  try {
    const item = await CarritoService.addItem(req.user.id_usuario, req.body);
    return res.json({ message: "Producto agregado al carrito", data: item });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const removeItemCarrito = async (req, res) => {
  try {
    await CarritoService.removeItem(req.user.id_usuario, req.params.id_producto);
    return res.json({ message: "Producto eliminado del carrito" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const clearCarrito = async (req, res) => {
  try {
    await CarritoService.clear(req.user.id_usuario);
    return res.json({ message: "Carrito vaciado correctamente" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};