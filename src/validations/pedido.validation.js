import { z } from "zod";

export const pedidoCreateSchema = z.object({
  id_usuario_comprador: z    .coerce.number().int().positive("Comprador inválido"),
  tipo_de_envio: z.string().max(100).optional().nullable(),
  direccion: z.string().max(100).optional().nullable(),
  quien_recibe: z.string().max(100).optional().nullable(),
  fecha_de_entrega: z.string().or(z.date()).optional().nullable(),
  total_descuentos: z    .coerce.number().min(0).optional().default(0),
  total: z    .coerce.number().positive("Total inválido")
});

export const pedidoUpdateSchema = z.object({
  tipo_de_envio: z.string().max(100).optional().nullable(),
  direccion: z.string().max(100).optional().nullable(),
  quien_recibe: z.string().max(100).optional().nullable(),
  fecha_de_entrega: z.string().or(z.date()).optional().nullable(),
  id_estado: z    .coerce.number().int().positive().optional()
});

export const validatePedidoCreate = (data) => pedidoCreateSchema.safeParse(data);
export const validatePedidoUpdate = (data) => pedidoUpdateSchema.safeParse(data);