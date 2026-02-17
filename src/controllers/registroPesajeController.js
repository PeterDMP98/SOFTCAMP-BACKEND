import { RegistroPesajeModel } from "../models/registroPesajeModel.js";
import { GanadoModel } from "../models/ganadoModel.js";

export const getPesajesByGanado = async (req, res) => {
  try {
    const { id } = req.params; // id_ganado
    const id_usuario = req.user.id_usuario;

    if (req.body.peso <= 0) {
      return res.status(400).json({ message: "Peso inválido" });
    }
    
    const ganado = await GanadoModel.getById(id);
    if (!ganado) {
      return res.status(404).json({ message: "Ganado no encontrado" });
    }

    if (ganado.id_usuario !== id_usuario) {
      return res.status(403).json({ message: "No autorizado" });
    }

    const pesajes = await RegistroPesajeModel.getByGanado(id);
    res.json({ data: pesajes });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error obteniendo registros de pesaje" });
  }
};

export const getPesajeById = async (req, res) => {
  try {
    const { id } = req.params;
    const id_usuario = req.user.id_usuario;

    const pesaje = await RegistroPesajeModel.getById(id);

    if (!pesaje) {
      return res.status(404).json({ message: "Registro de pesaje no encontrado" });
    }

    if (pesaje.id_usuario !== id_usuario) {
      return res.status(403).json({ message: "No autorizado" });
    }

    res.json({ data: pesaje });

  } catch (error) {
    res.status(500).json({ message: "Error obteniendo registro de pesaje" });
  }
};

export const createPesaje = async (req, res) => {
  try {
    const { id } = req.params; // id_ganado
    const id_usuario = req.user.id_usuario;

    const ganado = await GanadoModel.getById(id);
    if (!ganado || ganado.id_usuario !== id_usuario) {
      return res.status(403).json({ message: "No autorizado" });
    }

    const nuevo = await RegistroPesajeModel.create(id, req.body);
    res.status(201).json({ data: nuevo });

  } catch (error) {
    res.status(500).json({ message: "Error creando registro de pesaje" });
  }
};
