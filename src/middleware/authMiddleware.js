import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No autenticado. Token requerido" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token expirado o inválido" });
    }

    // Normalizar estructura para toda la app
    const id_usuario = decoded.id_usuario ?? decoded.id ?? null;
    const id_rol = decoded.id_rol ?? null;
    const id_grupo = decoded.id_grupo ?? null;
    const rol = decoded.rol ?? null;
    const grupo = decoded.grupo ?? null;

    if (!id_usuario) {
      return res.status(401).json({ message: "Token no contiene id de usuario" });
    }

    req.user = {
      id_usuario,
      id_rol,
      id_grupo,
      rol,
      grupo
    };

    next();
  });
};

// Middleware opcional por rol
export const authorizeRoles = (...rolesPermitidos) => (req, res, next) => {
  if (!req.user || !rolesPermitidos.includes(req.user.rol)) {
    return res.status(403).json({ message: "Acceso denegado" });
  }
  next();
};
