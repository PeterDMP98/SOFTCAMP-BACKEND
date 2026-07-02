import { z } from "zod";

export const historialClinicoCreateSchema = z.object({
  id_ganado: z    .coerce.number().int().positive("ID de ganado inválido"),
  nombre_de_veterinario: z.string().max(100).optional().nullable(),
  telefono: z.string().max(20).optional().nullable(),
  correo: z.string().email("Correo inválido").optional().nullable(),
  fecha_de_registro: z.string().or(z.date()).optional(),
  fecha_de_cierre: z.string().or(z.date()).optional().nullable(),
  tipo: z.string().max(50).optional().nullable(),
  detalles: z.string().max(1000).optional().nullable(),
  estado_de_consulta: z.string().max(100).optional().nullable(),
  precio: z    .coerce.number().min(0).optional().nullable()
});

export const historialClinicoUpdateSchema = z.object({
  nombre_de_veterinario: z.string().max(100).optional().nullable(),
  telefono: z.string().max(20).optional().nullable(),
  correo: z.string().email("Correo inválido").optional().nullable(),
  fecha_de_cierre: z.string().or(z.date()).optional().nullable(),
  tipo: z.string().max(50).optional().nullable(),
  detalles: z.string().max(1000).optional().nullable(),
  estado_de_consulta: z.string().max(100).optional().nullable(),
  precio: z    .coerce.number().min(0).optional().nullable()
});

export const validateHistorialClinicoCreate = (data) => historialClinicoCreateSchema.safeParse(data);
export const validateHistorialClinicoUpdate = (data) => historialClinicoUpdateSchema.safeParse(data);