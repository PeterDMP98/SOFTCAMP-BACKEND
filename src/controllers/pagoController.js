import { PagoService } from "../services/pagoService.js";
import { CreatePagoDTO, UpdatePagoDTO, PagoResponseDTO, PagoListDTO } from "../dtos/index.js";

export const getPagos = async (req, res) => {
  try {
    const pagos = await PagoService.getByUsuario(req.user.id_usuario);
    const data = pagos.map(p => new PagoListDTO(p).toObject());
    return res.json({ message: "Pagos obtenidos correctamente", data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createPago = async (req, res) => {
  try {
    const createDTO = new CreatePagoDTO(req.body);
    const pago = await PagoService.create(createDTO.toObject());
    const responseDTO = new PagoResponseDTO(pago);
    return res.status(201).json({ message: "Pago registrado correctamente", data: responseDTO.toObject() });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const updateEstadoPago = async (req, res) => {
  try {
    const { estado_pago } = req.body;
    if (!estado_pago) throw new Error("El estado es requerido");
    const updateDTO = new UpdatePagoDTO({ estado: estado_pago });
    const pago = await PagoService.updateEstado(req.params.id, updateDTO.estado);
    const responseDTO = new PagoResponseDTO(pago);
    return res.json({ message: "Estado de pago actualizado", data: responseDTO.toObject() });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};