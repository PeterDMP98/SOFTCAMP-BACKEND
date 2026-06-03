import { PedidoService } from "../services/pedidoService.js";
import { validatePedidoCreate, validatePedidoUpdate } from "../validations/pedido.validation.js";
import { CreatePedidoDTO, UpdatePedidoDTO, PedidoResponseDTO, PedidoListDTO } from "../dtos/index.js";

export const getPedidos = async (req, res) => {
  try {
    const pedidos = await PedidoService.getByUsuario(req.user.id_usuario);
    const data = pedidos.map(p => new PedidoListDTO(p).toObject());
    return res.json({ message: "Pedidos obtenidos correctamente", data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPedidoById = async (req, res) => {
  try {
    const pedido = await PedidoService.getById(req.params.id, req.user.id_usuario);
    const data = new PedidoResponseDTO(pedido).toObject();
    return res.json({ message: "Pedido obtenido correctamente", data });
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
    const createDTO = new CreatePedidoDTO(validation.data);
    const nuevo = await PedidoService.create(createDTO.toObject(), req.user.id_usuario, validation.data.id_usuario_comprador);
    const responseDTO = new PedidoResponseDTO(nuevo);
    return res.status(201).json({ message: "Pedido creado correctamente", data: responseDTO.toObject() });
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
    const updateDTO = new UpdatePedidoDTO(validation.data);
    const actualizado = await PedidoService.update(req.params.id, updateDTO.toObjectFiltered(), req.user.id_usuario);
    const responseDTO = new PedidoResponseDTO(actualizado);
    return res.json({ message: "Pedido actualizado correctamente", data: responseDTO.toObject() });
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