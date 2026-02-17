import express from 'express';
import {getPesajesByGanado, getPesajeById, createPesaje} from '../controllers/registroPesajeController.js';
import { auth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(auth);

router.get('ganado/:id', getPesajesByGanado);
router.get('/:id', getPesajeById);
router.post('/:id', createPesaje);