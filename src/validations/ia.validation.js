import { z } from "zod";

export const chatMessageSchema = z.object({
  id_chat: z.number().int().positive("ID del chat debe ser un número positivo").optional(),
  contenido: z
    .string()
    .min(1, "El mensaje no puede estar vacío")
    .max(5000, "El mensaje es muy largo (máx 5000 caracteres)"),
  rol: z.enum(["user", "assistant"]).default("user"),
});

export const createChatSchema = z.object({
  titulo: z
    .string()
    .min(3, "El título debe tener al menos 3 caracteres")
    .max(255, "El título es muy largo")
    .optional(),
});

export const recomendacionSchema = z.object({
  tipo: z.enum(["cultivo", "ganado", "tarea", "tratamiento", "siembra", "stock", "otro"]),
  titulo: z.string().min(1, "Título es requerido").max(255),
  descripcion: z.string().optional(),
  confianza: z.number().min(0).max(1).optional(),
});

export const generateTaskSchema = z.object({
  id_recomendacion: z.number().int().positive().optional(),
  titulo: z.string().min(1, "Título de tarea es requerido"),
  descripcion: z.string().optional(),
  prioridad: z.enum(["alta", "media", "baja"]).default("media"),
  fecha_sugerida: z.string().datetime().optional(),
});

export const validateChatMessage = (data) => {
  try {
    return chatMessageSchema.parse(data);
  } catch (error) {
    throw new Error(error.errors.map((e) => e.message).join(", "));
  }
};

export const validateCreateChat = (data) => {
  try {
    return createChatSchema.parse(data);
  } catch (error) {
    throw new Error(error.errors.map((e) => e.message).join(", "));
  }
};

export const validateRecomendacion = (data) => {
  try {
    return recomendacionSchema.parse(data);
  } catch (error) {
    throw new Error(error.errors.map((e) => e.message).join(", "));
  }
};

export const validateGenerateTask = (data) => {
  try {
    return generateTaskSchema.parse(data);
  } catch (error) {
    throw new Error(error.errors.map((e) => e.message).join(", "));
  }
};
