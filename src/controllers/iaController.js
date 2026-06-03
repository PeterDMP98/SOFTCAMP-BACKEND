import { iaService } from "../services/iaService.js";
import {
  validateChatMessage,
  validateCreateChat,
  validateRecomendacion,
  validateGenerateTask,
} from "../validations/ia.validation.js";

export const iaController = {
  // CHAT ENDPOINTS
  async crearChat(req, res) {
    try {
      const { titulo } = validateCreateChat(req.body);
      const id_usuario = req.user.id_usuario;

      const chat = await iaService.crearChat(id_usuario, titulo);
      res.status(201).json(chat);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async enviarMensaje(req, res) {
    try {
      const { id_chat, contenido } = validateChatMessage(req.body);
      const id_usuario = req.user.id_usuario;

      // Contexto adicional del usuario (opcional)
      const contextoUsuario = req.body.contextoUsuario || {};

      const resultado = await iaService.sendMessage(id_usuario, id_chat, contenido, contextoUsuario);
      res.status(200).json(resultado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async obtenerChat(req, res) {
    try {
      const { id_chat } = req.params;
      const id_usuario = req.user.id_usuario;

      const chat = await iaService.obtenerChat(id_usuario, parseInt(id_chat));
      res.status(200).json(chat);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

  async obtenerMisChats(req, res) {
    try {
      const id_usuario = req.user.id_usuario;
      const { limit = 20, offset = 0 } = req.query;

      const chats = await iaService.obtenerMisChats(id_usuario, parseInt(limit), parseInt(offset));
      res.status(200).json(chats);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async renombrarChat(req, res) {
    try {
      const { id_chat } = req.params;
      const { titulo } = req.body;
      const id_usuario = req.user.id_usuario;

      if (!titulo) {
        return res.status(400).json({ error: "Título es requerido" });
      }

      const chat = await iaService.renombrarChat(id_usuario, parseInt(id_chat), titulo);
      res.status(200).json(chat);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async eliminarChat(req, res) {
    try {
      const { id_chat } = req.params;
      const id_usuario = req.user.id_usuario;

      const resultado = await iaService.eliminarChat(id_usuario, parseInt(id_chat));
      res.status(200).json(resultado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // RECOMENDACIONES ENDPOINTS
  async generarRecomendaciones(req, res) {
    try {
      const id_usuario = req.user.id_usuario;
      const contextoUsuario = req.body.contextoUsuario || {};

      const recomendaciones = await iaService.generarRecomendaciones(id_usuario, contextoUsuario);
      res.status(200).json(recomendaciones);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async obtenerMisRecomendaciones(req, res) {
    try {
      const id_usuario = req.user.id_usuario;
      const { solo_pendientes = true } = req.query;

      const recomendaciones = await iaService.obtenerMisRecomendaciones(
        id_usuario,
        solo_pendientes === "true"
      );
      res.status(200).json(recomendaciones);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async aceptarRecomendacion(req, res) {
    try {
      const { id_recomendacion } = req.params;
      const id_usuario = req.user.id_usuario;

      const resultado = await iaService.aceptarRecomendacion(
        id_usuario,
        parseInt(id_recomendacion)
      );
      res.status(200).json(resultado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async rechazarRecomendacion(req, res) {
    try {
      const { id_recomendacion } = req.params;
      const id_usuario = req.user.id_usuario;

      const resultado = await iaService.rechazarRecomendacion(id_usuario, parseInt(id_recomendacion));
      res.status(200).json(resultado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // GENERATED TASKS ENDPOINTS
  async generarTareasDesdeRecomendacion(req, res) {
    try {
      const { id_recomendacion } = req.params;
      const id_usuario = req.user.id_usuario;

      const tarea = await iaService.generarTareasDesdeRecomendacion(
        id_usuario,
        parseInt(id_recomendacion)
      );
      res.status(201).json(tarea);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async obtenerMisTareasGeneradas(req, res) {
    try {
      const id_usuario = req.user.id_usuario;

      const tareas = await iaService.obtenerMisTareasGeneradas(id_usuario);
      res.status(200).json(tareas);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // ESTADÍSTICAS
  async obtenerEstadísticas(req, res) {
    try {
      const id_usuario = req.user.id_usuario;

      const estadísticas = await iaService.obtenerEstadísticasUsuario(id_usuario);
      res.status(200).json(estadísticas);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // HEALTH CHECK
  async health(req, res) {
    res.status(200).json({ status: "IA Module is running", timestamp: new Date() });
  },
};
