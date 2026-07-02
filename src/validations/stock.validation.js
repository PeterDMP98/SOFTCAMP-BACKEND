import { z } from "zod";

const estadoEnum = z.enum(['disponible', 'reservado', 'vendido', 'agotado']);

export const stockCreateSchema = z.object({
  id_producto: z    .coerce.number().int().positive("Producto inválido"),
  unidad_de_medida: z.string().max(40).optional().nullable(),
  tipo_paquete: z.string().max(50).optional().nullable(),
  cantidad_en_paquetes: z    .coerce.number().min(0).optional().default(0),
  cantidad_stock: z    .coerce.number().int().min(0).optional().default(0),
  precio: z    .coerce.number().min(0).optional().default(0),
  estado: estadoEnum.optional(),
  fecha_vencimiento: z.string().or(z.date()).optional().nullable(),
  detalle: z.string().max(500).optional().nullable()
});

export const stockUpdateSchema = stockCreateSchema.partial();

export const validateStockCreate = (data) => stockCreateSchema.safeParse(data);
export const validateStockUpdate = (data) => stockUpdateSchema.safeParse(data);