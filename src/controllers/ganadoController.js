import { GanadoService } from "../services/ganadoService.js";
import { validateGanadoCreate, validateGanadoUpdate } from "../validations/ganado.validation.js";

export const getGanado = async (req, res) => {
  try {
    const id_usuario = req.user.id_usuario;
    const ganado = await GanadoService.getAllByUser(id_usuario);

    return res.json({
      message: "Listado de ganado obtenido correctamente",
      data: ganado
    });
  } catch (error) {
    console.error("Error obteniendo ganado:", error);
    return res.status(500).json({ message: error.message || "Error obteniendo ganado" });
  }
};

export const crearGanado = async (req, res) => {
  try {
    const validation = validateGanadoCreate(req.body);
    if (!validation.success) {
      const errors = validation.error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message
      }));
      return res.status(400).json({ message: "Error de validación", errors });
    }

    const id_usuario = req.user.id_usuario;
    const nuevoGanado = await GanadoService.create(validation.data, id_usuario);

    return res.status(201).json({
      message: "Ganado registrado correctamente",
      data: nuevoGanado
    });
  } catch (error) {
    console.error("Error creando ganado:", error);
    return res.status(400).json({ message: error.message || "Error creando ganado" });
  }
};

export const updateGanado = async (req, res) => {
  try {
    const validation = validateGanadoUpdate(req.body);
    if (!validation.success) {
      const errors = validation.error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message
      }));
      return res.status(400).json({ message: "Error de validación", errors });
    }

    const id_ganado = req.params.id;
    const id_usuario = req.user.id_usuario;

    const actualizado = await GanadoService.update(id_ganado, validation.data, id_usuario);

    return res.json({
      message: "Ganado actualizado correctamente",
      data: actualizado
    });
  } catch (error) {
    console.error("Error actualizando ganado:", error);
    const status = error.message.includes("no encontrado") ? 404 : 400;
    return res.status(status).json({ message: error.message || "Error actualizando ganado" });
  }
};

export const deleteGanado = async (req, res) => {
  try {
    const id_ganado = req.params.id;
    const id_usuario = req.user.id_usuario;

    const result = await GanadoService.delete(id_ganado, id_usuario);

    return res.json({
      message: "Ganado eliminado correctamente"
    });
  } catch (error) {
    console.error("Error eliminando ganado:", error);
    const status = error.message.includes("no encontrado") ? 404 : 400;
    return res.status(status).json({ message: error.message || "Error eliminando ganado" });
  }
};