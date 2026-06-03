import { BaseDTO } from './base.dto.js';

/**
 * DTO para Crear Lote
 * Datos requeridos para registrar un nuevo lote
 */
export class CreateLoteDTO extends BaseDTO {
  constructor(data) {
    super();
    this.nombre = data.nombre;
    this.tamano_hectareas = data.tamano_hectareas || null;
    this.descripcion = data.descripcion || null;
  }
}

/**
 * DTO para Actualizar Lote
 * Todos los campos son opcionales
 */
export class UpdateLoteDTO extends BaseDTO {
  constructor(data) {
    super();
    if (data.nombre !== undefined) this.nombre = data.nombre;
    if (data.tamano_hectareas !== undefined) this.tamano_hectareas = data.tamano_hectareas;
    if (data.descripcion !== undefined) this.descripcion = data.descripcion;
  }

  toObjectFiltered() {
    const obj = {};
    if (this.nombre !== undefined) obj.nombre = this.nombre;
    if (this.tamano_hectareas !== undefined) obj.tamano_hectareas = this.tamano_hectareas;
    if (this.descripcion !== undefined) obj.descripcion = this.descripcion;
    return obj;
  }
}

/**
 * DTO de Respuesta para Lote
 * Datos públicos del lote
 */
export class LoteResponseDTO extends BaseDTO {
  constructor(loteData) {
    super();
    this.id_lote = loteData.id_lote;
    this.nombre = loteData.nombre;
    this.tamano_hectareas = loteData.tamano_hectareas;
    this.descripcion = loteData.descripcion;
    this.activo = loteData.activo;
    this.fecha_registro = loteData.fecha_registro;
  }
}

/**
 * DTO para Listar Lotes
 * Solo información resumida
 */
export class LoteListDTO extends BaseDTO {
  constructor(loteData) {
    super();
    this.id_lote = loteData.id_lote;
    this.nombre = loteData.nombre;
    this.tamano_hectareas = loteData.tamano_hectareas;
    this.activo = loteData.activo;
  }
}

/**
 * DTO para Desactivar/Reactivar Lote
 */
export class ToggleLoteDTO extends BaseDTO {
  constructor(activo) {
    super();
    this.activo = activo;
  }
}
