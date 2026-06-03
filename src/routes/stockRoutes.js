import { Router } from "express";
import { getStocks, getStockById, createStock, updateStock, deleteStock } from "../controllers/stockController.js";
import { authenticateToken, authorizeRoles } from "../middleware/authMiddleware.js";

const router = Router();
const rolesCampesinos = ["campesino_dueño", "campesino"];

router.get("/", authenticateToken, authorizeRoles(...rolesCampesinos), getStocks);
router.get("/:id", authenticateToken, authorizeRoles(...rolesCampesinos), getStockById);
router.post("/", authenticateToken, authorizeRoles(...rolesCampesinos), createStock);
router.put("/:id", authenticateToken, authorizeRoles(...rolesCampesinos), updateStock);
router.delete("/:id", authenticateToken, authorizeRoles(...rolesCampesinos), deleteStock);

export default router;