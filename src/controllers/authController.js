import { UsuarioService } from "../services/usuarioService.js";
import { validateRegister, validateLogin, formatZodErrors } from "../validations/usuario.validation.js";
import { UsuarioResponseDTO } from "../dtos/index.js";

export const register = async (req, res) => {
  try {
    const validation = validateRegister(req.body);
    if (!validation.success) {
      return res.status(400).json({
        message: "Error de validación",
        errors: formatZodErrors(validation.error),
      });
    }

    const user = await UsuarioService.register(validation.data);

    return res.status(201).json({
      message: "Usuario registrado con éxito",
      user: new UsuarioResponseDTO(user).toObject(),
    });
  } catch (error) {
    const status = error.message.includes("registrado") ? 400 : 500;
    if (status === 500) console.error("Error en registro:", error);
    return res.status(status).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const validation = validateLogin(req.body);
    if (!validation.success) {
      return res.status(400).json({
        message: "Error de validación",
        errors: formatZodErrors(validation.error),
      });
    }

    const { correo, password } = validation.data;
    const { token, user } = await UsuarioService.login(correo, password);

    return res.json({
      message: "Login exitoso",
      token,
      user: new UsuarioResponseDTO(user).toObject(),
    });
  } catch (error) {
    let status = 500;
    if (error.message === "Usuario no encontrado") status = 404;
    if (error.message === "Contraseña incorrecta") status = 401;
    if (status === 500) console.error("Error en login:", error);
    return res.status(status).json({ message: error.message });
  }
};
