import { CarritoService } from "../services/carritoService.js";
import { AddCarritoDTO, CarritoResponseDTO, CarritoListDTO } from "../dtos/index.js";

export const getCarrito = async (req, res) => {
  try {
    const items = await CarritoService.getCarrito(req.user.id_usuario);
    const data = items.map(i => new CarritoResponseDTO(i).toObject());
    return res.json({ message: "Carrito obtenido correctamente", data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const addItemCarrito = async (req, res) => {
  try {
    const addDTO = new AddCarritoDTO(req.body);
    const item = await CarritoService.addItem(req.user.id_usuario, addDTO.toObject());
    const responseDTO = new CarritoResponseDTO(item);
    return res.json({ message: "Producto agregado al carrito", data: responseDTO.toObject() });
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