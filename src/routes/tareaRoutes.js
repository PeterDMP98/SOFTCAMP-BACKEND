import { Router } from "express";
import { getTareas, getTareaById, createTarea, updateTarea, deleteTarea } from "../controllers/tareaController.js";
import { authenticateToken, authorizeRoles } from "../middleware/authMiddleware.js";

const router = Router();
const rolesPermitidos = ["campesino_dueño", "campesino", "comprador_dueño", "comprador"];

router.get("/", authenticateToken, authorizeRoles(...rolesPermitidos), getTareas);
router.get("/:id", authenticateToken, authorizeRoles(...rolesPermitidos), getTareaById);
router.post("/", authenticateToken, authorizeRoles(...rolesPermitidos), createTarea);
router.put("/:id", authenticateToken, authorizeRoles(...rolesPermitidos), updateTarea);
router.delete("/:id", authenticateToken, authorizeRoles(...rolesPermitidos), deleteTarea);

export default router;