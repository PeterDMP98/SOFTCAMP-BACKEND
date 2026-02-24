import { HistorialClinicoModel } from "../models/historialClinico.model.js";
import { GanadoModel } from "../models/ganadoModel.js";

export const getHistorialClinicoByGanado = async (req, res) => {
  try {
    const { id } = req.params;
    const id_usuario = req.user.id_usuario;

    const ganado = await GanadoModel.getById(id);
    if (!ganado || ganado.id_usuario !== id_usuario) {
      return res.status(403).json({ message: "No autorizado" });
    }

    const historial = await HistorialClinicoModel.getByGanado(id, id_usuario);
    res.json({ data: historial });

  } catch (e) {
    res.status(500).json({ message: "Error obteniendo historial clínico" });
  }
};

export const getHistorialClinicoById = async (req, res) => {
  try {
    const id_usuario = req.user.id_usuario;
    const { id } = req.params;

    const historial = await HistorialClinicoModel.getById(id);

    // 1️⃣ No existe
    if (!historial) {
      return res.status(404).json({
        message: "Historial clínico no encontrado"
      });
    }

    // 2️⃣ Existe pero no es del usuario
    if (historial.id_usuario !== id_usuario) {
      return res.status(403).json({
        message: "No autorizado para ver este historial clínico"
      });
    }

    // 3️⃣ Todo OK
    res.json({ data: historial });

  } catch (e) {
    res.status(500).json({
      message: "Error interno del servidor"
    });
  }
};



export const createHistorialClinico = async (req, res) => {
  try {
    const { id } = req.params;
    const id_usuario = req.user.id_usuario;

    const ganado = await GanadoModel.getById(id);
    if (!ganado || ganado.id_usuario !== id_usuario) {
      return res.status(403).json({ message: "No autorizado" });
    }

    const nuevo = await HistorialClinicoModel.create(
      id,
      req.body,
      id_usuario
    );

    res.status(201).json({ data: nuevo });

  } catch (e) {
    res.status(500).json({ message: "Error creando historial clínico" });
  }
};

export const updateHistorialClinicoSeguimiento = async (req, res) => {
  try {
    const actualizado = await HistorialClinicoModel.updateSeguimiento(
      req.params.id,
      req.body,
      req.user.id_usuario
    );

    if (!actualizado) {
      return res.status(403).json({ message: "No autorizado" });
    }

    res.json({ data: actualizado });

  } catch (e) {
    res.status(500).json({ message: "Error actualizando historial clínico" });
  }
};

export const updateHistorialClinicoCorreccion = async (req, res) => {
  try {
    const resultado = await HistorialClinicoModel.updateCorreccion(
      req.params.id,
      req.body,
      req.user.id_usuario
    );

    if (resultado === "TIME_EXPIRED") {
      return res.status(403).json({
        message: "Este historial ya no puede modificarse"
      });
    }

    if (!resultado) {
      return res.status(403).json({ message: "No autorizado" });
    }

    res.json({ data: resultado });

  } catch (e) {
    res.status(500).json({ message: "Error actualizando historial clínico" });
  }
};