import { z } from "zod";

const estadoEnum = z.enum(['activo', 'pausado', 'cancelado', 'finalizado']);

export const convenioCreateSchema = z.object({
  id_usuario_comprador: z.number().int().positive("Comprador inválido"),
  descuento: z.number().min(0).max(1).optional(),
  detalle_de_contrato: z.string().max(1000).optional().nullable(),
  fecha_fin: z.string().or(z.date()).optional().nullable(),
  estado: estadoEnum.optional()
});

export const convenioUpdateSchema = z.object({
  descuento: z.number().min(0).max(1).optional(),
  detalle_de_contrato: z.string().max(1000).optional().nullable(),
  fecha_fin: z.string().or(z.date()).optional().nullable(),
  estado: estadoEnum.optional()
});

export const validateConvenioCreate = (data) => convenioCreateSchema.safeParse(data);
export const validateConvenioUpdate = (data) => convenioUpdateSchema.safeParse(data);