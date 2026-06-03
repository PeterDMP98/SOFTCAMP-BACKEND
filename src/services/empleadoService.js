import { EmpleadoRepository } from "../repositories/empleadoRepository.js";

const ESTADOS = ['activo', 'inactivo'];

export const EmpleadoService = {
  getAllByPadre: async (id_usuario_padre) => await EmpleadoRepository.findByUsuarioPadre(id_usuario_padre),

  getById: async (id_empleado, id_usuario_padre) => {
    const empleado = await EmpleadoRepository.findByIdAndPadre(id_empleado, id_usuario_padre);
    if (!empleado) throw new Error("Empleado no encontrado o no autorizado");
    return await EmpleadoRepository.findById(id_empleado);
  },

  create: async (data, id_usuario_padre) => {
    if (!data.nombre) throw new Error("El nombre es requerido");
    if (!data.correo) throw new Error("El correo es requerido");
    if (!data.telefono) throw new Error("El teléfono es requerido");
    return await EmpleadoRepository.create(data, id_usuario_padre);
  },

  update: async (id_empleado, data, id_usuario_padre) => {
    const existente = await EmpleadoRepository.findByIdAndPadre(id_empleado, id_usuario_padre);
    if (!existente) throw new Error("Empleado no encontrado o no autorizado");
    if (data.estado && !ESTADOS.includes(data.estado)) throw new Error("Estado inválido");
    return await EmpleadoRepository.update(id_empleado, data, id_usuario_padre);
  },

  delete: async (id_empleado, id_usuario_padre) => {
    const existente = await EmpleadoRepository.findByIdAndPadre(id_empleado, id_usuario_padre);
    if (!existente) throw new Error("Empleado no encontrado o no autorizado");
    const result = await EmpleadoRepository.delete(id_empleado, id_usuario_padre);
    if (!result) throw new Error("Error al desactivar empleado");
    return { success: true, message: "Empleado desactivado correctamente" };
  }
};