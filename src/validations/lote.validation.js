import { z } from "zod";

export const loteCreateSchema = z.object({
  nombre: z
    .string()
    .min(1, "El nombre es requerido")
    .max(100, "El nombre no puede exceder 100 caracteres"),
  tamano_hectareas: z
    .number()
    .positive("El tamaño debe ser mayor a 0")
    .optional()
    .nullable(),
  descripcion: z
    .string()
    .max(500, "La descripción no puede exceder 500 caracteres")
    .optional()
    .nullable()
});

export const loteUpdateSchema = z.object({
  nombre: z
    .string()
    .min(1, "El nombre es requerido")
    .max(100, "El nombre no puede exceder 100 caracteres")
    .optional(),
  tamano_hectareas: z
    .number()
    .positive("El tamaño debe ser mayor a 0")
    .optional()
    .nullable(),
  descripcion: z
    .string()
    .max(500, "La descripción no puede exceder 500 caracteres")
    .optional()
    .nullable()
});

export const validateLoteCreate = (data) => {
  return loteCreateSchema.safeParse(data);
};

export const validateLoteUpdate = (data) => {
  return loteUpdateSchema.safeParse(data);
};