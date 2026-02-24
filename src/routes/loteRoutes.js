import express from 'express';
import { createLote, getLotes, getLoteById, updateLote, updateIdle, deactivateLote, reactivateLote, getInactiveLotes } from '../controllers/loteController.js';
import { auth } from '../middleware/authMiddleware.js';

const router = express.Router();

// ruta uauth para obtener lotes del usuario autenticado
router.use(auth)

// rutas

router.get('/', getLotes);
router.get('/:id', getLoteById);
router.post('/', createLote);
router.put('/:id', updateLote);
router.delete('/:id', deactivateLote);
router.put('/:id/reactivar', reactivateLote);
router.get('/inactivos', getInactiveLotes);
