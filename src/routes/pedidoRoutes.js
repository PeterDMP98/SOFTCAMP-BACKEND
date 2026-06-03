import { Router } from "express";
import { getPedidos, getPedidoById, createPedido, updatePedido, deletePedido } from "../controllers/pedidoController.js";
import { authenticateToken, authorizeRoles } from "../middleware/authMiddleware.js";

const router = Router();
const rolesPermitidos = ["campesino_dueño", "campesino", "comprador_dueño", "comprador"];

router.get("/", authenticateToken, authorizeRoles(...rolesPermitidos), getPedidos);
router.get("/:id", authenticateToken, authorizeRoles(...rolesPermitidos), getPedidoById);
router.post("/", authenticateToken, authorizeRoles(...rolesPermitidos), createPedido);
router.put("/:id", authenticateToken, authorizeRoles(...rolesPermitidos), updatePedido);
router.delete("/:id", authenticateToken, authorizeRoles(...rolesPermitidos), deletePedido);

export default router;