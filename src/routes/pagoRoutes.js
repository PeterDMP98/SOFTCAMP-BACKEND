import { Router } from "express";
import { getPagos, createPago, updateEstadoPago } from "../controllers/pagoController.js";
import { authenticateToken, authorizeRoles } from "../middleware/authMiddleware.js";

const router = Router();
const rolesPermitidos = ["campesino_dueño", "campesino", "comprador_dueño", "comprador"];

router.get("/", authenticateToken, authorizeRoles(...rolesPermitidos), getPagos);
router.post("/", authenticateToken, authorizeRoles(...rolesPermitidos), createPago);
router.put("/:id", authenticateToken, authorizeRoles(...rolesPermitidos), updateEstadoPago);

export default router;