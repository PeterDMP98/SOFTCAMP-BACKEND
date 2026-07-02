import { z } from "zod";

const sexoEnum = z.enum(["Macho", "Hembra"]);
const estadoSaludEnum = z.enum(["SANO", "OBSERVACION", "ENFERMO", "CRITICO"]);
const estadoReproductivoEnum = z.enum(["Gestante", "Vacía", "Desconocido"]);

export const ganadoCreateSchema = z.object({
  nombre_animal: z
    .string()
    .min(1, "El nombre es requerido")
    .max(100, "El nombre no puede exceder 100 caracteres"),
  numero_identificacion: z
    .string()
    .max(100, "La identificación no puede exceder 100 caracteres")
    .optional()
    .nullable(),
  fecha_nacimiento: z
    .string()
    .or(z.date())
    .optional()
    .nullable(),
  raza: z
    .string()
    .max(100, "La raza no puede exceder 100 caracteres")
    .optional()
    .nullable(),
  sexo: sexoEnum,
  peso_actual: z
    .coerce.number()
    .min(0, "El peso no puede ser negativo")
    .optional()
    .nullable(),
  estado_salud: estadoSaludEnum.optional().nullable(),
  estado_reproductivo: estadoReproductivoEnum.optional().nullable(),
  fecha_gestacion: z
    .string()
    .or(z.date())
    .optional()
    .nullable(),
  detalle: z
    .string()
    .max(500, "El detalle no puede exceder 500 caracteres")
    .optional()
    .nullable(),
  subproducto: z
    .coerce.number()
    .int("Debe ser un número entero")
    .positive("Debe ser un ID válido")
    .optional()
    .nullable(),
  id_lote: z
    .coerce.number()
    .int("Debe ser un número entero")
    .positive("Debe ser un ID válido")
    .optional()
    .nullable(),
  precio: z
    .coerce.number()
    .min(0, "El precio no puede ser negativo")
    .optional()
    .nullable()
});

export const ganadoUpdateSchema = z.object({
  nombre_animal: z
    .string()
    .min(1, "El nombre es requerido")
    .max(100, "El nombre no puede exceder 100 caracteres")
    .optional(),
  numero_identificacion: z
    .string()
    .max(100, "La identificación no puede exceder 100 caracteres")
    .optional()
    .nullable(),
  fecha_nacimiento: z
    .string()
    .or(z.date())
    .optional()
    .nullable(),
  raza: z
    .string()
    .max(100, "La raza no puede exceder 100 caracteres")
    .optional()
    .nullable(),
  sexo: sexoEnum.optional(),
  peso_actual: z
    .coerce.number()
    .min(0, "El peso no puede ser negativo")
    .optional()
    .nullable(),
  estado_salud: estadoSaludEnum.optional().nullable(),
  estado_reproductivo: estadoReproductivoEnum.optional().nullable(),
  fecha_gestacion: z
    .string()
    .or(z.date())
    .optional()
    .nullable(),
  detalle: z
    .string()
    .max(500, "El detalle no puede exceder 500 caracteres")
    .optional()
    .nullable(),
  subproducto: z
    .coerce.number()
    .int("Debe ser un número entero")
    .positive("Debe ser un ID válido")
    .optional()
    .nullable(),
  id_lote: z
    .coerce.number()
    .int("Debe ser un número entero")
    .positive("Debe ser un ID válido")
    .optional()
    .nullable(),
  precio: z
    .coerce.number()
    .min(0, "El precio no puede ser negativo")
    .optional()
    .nullable()
});

export const validateGanadoCreate = (data) => {
  return ganadoCreateSchema.safeParse(data);
};

export const validateGanadoUpdate = (data) => {
  return ganadoUpdateSchema.safeParse(data);
};