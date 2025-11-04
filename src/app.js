// backend/src/app.js
import express from 'express';
import cors from 'cors';
import { router as usuarioRouter } from './routes/usuarioRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', usuarioRouter);

export default app;
