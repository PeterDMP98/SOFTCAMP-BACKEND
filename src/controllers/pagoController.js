import { PagoService } from "../services/pagoService.js";

export const getPagos = async (req, res) => {
  try {
    const pagos = await PagoService.getByUsuario(req.user.id_usuario);
    return res.json({ message: "Pagos obtenidos correctamente", data: pagos });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createPago = async (req, res) => {
  try {
    const pago = await PagoService.create(req.body);
    return res.status(201).json({ message: "Pago registrado correctamente", data: pago });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const updateEstadoPago = async (req, res) => {
  try {
    const { estado_pago } = req.body;
    if (!estado_pago) throw new Error("El estado es requerido");
    const pago = await PagoService.updateEstado(req.params.id, estado_pago);
    return res.json({ message: "Estado de pago actualizado", data: pago });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};