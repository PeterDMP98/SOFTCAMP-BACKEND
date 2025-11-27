import authRoutes from "./authRoutes.js";
import usuarioRoutes from "./usuarioRoutes.js";
import ganadoRoutes from "./ganadoRoutes.js";
import rolesRoutes from "./rolesRoutes.js";

export default function registerRoutes(app) {
  
  // Autenticación
  app.use("/api/auth", authRoutes);

  // Usuarios
  app.use("/api/usuarios", usuarioRoutes);

  // Ganado
  app.use("/api/ganado", ganadoRoutes);

  // Roles
  app.use("/api/roles", rolesRoutes);

  app.get("/", (req, res) => {
  res.send("API funcionando");
});

}
