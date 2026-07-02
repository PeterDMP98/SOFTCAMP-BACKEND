import { Router } from "express";
import {
  getAllHistorialClinico,
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
  "/",
  authenticateToken,
  authorizeRoles(...rolesCampesinos),
  getAllHistorialClinico
);

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