import { z } from "zod";

export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    const errors = result.error.errors.map((err) => ({
      field: err.path.join("."),
      message: err.message
    }));
    return res.status(400).json({
      message: "Error de validación",
      errors
    });
  }

  req.body = result.data;
  next();
};

export const validateParams = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.params);

  if (!result.success) {
    const errors = result.error.errors.map((err) => ({
      field: err.path.join("."),
      message: err.message
    }));
    return res.status(400).json({
      message: "Error de validación de parámetros",
      errors
    });
  }

  req.params = result.data;
  next();
};

export const validationSchemas = {
  idParam: z.object({
    id: z.string().transform((val) => parseInt(val)).pipe(z.number().int().positive())
  })
};