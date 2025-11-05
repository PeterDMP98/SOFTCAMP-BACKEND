// backend/src/app.js
import express from 'express';
import cors from 'cors';

import usuarioRouter from './routes/usuarioRoutes.js';
import rolRoutes from './routes/rolRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api', usuarioRouter);
app.use('/api', rolRoutes);

export default app;
