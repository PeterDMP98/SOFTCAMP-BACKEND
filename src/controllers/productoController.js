import { ProductoService } from "../services/productoService.js";
import { validateProductoCreate, validateProductoUpdate } from "../validations/producto.validation.js";
import { CreateProductoDTO, UpdateProductoDTO, ProductoResponseDTO, ProductoListDTO } from "../dtos/index.js";

export const getProductos = async (req, res) => {
  try {
    const productos = await ProductoService.getAllByUser(req.user.id_usuario);
    const data = productos.map(p => new ProductoListDTO(p).toObject());
    return res.json({ message: "Productos obtenidos correctamente", data });
  } catch (error) {
    return res.status(500).json({ message: error.message || "Error obteniendo productos" });
  }
};

export const getProductoById = async (req, res) => {
  try {
    const producto = await ProductoService.getById(req.params.id, req.user.id_usuario);
    const data = new ProductoResponseDTO(producto).toObject();
    return res.json({ message: "Producto obtenido correctamente", data });
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
    const createDTO = new CreateProductoDTO(validation.data);
    const nuevo = await ProductoService.create(createDTO.toObject(), req.user.id_usuario);
    const responseDTO = new ProductoResponseDTO(nuevo);
    return res.status(201).json({ message: "Producto creado correctamente", data: responseDTO.toObject() });
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
    const updateDTO = new UpdateProductoDTO(validation.data);
    const actualizado = await ProductoService.update(req.params.id, updateDTO.toObjectFiltered(), req.user.id_usuario);
    const responseDTO = new ProductoResponseDTO(actualizado);
    return res.json({ message: "Producto actualizado correctamente", data: responseDTO.toObject() });
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