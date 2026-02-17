import express from 'express';
import { createLote, getLotes, getLoteById, updateLote, deleteLote } from '../controllers/loteController.js';
import { auth } from '../middleware/authMiddleware.js';

const router = express.Router()

router.use(auth)

router.get('/ganado/:id', getHistorialClinicoByGanado);
router.get('/:id', getHistorialClinicoByGanadoId);
router.post('/ganado/:id', createHistorialClinico);
router.put('/:id', updateHistorialClinico);
router.delete('/:id', deleteHistorialClinico);

export default router;