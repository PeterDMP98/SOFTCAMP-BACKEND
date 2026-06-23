import { z } from "zod";

const estadoEnum = z.enum(['activo', 'pausado', 'cancelado', 'finalizado']);

export const convenioCreateCampesinoSchema = z.object({
  id_usuario_comprador: z.coerce.number().int().positive("Comprador inválido"),
  descuento: z.coerce.number().min(0).max(1).optional(),
  detalle_de_contrato: z.string().max(1000).optional().nullable(),
  fecha_fin: z.string().or(z.date()).optional().nullable(),
  estado: estadoEnum.optional()
});

export const convenioCreateCompradorSchema = z.object({
  id_usuario_campesino: z.coerce.number().int().positive("Campesino inválido"),
  descuento: z.coerce.number().min(0).max(1).optional(),
  detalle_de_contrato: z.string().max(1000).optional().nullable(),
  fecha_fin: z.string().or(z.date()).optional().nullable(),
  estado: estadoEnum.optional()
});

/** @deprecated Use validateConvenioCreateForUser */
export const convenioCreateSchema = convenioCreateCampesinoSchema;

export const convenioUpdateSchema = z.object({
  descuento: z.number().min(0).max(1).optional(),
  detalle_de_contrato: z.string().max(1000).optional().nullable(),
  fecha_fin: z.string().or(z.date()).optional().nullable(),
  estado: estadoEnum.optional()
});

export const validateConvenioCreate = (data) => convenioCreateCampesinoSchema.safeParse(data);

export const validateConvenioCreateForUser = (data, user) => {
  const schema =
    user?.grupo === "comprador" || (user?.rol && String(user.rol).includes("comprador"))
      ? convenioCreateCompradorSchema
      : convenioCreateCampesinoSchema;
  return schema.safeParse(data);
};

export const validateConvenioUpdate = (data) => convenioUpdateSchema.safeParse(data);