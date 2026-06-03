import { Router } from "express";
import { getConvenios, getConvenioById, createConvenio, updateConvenio, deleteConvenio } from "../controllers/convenioController.js";
import { authenticateToken, authorizeRoles } from "../middleware/authMiddleware.js";

const router = Router();
const rolesPermitidos = ["campesino_dueño", "campesino", "comprador_dueño", "comprador"];

router.get("/", authenticateToken, authorizeRoles(...rolesPermitidos), getConvenios);
router.get("/:id", authenticateToken, authorizeRoles(...rolesPermitidos), getConvenioById);
router.post("/", authenticateToken, authorizeRoles(...rolesPermitidos), createConvenio);
router.put("/:id", authenticateToken, authorizeRoles(...rolesPermitidos), updateConvenio);
router.delete("/:id", authenticateToken, authorizeRoles(...rolesPermitidos), deleteConvenio);

export default router;