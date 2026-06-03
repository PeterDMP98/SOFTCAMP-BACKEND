import { StockService } from "../services/stockService.js";
import { validateStockCreate, validateStockUpdate } from "../validations/stock.validation.js";

export const getStocks = async (req, res) => {
  try {
    const stocks = await StockService.getAllByUser(req.user.id_usuario);
    return res.json({ message: "Stock obtenido correctamente", data: stocks });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getStockById = async (req, res) => {
  try {
    const stock = await StockService.getById(req.params.id, req.user.id_usuario);
    return res.json({ message: "Stock obtenido correctamente", data: stock });
  } catch (error) {
    const status = error.message.includes("no encontrado") ? 404 : 500;
    return res.status(status).json({ message: error.message });
  }
};

export const createStock = async (req, res) => {
  try {
    const validation = validateStockCreate(req.body);
    if (!validation.success) {
      return res.status(400).json({ message: "Error de validación", errors: validation.error.errors.map(e => ({ field: e.path.join("."), message: e.message })) });
    }
    const nuevo = await StockService.create(validation.data, req.user.id_usuario);
    return res.status(201).json({ message: "Stock creado correctamente", data: nuevo });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const updateStock = async (req, res) => {
  try {
    const validation = validateStockUpdate(req.body);
    if (!validation.success) {
      return res.status(400).json({ message: "Error de validación", errors: validation.error.errors.map(e => ({ field: e.path.join("."), message: e.message })) });
    }
    const actualizado = await StockService.update(req.params.id, validation.data, req.user.id_usuario);
    return res.json({ message: "Stock actualizado correctamente", data: actualizado });
  } catch (error) {
    const status = error.message.includes("no encontrado") ? 404 : 400;
    return res.status(status).json({ message: error.message });
  }
};

export const deleteStock = async (req, res) => {
  try {
    await StockService.delete(req.params.id, req.user.id_usuario);
    return res.json({ message: "Stock eliminado correctamente" });
  } catch (error) {
    const status = error.message.includes("no encontrado") ? 404 : 400;
    return res.status(status).json({ message: error.message });
  }
};