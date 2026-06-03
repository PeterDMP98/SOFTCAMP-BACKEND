import { BaseDTO } from './base.dto.js';

/**
 * DTO para Crear Registro de Pesaje
 */
export class CreateRegistroPesajeDTO extends BaseDTO {
  constructor(data) {
    super();
    this.id_ganado = data.id_ganado;
    this.fecha_pesaje = data.fecha_pesaje;
    this.peso_kg = data.peso_kg;
    this.observaciones = data.observaciones || null;
  }
}

/**
 * DTO para Actualizar Registro de Pesaje
 */
export class UpdateRegistroPesajeDTO extends BaseDTO {
  constructor(data) {
    super();
    if (data.peso_kg !== undefined) this.peso_kg = data.peso_kg;
    if (data.observaciones !== undefined) this.observaciones = data.observaciones;
  }

  toObjectFiltered() {
    const obj = {};
    if (this.peso_kg !== undefined) obj.peso_kg = this.peso_kg;
    if (this.observaciones !== undefined) obj.observaciones = this.observaciones;
    return obj;
  }
}

/**
 * DTO de Respuesta para Registro de Pesaje
 */
export class RegistroPesajeResponseDTO extends BaseDTO {
  constructor(rpData) {
    super();
    this.id_pesaje = rpData.id_pesaje;
    this.id_ganado = rpData.id_ganado;
    this.nombre_animal = rpData.nombre_animal;
    this.fecha_pesaje = rpData.fecha_pesaje;
    this.peso_kg = rpData.peso_kg;
    this.observaciones = rpData.observaciones;
  }
}

/**
 * DTO para Listar Registros de Pesaje
 */
export class RegistroPesajeListDTO extends BaseDTO {
  constructor(rpData) {
    super();
    this.id_pesaje = rpData.id_pesaje;
    this.nombre_animal = rpData.nombre_animal;
    this.fecha_pesaje = rpData.fecha_pesaje;
    this.peso_kg = rpData.peso_kg;
  }
}

/**
 * DTO para Historial de Pesos de un Animal
 */
export class PesoHistorialDTO extends BaseDTO {
  constructor(rpData) {
    super();
    this.fecha_pesaje = rpData.fecha_pesaje;
    this.peso_kg = rpData.peso_kg;
  }
}
