import { RegistroReproduccionRepository } from "../repositories/registroReproduccionRepository.js";
import { GanadoRepository } from "../repositories/ganadoRepository.js";

const ESTADOS_VALIDOS = ['SERVICIO_REALIZADO', 'GESTACION_CONFIRMADA', 'PARTO_EXITOSO', 'SERVICIO_FALLIDO', 'ABORTO', 'FETO_MUERTO', 'DIAGNOSTICO_NEGATIVO', 'ERROR_REGISTRO', 'DUPLICADO'];
const TIPOS_SERVICIO = ['MONTA_NATURAL', 'INSEMINACION_ARTIFICIAL'];

export const RegistroReproduccionService = {
  async getAllByUser(id_usuario) {
    return await RegistroReproduccionRepository.findByUser(id_usuario);
  },

  async getByGanado(id_ganado, id_usuario) {
    const ganado = await GanadoRepository.findByIdAndUser(id_ganado, id_usuario);
    if (!ganado) throw new Error("Ganado no encontrado o no autorizado");
    return await RegistroReproduccionRepository.findByGanado(id_ganado);
  },

  async getById(id_registros_reproduccion, id_usuario) {
    const registro = await RegistroReproduccionRepository.findByIdAndUser(id_registros_reproduccion, id_usuario);
    if (!registro) throw new Error("Registro de reproducción no encontrado");
    return registro;
  },

  async create(data, id_usuario) {
    if (!data.id_madre) throw new Error("La madre es requerida");
    if (!data.tipo_servicio) throw new Error("El tipo de servicio es requerido");
    if (!TIPOS_SERVICIO.includes(data.tipo_servicio)) throw new Error("Tipo de servicio inválido");
    
    const madre = await GanadoRepository.findByIdAndUser(data.id_madre, id_usuario);
    if (!madre) throw new Error("Madre no encontrada o no autorizada");
    
    if (data.id_padre) {
      const padre = await GanadoRepository.findById(data.id_padre);
      if (!padre) throw new Error("Padre no encontrado");
    }

    return await RegistroReproduccionRepository.create(data, id_usuario);
  },

  async update(id_registros_reproduccion, data, id_usuario) {
    const existente = await RegistroReproduccionRepository.findByIdAndUser(id_registros_reproduccion, id_usuario);
    if (!existente) throw new Error("Registro de reproducción no encontrado o no autorizado");
    
    if (data.estado_reproduccion && !ESTADOS_VALIDOS.includes(data.estado_reproduccion)) {
      throw new Error("Estado de reproducción inválido");
    }
    
    return await RegistroReproduccionRepository.update(id_registros_reproduccion, data, id_usuario);
  },

  async delete(id_registros_reproduccion, id_usuario) {
    const existente = await RegistroReproduccionRepository.findByIdAndUser(id_registros_reproduccion, id_usuario);
    if (!existente) throw new Error("Registro de reproducción no encontrado o no autorizado");
    const result = await RegistroReproduccionRepository.delete(id_registros_reproduccion, id_usuario);
    if (!result) throw new Error("Error al eliminar registro de reproducción");
    return { success: true, message: "Registro de reproducción eliminado correctamente" };
  }
};