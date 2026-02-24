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
    const { id_madre, id_padre } = req.body;
    const { tipo_evento } = req.body;

    const validos = ['Servicio', 'Parto', 'Aborto', 'Otros'];
    if (!validos.includes(tipo_evento)) {
      return res.status(400).json({ message: "Tipo de evento inválido" });
    }

    const madre = id_madre ? await GanadoModel.getById(id_madre) : null;
    const padre = id_padre ? await GanadoModel.getById(id_padre) : null;

    if (!madre || madre.sexo !== 'Hembra') {
      return res.status(400).json({ message: "El ganado madre debe ser hembra" });
    }

    if (padre && padre.sexo !== 'Macho') {
      return res.status(400).json({ message: "El ganado padre debe ser macho" });
    }

    if (madre.id_usuario !== id_usuario) {
      return res.status(403).json({ message: "No autorizado" });
    }

    const nuevo = await RegistroReproduccionModel.create(req.body);
    res.status(201).json({ data: nuevo });

  } catch (error) {
    res.status(500).json({ message: "Error creando registro reproductivo" });
  }
};

export const updateReproduccion = async (req, res) => {
  try {
    const { id } = req.params;
    const id_usuario = req.user.id_usuario;

    const registro = await RegistroReproduccionModel.getById(id);
    if (!registro || registro.id_usuario !== id_usuario) {
      return res.status(403).json({ message: "No autorizado" });
    }

    const ahora = new Date();
    const creado = new Date(registro.created_at);
    const minutosPermitidos = 60;

    const diffMin = (ahora - creado) / 1000 / 60;

    if (diffMin > minutosPermitidos) {
      return res.status(403).json({
        message: "Solo se puede editar durante la primera hora"
      });
    }

    const actualizado = await RegistroReproduccionModel.update(id, req.body);
    res.json({ data: actualizado });

  } catch (error) {
    res.status(500).json({ message: "Error actualizando registro reproductivo" });
  }
};

export const deactivateReproduccion = async (req, res) => {
  try {
    const { id } = req.params;
    const id_usuario = req.user.id_usuario;

    const registro = await RegistroReproduccionModel.getById(id);
    if (!registro || registro.id_usuario !== id_usuario) {
      return res.status(403).json({ message: "No autorizado" });
    }

    const ok = await RegistroReproduccionModel.deactivate(id);
    if (!ok) {
      return res.status(404).json({ message: "Registro no encontrado" });
    }

    res.json({ message: "Registro reproductivo desactivado" });

  } catch (error) {
    res.status(500).json({ message: "Error desactivando registro reproductivo" });
  }
};