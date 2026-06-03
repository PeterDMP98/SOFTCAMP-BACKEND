import { Router } from "express";
import { getCarrito, addItemCarrito, removeItemCarrito, clearCarrito } from "../controllers/carritoController.js";
import { authenticateToken, authorizeRoles } from "../middleware/authMiddleware.js";

const router = Router();
const rolesPermitidos = ["comprador_dueño", "comprador"];

router.get("/", authenticateToken, authorizeRoles(...rolesPermitidos), getCarrito);
router.post("/", authenticateToken, authorizeRoles(...rolesPermitidos), addItemCarrito);
router.delete("/:id_producto", authenticateToken, authorizeRoles(...rolesPermitidos), removeItemCarrito);
router.delete("/", authenticateToken, authorizeRoles(...rolesPermitidos), clearCarrito);

export default router;