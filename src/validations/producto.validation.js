import { z } from "zod";

export const productoCreateSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido").max(150),
  id_categoria: z    .coerce.number().int().positive().optional(),
  origen_tipo: z.string().max(50).optional().nullable(),
  origen_id: z    .coerce.number().int().optional().nullable(),
  descriptcion: z.string().max(500).optional().nullable(),
  unidad_de_medida: z.string().min(1, "La unidad de medida es requerida").max(255),
  cantidad_total: z    .coerce.number().min(0).optional().default(0)
});

export const productoUpdateSchema = productoCreateSchema.partial();

export const validateProductoCreate = (data) => productoCreateSchema.safeParse(data);
export const validateProductoUpdate = (data) => productoUpdateSchema.safeParse(data);