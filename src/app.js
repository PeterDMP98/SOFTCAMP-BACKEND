import express from "express";
import cors from "cors";
import allRoutes from "./routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());

// Registrar rutas centralizadas
allRoutes(app);

export default app;
