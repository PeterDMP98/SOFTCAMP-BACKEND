import { z } from "zod";

const estadoEnum = z.enum(['pendiente', 'en_proceso', 'completada', 'cancelada']);
const prioridadEnum = z.enum(['baja', 'media', 'alta']);

export const tareaCreateSchema = z.object({
  titulo: z.string().min(1, "El título es requerido").max(100),
  detalle: z.string().max(500).optional().nullable(),
  estado: estadoEnum.optional(),
  prioridad: prioridadEnum.optional(),
  fecha_limite: z.string().or(z.date()).optional().nullable(),
  recordatorio: z.string().or(z.date()).optional().nullable(),
  tipo_referencia: z.string().max(50).optional().nullable(),
  id_referencia: z    .coerce.number().int().optional().nullable()
});

export const tareaUpdateSchema = tareaCreateSchema.partial();

export const validateTareaCreate = (data) => tareaCreateSchema.safeParse(data);
export const validateTareaUpdate = (data) => tareaUpdateSchema.safeParse(data);