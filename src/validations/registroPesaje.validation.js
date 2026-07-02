import { z } from "zod";

export const registroPesajeCreateSchema = z.object({
  peso: z    .coerce.number().positive("El peso debe ser mayor a 0"),
  observaciones: z.string().max(500).optional().nullable()
});

export const registroPesajeUpdateSchema = z.object({
  peso: z    .coerce.number().positive("El peso debe ser mayor a 0").optional(),
  observaciones: z.string().max(500).optional().nullable()
});

export const validateRegistroPesajeCreate = (data) => registroPesajeCreateSchema.safeParse(data);
export const validateRegistroPesajeUpdate = (data) => registroPesajeUpdateSchema.safeParse(data);