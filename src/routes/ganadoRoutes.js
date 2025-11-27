import { Router } from "express";
import {
  getGanado,
  crearGanado,
  updateGanado,
  deleteGanado
} from "../controllers/ganadoController.js";

import {
  authenticateToken,
  authorizeRoles
} from "../middleware/authMiddleware.js";

const router = Router();

// Roles permitidos para gestionar ganado
const rolesCampesinos = ["campesino_dueño", "campesino"];

// Listar ganado del usuario autenticado
router.get(
  "/",
  authenticateToken,
  authorizeRoles(...rolesCampesinos),
  getGanado
);

// Crear registro de ganado
router.post(
  "/",
  authenticateToken,
  authorizeRoles(...rolesCampesinos),
  crearGanado
);

// Actualizar ganado propio
router.put(
  "/:id",
  authenticateToken,
  authorizeRoles(...rolesCampesinos),
  updateGanado
);

// Eliminar ganado propio
router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles(...rolesCampesinos),
  deleteGanado
);

export default router;
