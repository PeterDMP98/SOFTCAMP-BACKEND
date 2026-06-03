import { Router } from "express";
import {
  getPesajesByGanado,
  getPesajeById,
  createPesaje,
  updatePesaje,
  deletePesaje
} from "../controllers/registroPesajeController.js";
import { authenticateToken, authorizeRoles } from "../middleware/authMiddleware.js";

const router = Router();
const rolesCampesinos = ["campesino_dueño", "campesino"];

router.get(
  "/ganado/:id",
  authenticateToken,
  authorizeRoles(...rolesCampesinos),
  getPesajesByGanado
);

router.get(
  "/:id",
  authenticateToken,
  authorizeRoles(...rolesCampesinos),
  getPesajeById
);

router.post(
  "/:id",
  authenticateToken,
  authorizeRoles(...rolesCampesinos),
  createPesaje
);

router.put(
  "/:id",
  authenticateToken,
  authorizeRoles(...rolesCampesinos),
  updatePesaje
);

router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles(...rolesCampesinos),
  deletePesaje
);

export default router;