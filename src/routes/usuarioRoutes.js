// backend/src/routes/usuarioRoutes.js
import { Router } from 'express';
import { registerUser } from '../controllers/registerController.js';
import { loginUser } from '../controllers/loginController.js';

export const router = Router();

// Ruta para registrar
router.post('/register', registerUser);

// Ruta para login
router.post('/login', loginUser);
