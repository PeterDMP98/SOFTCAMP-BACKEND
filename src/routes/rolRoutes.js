import express from 'express';
import { createRol } from '../controllers/rolController.js';

const router = express.Router();

router.post('/rol', createRol);

export default router;
