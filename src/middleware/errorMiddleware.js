export const errorMiddleware = (err, req, res, next) => {
  console.error("Error capturado:", err);

  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({
      message: "JSON inválido",
      error: "El cuerpo de la solicitud contiene JSON mal formado"
    });
  }

  const status = err.status || 500;
  const message = err.message || "Error interno del servidor";

  res.status(status).json({
    message: message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack })
  });
};

export const notFoundMiddleware = (req, res) => {
  res.status(404).json({
    message: `Ruta no encontrada: ${req.originalUrl}`
  });
};