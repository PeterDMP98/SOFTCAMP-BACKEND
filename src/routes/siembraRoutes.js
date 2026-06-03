import { Router } from "express";
import { getSiembras, getSiembraById, createSiembra, updateSiembra, deleteSiembra } from "../controllers/siembraController.js";
import { authenticateToken, authorizeRoles } from "../middleware/authMiddleware.js";

const router = Router();
const rolesCampesinos = ["campesino_dueño", "campesino"];

router.get("/", authenticateToken, authorizeRoles(...rolesCampesinos), getSiembras);
router.get("/:id", authenticateToken, authorizeRoles(...rolesCampesinos), getSiembraById);
router.post("/", authenticateToken, authorizeRoles(...rolesCampesinos), createSiembra);
router.put("/:id", authenticateToken, authorizeRoles(...rolesCampesinos), updateSiembra);
router.delete("/:id", authenticateToken, authorizeRoles(...rolesCampesinos), deleteSiembra);

export default router;