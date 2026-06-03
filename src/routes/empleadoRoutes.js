import { Router } from "express";
import { getEmpleados, getEmpleadoById, createEmpleado, updateEmpleado, deleteEmpleado } from "../controllers/empleadoController.js";
import { authenticateToken, authorizeRoles } from "../middleware/authMiddleware.js";

const router = Router();
const rolesPermitidos = ["campesino_dueño", "comprador_dueño"];

router.get("/", authenticateToken, authorizeRoles(...rolesPermitidos), getEmpleados);
router.get("/:id", authenticateToken, authorizeRoles(...rolesPermitidos), getEmpleadoById);
router.post("/", authenticateToken, authorizeRoles(...rolesPermitidos), createEmpleado);
router.put("/:id", authenticateToken, authorizeRoles(...rolesPermitidos), updateEmpleado);
router.delete("/:id", authenticateToken, authorizeRoles(...rolesPermitidos), deleteEmpleado);

export default router;