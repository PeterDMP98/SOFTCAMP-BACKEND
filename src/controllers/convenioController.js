import { ConveniosService } from "../services/convenioService.js";
import { validateConvenioCreate, validateConvenioUpdate } from "../validations/convenio.validation.js";

export const getConvenios = async (req, res) => {
  try {
    const convenios = await ConveniosService.getByCampesino(req.user.id_usuario);
    return res.json({ message: "Convenios obtenidos correctamente", data: convenios });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getConvenioById = async (req, res) => {
  try {
    const convenio = await ConveniosService.getById(req.params.id, req.user.id_usuario);
    return res.json({ message: "Convenio obtenido correctamente", data: convenio });
  } catch (error) {
    const status = error.message.includes("no encontrado") ? 404 : 500;
    return res.status(status).json({ message: error.message });
  }
};

export const createConvenio = async (req, res) => {
  try {
    const validation = validateConvenioCreate(req.body);
    if (!validation.success) {
      return res.status(400).json({ message: "Error de validación", errors: validation.error.errors.map(e => ({ field: e.path.join("."), message: e.message })) });
    }
    const nuevo = await ConveniosService.create(validation.data, req.user.id_usuario, validation.data.id_usuario_comprador);
    return res.status(201).json({ message: "Convenio creado correctamente", data: nuevo });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const updateConvenio = async (req, res) => {
  try {
    const validation = validateConvenioUpdate(req.body);
    if (!validation.success) {
      return res.status(400).json({ message: "Error de validación", errors: validation.error.errors.map(e => ({ field: e.path.join("."), message: e.message })) });
    }
    const actualizado = await ConveniosService.update(req.params.id, validation.data, req.user.id_usuario);
    return res.json({ message: "Convenio actualizado correctamente", data: actualizado });
  } catch (error) {
    const status = error.message.includes("no encontrado") ? 404 : 400;
    return res.status(status).json({ message: error.message });
  }
};

export const deleteConvenio = async (req, res) => {
  try {
    await ConveniosService.delete(req.params.id, req.user.id_usuario);
    return res.json({ message: "Convenio eliminado correctamente" });
  } catch (error) {
    const status = error.message.includes("no encontrado") ? 404 : 400;
    return res.status(status).json({ message: error.message });
  }
};