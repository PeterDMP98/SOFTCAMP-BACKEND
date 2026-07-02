import { z } from "zod";

const estadoEnum = z.enum(['SERVICIO_REALIZADO', 'GESTACION_CONFIRMADA', 'PARTO_EXITOSO', 'SERVICIO_FALLIDO', 'ABORTO', 'FETO_MUERTO', 'DIAGNOSTICO_NEGATIVO', 'ERROR_REGISTRO', 'DUPLICADO']);
const tipoServicioEnum = z.enum(['MONTA_NATURAL', 'INSEMINACION_ARTIFICIAL']);

export const registroReproduccionCreateSchema = z.object({
  id_madre: z    .coerce.number().int().positive("ID de madre inválido"),
  id_padre: z    .coerce.number().int().positive("ID de padre inválido").optional().nullable(),
  tipo_servicio: tipoServicioEnum,
  detalles: z.string().max(500).optional().nullable()
});

export const registroReproduccionUpdateSchema = z.object({
  estado_reproduccion: estadoEnum.optional(),
  id_hijo: z    .coerce.number().int().positive("ID de hijo inválido").optional().nullable(),
  detalles: z.string().max(500).optional().nullable()
});

export const validateRegistroReproduccionCreate = (data) => registroReproduccionCreateSchema.safeParse(data);
export const validateRegistroReproduccionUpdate = (data) => registroReproduccionUpdateSchema.safeParse(data);