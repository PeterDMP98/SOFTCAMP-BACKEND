import { Router } from "express";
import { login, register } from "../controllers/authController.js";

const router = Router();

// Login usuario
router.post("/login", login);

// Registrar usuario
router.post("/register", register);

export default router;
