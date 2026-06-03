import express from "express";
import cors from "cors";
import allRoutes from "./routes/index.js";
import { errorMiddleware, notFoundMiddleware } from "./middleware/errorMiddleware.js";

const app = express();

app.use(cors());
app.use(express.json());

// Registrar rutas centralizadas
allRoutes(app);

// Middlewares de manejo de errores (al final)
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;