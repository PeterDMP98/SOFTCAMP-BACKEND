import express from 'express';
import { getReproduccionByGanado, getReproduccionById, createReproduccion, deactivateReproduccion } from '../controllers/registroReproduccionController';
import { auth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(auth);

router.get('/ganado/:id', getReproduccionByGanado);
router.get('/:id', getReproduccionById);
router.post('/', createReproduccion);
router.put('/:id', updateReproduccion);

