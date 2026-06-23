import { ConvenioRepository } from "../repositories/convenioRepository.js";

const ESTADOS = ['activo', 'pausado', 'cancelado', 'finalizado'];

const isCompradorUser = (user) =>
  user?.grupo === "comprador" || (user?.rol && String(user.rol).includes("comprador"));

export const ConveniosService = {
  getForUser: async (user) => {
    if (isCompradorUser(user)) {
      return await ConvenioRepository.findByComprador(user.id_usuario);
    }
    return await ConvenioRepository.findByCampesino(user.id_usuario);
  },
  getByCampesino: async (id_usuario) => await ConvenioRepository.findByCampesino(id_usuario),
  getByComprador: async (id_usuario) => await ConvenioRepository.findByComprador(id_usuario),
  getById: async (id_convenio, id_usuario) => {
    const conv = await ConvenioRepository.findByIdAndUser(id_convenio, id_usuario);
    if (!conv) throw new Error("Convenio no encontrado o no autorizado");
    return await ConvenioRepository.findById(id_convenio);
  },
  create: async (data, id_campesino, id_comprador) => {
    if (!id_comprador) throw new Error("El comprador es requerido");
    if (!id_campesino) throw new Error("El campesino es requerido");
    if (data.descuento != null && (data.descuento < 0 || data.descuento > 1)) {
      throw new Error("El descuento debe estar entre 0 y 1");
    }
    return await ConvenioRepository.create(data, id_campesino, id_comprador);
  },
  createForUser: async (data, user) => {
    if (isCompradorUser(user)) {
      if (!data.id_usuario_campesino) throw new Error("El campesino es requerido");
      return await ConveniosService.create(data, data.id_usuario_campesino, user.id_usuario);
    }
    if (!data.id_usuario_comprador) throw new Error("El comprador es requerido");
    return await ConveniosService.create(data, user.id_usuario, data.id_usuario_comprador);
  },
  update: async (id_convenio, data, id_usuario) => {
    const existente = await ConvenioRepository.findByIdAndUser(id_convenio, id_usuario);
    if (!existente) throw new Error("Convenio no encontrado o no autorizado");
    if (data.estado && !ESTADOS.includes(data.estado)) throw new Error("Estado inválido");
    return await ConvenioRepository.update(id_convenio, data, id_usuario);
  },
  delete: async (id_convenio, id_usuario, user) => {
    if (user && isCompradorUser(user)) {
      throw new Error("Los compradores no pueden eliminar convenios. Actualice el estado a cancelado.");
    }
    const existente = await ConvenioRepository.findByIdAndUser(id_convenio, id_usuario);
    if (!existente) throw new Error("Convenio no encontrado o no autorizado");
    const result = await ConvenioRepository.delete(id_convenio, id_usuario);
    if (!result) throw new Error("Error al eliminar");
    return { success: true, message: "Convenio eliminado correctamente" };
  }
};

export { isCompradorUser };