import { Router } from "express";
import {
  getLotes,
  getLoteById,
  getInactiveLotes,
  createLote,
  updateLote,
  deactivateLote,
  reactivateLote
} from "../controllers/loteController.js";

import {
  authenticateToken,
  authorizeRoles
} from "../middleware/authMiddleware.js";

const router = Router();

const rolesCampesinos = ["campesino_dueño", "campesino"];

router.get(
  "/",
  authenticateToken,
  authorizeRoles(...rolesCampesinos),
  getLotes
);

router.get(
  "/inactivos",
  authenticateToken,
  authorizeRoles(...rolesCampesinos),
  getInactiveLotes
);

router.get(
  "/:id",
  authenticateToken,
  authorizeRoles(...rolesCampesinos),
  getLoteById
);

router.post(
  "/",
  authenticateToken,
  authorizeRoles(...rolesCampesinos),
  createLote
);

router.put(
  "/:id",
  authenticateToken,
  authorizeRoles(...rolesCampesinos),
  updateLote
);

router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles(...rolesCampesinos),
  deactivateLote
);

router.put(
  "/:id/reactivar",
  authenticateToken,
  authorizeRoles(...rolesCampesinos),
  reactivateLote
);

export default router;