import { z } from "zod";

export const registerSchema = z.object({
  nombre: z.string().min(1, "Nombre requerido"),
  correo: z.string().email("Correo inválido"),
  telefono: z.string().min(1, "Teléfono requerido"),
  direccion: z.string().optional().nullable(),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  id_grupo: z.coerce.number().int().positive("Grupo inválido"),
});

export const loginSchema = z.object({
  correo: z.string().email("Correo inválido"),
  password: z.string().min(1, "Contraseña requerida"),
});

export const createUserSchema = z.object({
  nombre: z.string().min(1, "Nombre requerido"),
  correo: z.string().email("Correo inválido"),
  telefono: z.string().min(1, "Teléfono requerido"),
  direccion: z.string().optional().nullable(),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  id_rol: z.coerce.number().int().positive("Rol inválido"),
});

export const validateRegister = (data) => registerSchema.safeParse(data);
export const validateLogin = (data) => loginSchema.safeParse(data);
export const validateCreateUser = (data) => createUserSchema.safeParse(data);

export const formatZodErrors = (zodError) =>
  zodError.errors.map((e) => ({
    field: e.path.join("."),
    message: e.message,
  }));
