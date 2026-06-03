import { iaRepository } from "../repositories/iaRepository.js";
import dotenv from "dotenv";

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-3.5-turbo";
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

// Sistema prompt para el asistente agrícola
const SYSTEM_PROMPT = `Eres un experto agrícola y ganadero colombiano que ayuda a campesinos con:
- Cultivos y siembras (yuca, plátano, maíz, café, etc.)
- Ganadería (manejo de ganado, salud animal, reproducción)
- Control de plagas y enfermedades
- Optimización de cosechas
- Mejora de rendimientos

Proporciona:
1. Respuestas claras y prácticas
2. Recomendaciones basadas en contexto agrícola colombiano
3. Soluciones offline-friendly (sin necesidad de internet en el campo)
4. Lenguaje simple y accesible

Cuando el usuario pida sugerencias, proporciona recomendaciones estructuradas.
Si detectas que el usuario necesita una tarea, sugiere crearla.`;

export const iaService = {
  // CHAT PRINCIPAL
  async sendMessage(id_usuario, id_chat, contenido, contextoUsuario = {}) {
    try {
      // Validar que el chat pertenece al usuario
      if (id_chat) {
        const chat = await iaRepository.getChatById(id_chat, id_usuario);
        if (!chat) {
          throw new Error("Chat no encontrado o no autorizado");
        }
      } else {
        // Crear nuevo chat si no existe
        const nuevoChat = await iaRepository.createChat(id_usuario);
        id_chat = nuevoChat.id_chat;
      }

      // Guardar mensaje del usuario
      await iaRepository.addMessage(id_chat, "user", contenido);

      // Obtener historial reciente para contexto
      const historialMensajes = await iaRepository.getLatestMessages(id_chat, 10);
      const conversationHistory = historialMensajes.map((msg) => ({
        role: msg.rol === "user" ? "user" : "assistant",
        content: msg.contenido,
      }));

      // Llamar a OpenAI
      const respuestaIA = await this.callOpenAI(conversationHistory, contextoUsuario);

      // Guardar respuesta de la IA
      const respuestaGuardada = await iaRepository.addMessage(id_chat, "assistant", respuestaIA);

      return {
        id_chat,
        mensaje: respuestaIA,
        id_mensaje: respuestaGuardada.id_mensaje,
      };
    } catch (error) {
      throw new Error(`Error al procesar mensaje: ${error.message}`);
    }
  },

  // Llamar a OpenAI API
  async callOpenAI(conversationHistory, contextoUsuario = {}) {
    if (!OPENAI_API_KEY) {
      // Modo desarrollo: respuesta simulada
      console.warn("OPENAI_API_KEY no configurada. Usando respuesta simulada.");
      return this.generarRespuestaSimulada(conversationHistory[conversationHistory.length - 1].content);
    }

    try {
      const payload = {
        model: OPENAI_MODEL,
        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPT + this.construirContextoUsuario(contextoUsuario),
          },
          ...conversationHistory,
        ],
        temperature: 0.7,
        max_tokens: 1000,
      };

      const response = await fetch(OPENAI_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`OpenAI API Error: ${error.error?.message || response.statusText}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("Error en OpenAI:", error);
      throw new Error(`Error al llamar OpenAI: ${error.message}`);
    }
  },

  // Construir contexto del usuario para enviar a la IA
  construirContextoUsuario(contextoUsuario) {
    if (!contextoUsuario || Object.keys(contextoUsuario).length === 0) {
      return "";
    }

    let contexto = "\n\nContexto del usuario:\n";

    if (contextoUsuario.tipo_usuario) {
      contexto += `- Tipo de usuario: ${contextoUsuario.tipo_usuario}\n`;
    }

    if (contextoUsuario.ganado) {
      contexto += `- Ganado registrado: ${contextoUsuario.ganado.cantidad} animales (${contextoUsuario.ganado.razas?.join(", ")})\n`;
    }

    if (contextoUsuario.siembras) {
      contexto += `- Cultivos activos: ${contextoUsuario.siembras.join(", ")}\n`;
    }

    if (contextoUsuario.problemas_recientes) {
      contexto += `- Problemas reportados: ${contextoUsuario.problemas_recientes.join(", ")}\n`;
    }

    return contexto;
  },

  // Respuesta simulada para desarrollo
  generarRespuestaSimulada(pregunta) {
    const respuestas = {
      plagas: "Para controlar plagas, recomiendo: 1) Rotación de cultivos, 2) Uso de insecticidas orgánicos, 3) Monitoreo regular.",
      ganado:
        "El ganado requiere: 1) Vacunación regular, 2) Agua limpia y alimento de calidad, 3) Control veterinario mensual.",
      yuca: "La yuca se siembra mejor en: 1) Terreno bien drenado, 2) Distancia de 1m entre plantas, 3) Cosechar a los 8-12 meses.",
      cultivo:
        "Para mejorar cultivos: 1) Análisis de suelo, 2) Rotación de cultivos, 3) Riego adecuado, 4) Control de plagas.",
      default:
        "He entendido tu pregunta. Basándome en mejores prácticas agrícolas colombianas, te recomiendo consultar con expertos locales para situaciones específicas.",
    };

    const preguntaBaja = pregunta.toLowerCase();
    for (const [clave, respuesta] of Object.entries(respuestas)) {
      if (preguntaBaja.includes(clave)) {
        return respuesta;
      }
    }

    return respuestas.default;
  },

  // GESTIÓN DE CHATS
  async obtenerMisChats(id_usuario, limit = 20, offset = 0) {
    try {
      const chats = await iaRepository.getUserChats(id_usuario, limit, offset);
      return chats;
    } catch (error) {
      throw new Error(`Error al obtener chats: ${error.message}`);
    }
  },

  async obtenerChat(id_usuario, id_chat) {
    try {
      const chat = await iaRepository.getChatById(id_chat, id_usuario);
      if (!chat) {
        throw new Error("Chat no encontrado");
      }

      const mensajes = await iaRepository.getChatMessages(id_chat);
      return { ...chat, mensajes };
    } catch (error) {
      throw new Error(`Error al obtener chat: ${error.message}`);
    }
  },

  async renombrarChat(id_usuario, id_chat, titulo) {
    try {
      const chat = await iaRepository.getChatById(id_chat, id_usuario);
      if (!chat) {
        throw new Error("Chat no encontrado");
      }

      return await iaRepository.updateChatTitle(id_chat, id_usuario, titulo);
    } catch (error) {
      throw new Error(`Error al renombrar chat: ${error.message}`);
    }
  },

  async eliminarChat(id_usuario, id_chat) {
    try {
      const resultado = await iaRepository.deleteChat(id_chat, id_usuario);
      if (!resultado) {
        throw new Error("Chat no encontrado");
      }

      return { success: true, message: "Chat eliminado correctamente" };
    } catch (error) {
      throw new Error(`Error al eliminar chat: ${error.message}`);
    }
  },

  // RECOMENDACIONES
  async generarRecomendaciones(id_usuario, contextoUsuario) {
    try {
      const recomendaciones = [];

      // Lógica para generar recomendaciones basadas en contexto
      if (contextoUsuario.ganado && contextoUsuario.ganado.cantidad > 0) {
        recomendaciones.push({
          tipo: "ganado",
          titulo: "Revisión veterinaria periódica",
          descripcion: "Se recomienda realizar un control veterinario mensual para mantener la salud del ganado.",
          confianza: 0.9,
        });
      }

      if (contextoUsuario.siembras && contextoUsuario.siembras.length > 0) {
        recomendaciones.push({
          tipo: "cultivo",
          titulo: "Monitoreo de plagas en cultivos",
          descripcion: "Realiza inspecciones regulares para detectar plagas tempranamente.",
          confianza: 0.85,
        });
      }

      // Guardar recomendaciones generadas
      const recomendacionesGuardadas = [];
      for (const rec of recomendaciones) {
        const guardada = await iaRepository.createRecomendacion(
          id_usuario,
          rec.tipo,
          rec.titulo,
          rec.descripcion,
          rec.confianza,
          contextoUsuario
        );
        recomendacionesGuardadas.push(guardada);
      }

      return recomendacionesGuardadas;
    } catch (error) {
      throw new Error(`Error al generar recomendaciones: ${error.message}`);
    }
  },

  async obtenerMisRecomendaciones(id_usuario, solo_pendientes = true) {
    try {
      return await iaRepository.getUserRecomendaciones(id_usuario, !solo_pendientes, 20, 0);
    } catch (error) {
      throw new Error(`Error al obtener recomendaciones: ${error.message}`);
    }
  },

  async aceptarRecomendacion(id_usuario, id_recomendacion) {
    try {
      return await iaRepository.acceptRecomendacion(id_recomendacion, id_usuario);
    } catch (error) {
      throw new Error(`Error al aceptar recomendación: ${error.message}`);
    }
  },

  async rechazarRecomendacion(id_usuario, id_recomendacion) {
    try {
      return await iaRepository.rejectRecomendacion(id_recomendacion, id_usuario);
    } catch (error) {
      throw new Error(`Error al rechazar recomendación: ${error.message}`);
    }
  },

  // GENERAR TAREAS DESDE RECOMENDACIONES
  async generarTareasDesdeRecomendacion(id_usuario, id_recomendacion) {
    try {
      const recomendacion = await iaRepository.getRecomendacionById(id_recomendacion, id_usuario);
      if (!recomendacion) {
        throw new Error("Recomendación no encontrada");
      }

      const tarea = await iaRepository.createGeneratedTask(
        id_usuario,
        id_recomendacion,
        recomendacion.titulo,
        recomendacion.descripcion,
        "media",
        new Date()
      );

      return tarea;
    } catch (error) {
      throw new Error(`Error al generar tarea: ${error.message}`);
    }
  },

  async obtenerMisTareasGeneradas(id_usuario) {
    try {
      return await iaRepository.getUserGeneratedTasks(id_usuario, 20, 0);
    } catch (error) {
      throw new Error(`Error al obtener tareas: ${error.message}`);
    }
  },

  // ESTADÍSTICAS
  async obtenerEstadísticasUsuario(id_usuario) {
    try {
      return await iaRepository.getUserChatStats(id_usuario);
    } catch (error) {
      throw new Error(`Error al obtener estadísticas: ${error.message}`);
    }
  },
};
