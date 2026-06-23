import { Router } from "express";
import {
  createUser,
  getUsuarioByEmail,
  deleteUser,
  getContrapartes,
} from "../controllers/usuarioController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = Router();

// Listar campesinos/compradores para convenios (requiere JWT)
router.get("/contrapartes", authenticateToken, getContrapartes);

// Crear usuario (admin o sistema)
router.post("/", createUser);

// Obtener usuario por correo
router.get("/:correo", getUsuarioByEmail);

// Eliminar usuario por ID
router.delete("/:id", deleteUser);

export default router;
