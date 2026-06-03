import { Router } from "express";
import {
  getHistorialClinicoByGanado,
  getHistorialClinicoById,
  createHistorialClinico,
  updateHistorialClinico,
  deleteHistorialClinico
} from "../controllers/historialClinicoController.js";
import { authenticateToken, authorizeRoles } from "../middleware/authMiddleware.js";

const router = Router();
const rolesCampesinos = ["campesino_dueño", "campesino"];

router.get(
  "/ganado/:id",
  authenticateToken,
  authorizeRoles(...rolesCampesinos),
  getHistorialClinicoByGanado
);

router.get(
  "/:id",
  authenticateToken,
  authorizeRoles(...rolesCampesinos),
  getHistorialClinicoById
);

router.post(
  "/ganado/:id",
  authenticateToken,
  authorizeRoles(...rolesCampesinos),
  createHistorialClinico
);

router.put(
  "/:id",
  authenticateToken,
  authorizeRoles(...rolesCampesinos),
  updateHistorialClinico
);

router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles(...rolesCampesinos),
  deleteHistorialClinico
);

export default router;