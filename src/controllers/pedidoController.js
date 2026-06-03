import { PedidoService } from "../services/pedidoService.js";
import { validatePedidoCreate, validatePedidoUpdate } from "../validations/pedido.validation.js";

export const getPedidos = async (req, res) => {
  try {
    const pedidos = await PedidoService.getByUsuario(req.user.id_usuario);
    return res.json({ message: "Pedidos obtenidos correctamente", data: pedidos });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPedidoById = async (req, res) => {
  try {
    const pedido = await PedidoService.getById(req.params.id, req.user.id_usuario);
    return res.json({ message: "Pedido obtenido correctamente", data: pedido });
  } catch (error) {
    const status = error.message.includes("no encontrado") ? 404 : 500;
    return res.status(status).json({ message: error.message });
  }
};

export const createPedido = async (req, res) => {
  try {
    const validation = validatePedidoCreate(req.body);
    if (!validation.success) {
      return res.status(400).json({ message: "Error de validación", errors: validation.error.errors.map(e => ({ field: e.path.join("."), message: e.message })) });
    }
    const nuevo = await PedidoService.create(validation.data, req.user.id_usuario, validation.data.id_usuario_comprador);
    return res.status(201).json({ message: "Pedido creado correctamente", data: nuevo });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const updatePedido = async (req, res) => {
  try {
    const validation = validatePedidoUpdate(req.body);
    if (!validation.success) {
      return res.status(400).json({ message: "Error de validación", errors: validation.error.errors.map(e => ({ field: e.path.join("."), message: e.message })) });
    }
    const actualizado = await PedidoService.update(req.params.id, validation.data, req.user.id_usuario);
    return res.json({ message: "Pedido actualizado correctamente", data: actualizado });
  } catch (error) {
    const status = error.message.includes("no encontrado") ? 404 : 400;
    return res.status(status).json({ message: error.message });
  }
};

export const deletePedido = async (req, res) => {
  try {
    await PedidoService.delete(req.params.id, req.user.id_usuario);
    return res.json({ message: "Pedido eliminado correctamente" });
  } catch (error) {
    const status = error.message.includes("no encontrado") ? 404 : 400;
    return res.status(status).json({ message: error.message });
  }
};