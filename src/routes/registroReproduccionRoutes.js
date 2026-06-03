import { Router } from "express";
import {
  getReproduccionByGanado,
  getReproduccionById,
  createReproduccion,
  updateReproduccion,
  deleteReproduccion
} from "../controllers/registroReproduccionController.js";
import { authenticateToken, authorizeRoles } from "../middleware/authMiddleware.js";

const router = Router();
const rolesCampesinos = ["campesino_dueño", "campesino"];

router.get(
  "/ganado/:id",
  authenticateToken,
  authorizeRoles(...rolesCampesinos),
  getReproduccionByGanado
);

router.get(
  "/:id",
  authenticateToken,
  authorizeRoles(...rolesCampesinos),
  getReproduccionById
);

router.post(
  "/",
  authenticateToken,
  authorizeRoles(...rolesCampesinos),
  createReproduccion
);

router.put(
  "/:id",
  authenticateToken,
  authorizeRoles(...rolesCampesinos),
  updateReproduccion
);

router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles(...rolesCampesinos),
  deleteReproduccion
);

export default router;