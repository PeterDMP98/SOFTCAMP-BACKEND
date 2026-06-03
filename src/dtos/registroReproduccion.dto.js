import { BaseDTO } from './base.dto.js';

/**
 * DTO para Crear Registro de Reproducción
 */
export class CreateRegistroReproduccionDTO extends BaseDTO {
  constructor(data) {
    super();
    this.id_ganado = data.id_ganado;
    this.tipo_evento = data.tipo_evento; // 'celo', 'inseminacion', 'preñez', 'parto'
    this.fecha_evento = data.fecha_evento;
    this.id_macho = data.id_macho || null;
    this.metodo_reproduccion = data.metodo_reproduccion || null; // 'natural', 'ia'
    this.resultado = data.resultado || null; // 'exitoso', 'fallido'
    this.observaciones = data.observaciones || null;
  }
}

/**
 * DTO para Actualizar Registro de Reproducción
 */
export class UpdateRegistroReproduccionDTO extends BaseDTO {
  constructor(data) {
    super();
    if (data.resultado !== undefined) this.resultado = data.resultado;
    if (data.observaciones !== undefined) this.observaciones = data.observaciones;
  }

  toObjectFiltered() {
    const obj = {};
    if (this.resultado !== undefined) obj.resultado = this.resultado;
    if (this.observaciones !== undefined) obj.observaciones = this.observaciones;
    return obj;
  }
}

/**
 * DTO de Respuesta para Registro de Reproducción
 */
export class RegistroReproduccionResponseDTO extends BaseDTO {
  constructor(rrData) {
    super();
    this.id_reproduccion = rrData.id_reproduccion;
    this.id_ganado = rrData.id_ganado;
    this.nombre_animal_hembra = rrData.nombre_animal_hembra;
    this.tipo_evento = rrData.tipo_evento;
    this.fecha_evento = rrData.fecha_evento;
    this.id_macho = rrData.id_macho;
    this.nombre_animal_macho = rrData.nombre_animal_macho;
    this.metodo_reproduccion = rrData.metodo_reproduccion;
    this.resultado = rrData.resultado;
    this.observaciones = rrData.observaciones;
  }
}

/**
 * DTO para Listar Registros de Reproducción
 */
export class RegistroReproduccionListDTO extends BaseDTO {
  constructor(rrData) {
    super();
    this.id_reproduccion = rrData.id_reproduccion;
    this.nombre_animal = rrData.nombre_animal_hembra;
    this.tipo_evento = rrData.tipo_evento;
    this.fecha_evento = rrData.fecha_evento;
    this.resultado = rrData.resultado;
  }
}

/**
 * DTO para Historial Reproductor de un Animal
 */
export class ReproductorHistorialDTO extends BaseDTO {
  constructor(rrData) {
    super();
    this.fecha_evento = rrData.fecha_evento;
    this.tipo_evento = rrData.tipo_evento;
    this.resultado = rrData.resultado;
  }
}
