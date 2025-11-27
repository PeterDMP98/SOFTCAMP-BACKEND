import { Router } from "express";
import {
  createUser,
  getUsuarioByEmail,
  deleteUser
} from "../controllers/usuarioController.js";

const router = Router();

// Crear usuario (admin o sistema)
router.post("/", createUser);

// Obtener usuario por correo
router.get("/:correo", getUsuarioByEmail);

// Eliminar usuario por ID
router.delete("/:id", deleteUser);

export default router;
