import express from 'express';
import { auth } from '../middleware/authMiddleware.js';
import { createHistorialClinico, getHistorialClinicoByGanado, getHistorialClinicoById, updateHistorialClinico, updateHistorialClinicoCorreccion, updateHistorialClinicoSeguimiento } from '../controllers/historialClinicoController.js';

const router = express.Router()

router.use(auth)

router.get('/ganado/:id', getHistorialClinicoByGanado);
router.get('/:id', getHistorialClinicoById);
router.post('/ganado/:id', createHistorialClinico);
router.put('/seguimiento/:id', updateHistorialClinicoSeguimiento);
router.put('/correccion/:id', updateHistorialClinicoCorreccion);


export default router;