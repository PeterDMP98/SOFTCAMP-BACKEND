import { Router } from "express";
import { getProductos, getProductoById, createProducto, updateProducto, deleteProducto } from "../controllers/productoController.js";
import { authenticateToken, authorizeRoles } from "../middleware/authMiddleware.js";

const router = Router();
const rolesCampesinos = ["campesino_dueño", "campesino"];

router.get("/", authenticateToken, authorizeRoles(...rolesCampesinos), getProductos);
router.get("/:id", authenticateToken, authorizeRoles(...rolesCampesinos), getProductoById);
router.post("/", authenticateToken, authorizeRoles(...rolesCampesinos), createProducto);
router.put("/:id", authenticateToken, authorizeRoles(...rolesCampesinos), updateProducto);
router.delete("/:id", authenticateToken, authorizeRoles(...rolesCampesinos), deleteProducto);

export default router;