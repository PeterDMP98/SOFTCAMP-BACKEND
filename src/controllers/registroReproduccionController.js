import { RegistroReproduccionModel } from "../models/registroReproduccionModel.js";
import { GanadoModel } from "../models/ganadoModel.js";

export const getReproduccionByGanado = async (req, res) => {
  try {
    const { id } = req.params; // id_ganado
    const id_usuario = req.user.id_usuario;

    const ganado = await GanadoModel.getById(id);
    if (!ganado) {
      return res.status(404).json({ message: "Ganado no encontrado" });
    }

    if (ganado.id_usuario !== id_usuario) {
      return res.status(403).json({ message: "No autorizado" });
    }

    const registros = await RegistroReproduccionModel.getByGanado(id);
    res.json({ data: registros });

  } catch (error) {
    res.status(500).json({ message: "Error obteniendo registros reproductivos" });
  }
};

export const getReproduccionById = async (req, res) => {
  try {
    const { id } = req.params;
    const id_usuario = req.user.id_usuario;

    const registro = await RegistroReproduccionModel.getById(id);

    if (!registro) {
      return res.status(404).json({ message: "Registro no encontrado" });
    }

    if (registro.id_usuario !== id_usuario) {
      return res.status(403).json({ message: "No autorizado" });
    }

    res.json({ data: registro });

  } catch (error) {
    res.status(500).json({ message: "Error obteniendo registro reproductivo" });
  }
};

export const createReproduccion = async (req, res) => {
  try {
    const id_usuario = req.user.id_usuario;
    const { id_madre, id_padre, tipo_servicio, detalles } = req.body;

    const madre = await GanadoModel.getById(id_madre);
    if (!madre || madre.sexo !== 'Hembra') {
      return res.status(400).json({ message: "La madre debe ser hembra" });
    }

    if (madre.id_usuario !== id_usuario) {
      return res.status(403).json({ message: "No autorizado" });
    }

    if (id_padre) {
      const padre = await GanadoModel.getById(id_padre);
      if (!padre || padre.sexo !== 'Macho') {
        return res.status(400).json({ message: "El padre debe ser macho" });
      }
    }

    const nuevo = await RegistroReproduccionModel.create({
      id_madre,
      id_padre,
      tipo_servicio,
      detalles
    });

    res.status(201).json({ data: nuevo });

  } catch (error) {
    res.status(500).json({ message: "Error creando registro reproductivo" });
  }
};

const ESTADOS_FINALES = [
  'PARTO_EXITOSO',
  'SERVICIO_FALLIDO',
  'ABORTO',
  'FETO_MUERTO',
  'DIAGNOSTICO_NEGATIVO',
  'ERROR_REGISTRO',
  'DUPLICADO'
];

export const updateReproduccion = async (req, res) => {
  try {
    const { id } = req.params;
    const id_usuario = req.user.id_usuario;

    const registro = await RegistroReproduccionModel.getById(id);

    if (!registro || registro.id_usuario !== id_usuario) {
      return res.status(403).json({ message: "No autorizado" });
    }

    if (ESTADOS_FINALES.includes(registro.estado_reproduccion)) {
      return res.status(400).json({
        message: "El registro ya está cerrado y no puede editarse"
      });
    }

    const actualizado = await RegistroReproduccionModel.update(id, req.body);
    res.json({ data: actualizado });

  } catch (error) {
    res.status(500).json({ message: "Error actualizando registro" });
  }
};
