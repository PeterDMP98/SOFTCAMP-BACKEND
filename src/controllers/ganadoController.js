import { GanadoModel } from "../models/ganadoModel.js";

/** Obtener ganado del usuario logueado */
export const getGanado = async (req, res) => {
  try {
    const id_usuario = req.user.id_usuario;
    const ganado = await GanadoModel.getByUser(id_usuario);

    return res.json({
      message: "Listado de ganado obtenido correctamente",
      data: ganado
    });

  } catch (error) {
    console.error("Error obteniendo ganado:", error);
    return res.status(500).json({ message: "Error obteniendo ganado" });
  }
};

/** Crear nuevo registro de ganado */

export const crearGanado = async (req, res) => {
  try {
    const id_usuario = req.user.id_usuario;

    const nuevoGanado = await GanadoModel.create(req.body, id_usuario);

    return res.status(201).json({
      message: "Ganado registrado correctamente",
      data: nuevoGanado
    });

  } catch (error) {
    console.error("Error creando ganado:", error);
    return res.status(500).json({ message: "Error creando ganado" });
  }
};

/** Actualizar ganado (solo si pertenece al usuario) */
export const updateGanado = async (req, res) => {
  try {
    const id_ganado = req.params.id;
    const id_usuario = req.user.id_usuario;

    // Obtener datos actuales del ganado
    const existente = await GanadoModel.getById(id_ganado);

    if (!existente) {
      return res.status(404).json({ message: "Ganado no encontrado" });
    }

    if (existente.id_usuario !== id_usuario) {
      return res.status(403).json({ message: "No autorizado" });
    }

    const dataActualizada = {
      ...existente,
      ...req.body
    };

    const actualizado = await GanadoModel.update(
      id_ganado,
      dataActualizada,
      id_usuario
    );

    return res.json({
      message: "Ganado actualizado correctamente",
      data: actualizado
    });

  } catch (error) {
    console.error("Error actualizando ganado:", error);
    return res.status(500).json({ message: "Error actualizando ganado" });
  }
};


/** Eliminar ganado (solo si pertenece al usuario) */
export const deleteGanado = async (req, res) => {
  try {
    const id_ganado = req.params.id;
    const id_usuario = req.user.id_usuario;

    const existe = await GanadoModel.getById(id_ganado);

    if (!existe || existe.id_usuario !== id_usuario) {
      return res.status(403).json({
        message: "No autorizado o registro no existe"
      });
    }

    const deleted = await GanadoModel.delete(id_ganado, id_usuario);

    return res.json({
      message: "Ganado eliminado correctamente"
    });

  } catch (error) {
    console.error("Error eliminando ganado:", error);
    return res.status(500).json({ message: "Error eliminando ganado" });
  }
};
