import { z } from "zod";

const estadoEnum = z.enum(['Abierta', 'En proceso', 'Cerrado']);

export const siembraCreateSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido").max(100),
  fecha_de_siembra: z.string().or(z.date()),
  fecha_de_cosecha: z.string().or(z.date()).optional().nullable(),
  estado: estadoEnum.optional(),
  cantidad: z    .coerce.number().positive("La cantidad debe ser mayor a 0").optional().nullable(),
  id_lote: z    .coerce.number().int().positive().optional().nullable()
});

export const siembraUpdateSchema = z.object({
  nombre: z.string().min(1).max(100).optional(),
  fecha_de_siembra: z.string().or(z.date()).optional(),
  fecha_de_cosecha: z.string().or(z.date()).optional().nullable(),
  estado: estadoEnum.optional(),
  cantidad: z    .coerce.number().positive().optional().nullable(),
  id_lote: z    .coerce.number().int().positive().optional().nullable()
});

export const validateSiembraCreate = (data) => siembraCreateSchema.safeParse(data);
export const validateSiembraUpdate = (data) => siembraUpdateSchema.safeParse(data);