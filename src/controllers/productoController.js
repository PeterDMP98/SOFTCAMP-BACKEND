import { ProductoService } from "../services/productoService.js";
import { validateProductoCreate, validateProductoUpdate } from "../validations/producto.validation.js";

export const getProductos = async (req, res) => {
  try {
    const productos = await ProductoService.getAllByUser(req.user.id_usuario);
    return res.json({ message: "Productos obtenidos correctamente", data: productos });
  } catch (error) {
    return res.status(500).json({ message: error.message || "Error obteniendo productos" });
  }
};

export const getProductoById = async (req, res) => {
  try {
    const producto = await ProductoService.getById(req.params.id, req.user.id_usuario);
    return res.json({ message: "Producto obtenido correctamente", data: producto });
  } catch (error) {
    const status = error.message.includes("no encontrado") ? 404 : 500;
    return res.status(status).json({ message: error.message });
  }
};

export const createProducto = async (req, res) => {
  try {
    const validation = validateProductoCreate(req.body);
    if (!validation.success) {
      return res.status(400).json({ message: "Error de validación", errors: validation.error.errors.map(e => ({ field: e.path.join("."), message: e.message })) });
    }
    const nuevo = await ProductoService.create(validation.data, req.user.id_usuario);
    return res.status(201).json({ message: "Producto creado correctamente", data: nuevo });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const updateProducto = async (req, res) => {
  try {
    const validation = validateProductoUpdate(req.body);
    if (!validation.success) {
      return res.status(400).json({ message: "Error de validación", errors: validation.error.errors.map(e => ({ field: e.path.join("."), message: e.message })) });
    }
    const actualizado = await ProductoService.update(req.params.id, validation.data, req.user.id_usuario);
    return res.json({ message: "Producto actualizado correctamente", data: actualizado });
  } catch (error) {
    const status = error.message.includes("no encontrado") ? 404 : 400;
    return res.status(status).json({ message: error.message });
  }
};

export const deleteProducto = async (req, res) => {
  try {
    await ProductoService.delete(req.params.id, req.user.id_usuario);
    return res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    const status = error.message.includes("no encontrado") ? 404 : 400;
    return res.status(status).json({ message: error.message });
  }
};