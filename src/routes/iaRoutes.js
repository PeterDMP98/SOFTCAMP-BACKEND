import express from "express";
import { iaController } from "../controllers/iaController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Todos los endpoints requieren autenticación
router.use(authenticateToken);

// CHAT ENDPOINTS
router.post("/chat", iaController.enviarMensaje); // Enviar mensaje (crea chat si es nuevo)
router.get("/chat", iaController.obtenerMisChats); // Obtener mis conversaciones
router.get("/chat/:id_chat", iaController.obtenerChat); // Obtener conversación específica
router.put("/chat/:id_chat", iaController.renombrarChat); // Renombrar conversación
router.delete("/chat/:id_chat", iaController.eliminarChat); // Eliminar conversación

// RECOMENDACIONES ENDPOINTS
router.post("/recomendaciones", iaController.generarRecomendaciones); // Generar recomendaciones
router.get("/recomendaciones", iaController.obtenerMisRecomendaciones); // Obtener mis recomendaciones
router.post("/recomendaciones/:id_recomendacion/aceptar", iaController.aceptarRecomendacion); // Aceptar recomendación
router.post("/recomendaciones/:id_recomendacion/rechazar", iaController.rechazarRecomendacion); // Rechazar recomendación

// TAREAS GENERADAS ENDPOINTS
router.post("/tareas/:id_recomendacion", iaController.generarTareasDesdeRecomendacion); // Crear tarea desde recomendación
router.get("/tareas", iaController.obtenerMisTareasGeneradas); // Obtener mis tareas generadas

// ESTADÍSTICAS
router.get("/estadisticas", iaController.obtenerEstadísticas); // Obtener estadísticas del usuario

// HEALTH CHECK
router.get("/health", iaController.health);

export default router;
