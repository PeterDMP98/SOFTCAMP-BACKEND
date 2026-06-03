import { SiembraService } from "../services/siembraService.js";
import { validateSiembraCreate, validateSiembraUpdate } from "../validations/siembra.validation.js";

export const getSiembras = async (req, res) => {
  try {
    const id_usuario = req.user.id_usuario;
    const siembras = await SiembraService.getAllByUser(id_usuario);
    return res.json({ message: "Siembras obtenidas correctamente", data: siembras });
  } catch (error) {
    console.error("Error obteniendo siembras:", error);
    return res.status(500).json({ message: error.message || "Error obteniendo siembras" });
  }
};

export const getSiembraById = async (req, res) => {
  try {
    const { id } = req.params;
    const id_usuario = req.user.id_usuario;
    const siembra = await SiembraService.getById(id, id_usuario);
    return res.json({ message: "Siembra obtenida correctamente", data: siembra });
  } catch (error) {
    console.error("Error obteniendo siembra:", error);
    const status = error.message.includes("no encontrada") ? 404 : 500;
    return res.status(status).json({ message: error.message || "Error obteniendo siembra" });
  }
};

export const createSiembra = async (req, res) => {
  try {
    const id_usuario = req.user.id_usuario;
    const validation = validateSiembraCreate(req.body);
    if (!validation.success) {
      const errors = validation.error.errors.map((err) => ({ field: err.path.join("."), message: err.message }));
      return res.status(400).json({ message: "Error de validación", errors });
    }
    const nueva = await SiembraService.create(validation.data, id_usuario);
    return res.status(201).json({ message: "Siembra creada correctamente", data: nueva });
  } catch (error) {
    console.error("Error creando siembra:", error);
    return res.status(400).json({ message: error.message || "Error creando siembra" });
  }
};

export const updateSiembra = async (req, res) => {
  try {
    const { id } = req.params;
    const id_usuario = req.user.id_usuario;
    const validation = validateSiembraUpdate(req.body);
    if (!validation.success) {
      const errors = validation.error.errors.map((err) => ({ field: err.path.join("."), message: err.message }));
      return res.status(400).json({ message: "Error de validación", errors });
    }
    const actualizada = await SiembraService.update(id, validation.data, id_usuario);
    return res.json({ message: "Siembra actualizada correctamente", data: actualizada });
  } catch (error) {
    console.error("Error actualizando siembra:", error);
    const status = error.message.includes("no encontrada") ? 404 : 400;
    return res.status(status).json({ message: error.message || "Error actualizando siembra" });
  }
};

export const deleteSiembra = async (req, res) => {
  try {
    const { id } = req.params;
    const id_usuario = req.user.id_usuario;
    const result = await SiembraService.delete(id, id_usuario);
    return res.json({ message: "Siembra eliminada correctamente" });
  } catch (error) {
    console.error("Error eliminando siembra:", error);
    const status = error.message.includes("no encontrada") ? 404 : 400;
    return res.status(status).json({ message: error.message || "Error eliminando siembra" });
  }
};