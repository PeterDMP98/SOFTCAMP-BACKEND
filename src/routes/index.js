import authRoutes from "./authRoutes.js";
import usuarioRoutes from "./usuarioRoutes.js";
import ganadoRoutes from "./ganadoRoutes.js";
import loteRoutes from "./loteRoutes.js";
import historialClinicoRoutes from "./historialClinicoRoutes.js";
import registroPesajeRoutes from "./registroPesajeRoutes.js";
import registroReproduccionRoutes from "./registroReproduccionRoutes.js";
import siembraRoutes from "./siembraRoutes.js";
import productoRoutes from "./productoRoutes.js";
import stockRoutes from "./stockRoutes.js";
import pedidoRoutes from "./pedidoRoutes.js";
import carritoRoutes from "./carritoRoutes.js";
import pagoRoutes from "./pagoRoutes.js";
import tareaRoutes from "./tareaRoutes.js";
import empleadoRoutes from "./empleadoRoutes.js";
import rolesRoutes from "./rolesRoutes.js";
import convenioRoutes from "./convenioRoutes.js";

export default function allRoutes(app) {
  
  // Autenticación
  app.use("/api/auth", authRoutes);

  // Usuarios
  app.use("/api/usuarios", usuarioRoutes);

  // Ganado y submódulos
  app.use("/api/ganado", ganadoRoutes);
  app.use("/api/historial-clinico", historialClinicoRoutes);
  app.use("/api/registro-pesaje", registroPesajeRoutes);
  app.use("/api/registro-reproduccion", registroReproduccionRoutes);

  // Lotes
  app.use("/api/lotes", loteRoutes);

  // Siembra
  app.use("/api/siembra", siembraRoutes);

  // Productos y Stock
  app.use("/api/productos", productoRoutes);
  app.use("/api/stock", stockRoutes);

  // Pedidos, Carrito, Pagos
  app.use("/api/pedidos", pedidoRoutes);
  app.use("/api/carrito", carritoRoutes);
  app.use("/api/pagos", pagoRoutes);

  // Tareas
  app.use("/api/tareas", tareaRoutes);

  // Empleados
  app.use("/api/empleados", empleadoRoutes);

  // Convenios
  app.use("/api/convenios", convenioRoutes);

  // Roles
  app.use("/api/roles", rolesRoutes);

  app.get("/", (req, res) => {
  res.send("API funcionando");
  });

}