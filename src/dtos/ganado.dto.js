import { BaseDTO } from './base.dto.js';

/**
 * DTO para Crear Ganado
 * Datos requeridos para registrar un nuevo animal
 */
export class CreateGanadoDTO extends BaseDTO {
  constructor(data) {
    super();
    this.nombre_animal = data.nombre_animal;
    this.numero_identificacion = data.numero_identificacion || null;
    this.fecha_nacimiento = data.fecha_nacimiento || null;
    this.raza = data.raza || null;
    this.sexo = data.sexo;
    this.peso_actual = data.peso_actual || null;
    this.estado_salud = data.estado_salud || 'sano';
    this.estado_reproductivo = data.estado_reproductivo || null;
    this.fecha_gestacion = data.fecha_gestacion || null;
    this.detalle = data.detalle || null;
    this.subproducto = data.subproducto || null;
    this.id_lote = data.id_lote || null;
    this.precio = data.precio || null;
  }
}

/**
 * DTO para Actualizar Ganado
 * Todos los campos son opcionales para actualización
 */
export class UpdateGanadoDTO extends BaseDTO {
  constructor(data) {
    super();
    if (data.nombre_animal !== undefined) this.nombre_animal = data.nombre_animal;
    if (data.numero_identificacion !== undefined) this.numero_identificacion = data.numero_identificacion;
    if (data.fecha_nacimiento !== undefined) this.fecha_nacimiento = data.fecha_nacimiento;
    if (data.raza !== undefined) this.raza = data.raza;
    if (data.sexo !== undefined) this.sexo = data.sexo;
    if (data.peso_actual !== undefined) this.peso_actual = data.peso_actual;
    if (data.estado_salud !== undefined) this.estado_salud = data.estado_salud;
    if (data.estado_reproductivo !== undefined) this.estado_reproductivo = data.estado_reproductivo;
    if (data.fecha_gestacion !== undefined) this.fecha_gestacion = data.fecha_gestacion;
    if (data.detalle !== undefined) this.detalle = data.detalle;
    if (data.subproducto !== undefined) this.subproducto = data.subproducto;
    if (data.id_lote !== undefined) this.id_lote = data.id_lote;
    if (data.precio !== undefined) this.precio = data.precio;
  }

  toObjectFiltered() {
    const obj = {};
    if (this.nombre_animal !== undefined) obj.nombre_animal = this.nombre_animal;
    if (this.numero_identificacion !== undefined) obj.numero_identificacion = this.numero_identificacion;
    if (this.fecha_nacimiento !== undefined) obj.fecha_nacimiento = this.fecha_nacimiento;
    if (this.raza !== undefined) obj.raza = this.raza;
    if (this.sexo !== undefined) obj.sexo = this.sexo;
    if (this.peso_actual !== undefined) obj.peso_actual = this.peso_actual;
    if (this.estado_salud !== undefined) obj.estado_salud = this.estado_salud;
    if (this.estado_reproductivo !== undefined) obj.estado_reproductivo = this.estado_reproductivo;
    if (this.fecha_gestacion !== undefined) obj.fecha_gestacion = this.fecha_gestacion;
    if (this.detalle !== undefined) obj.detalle = this.detalle;
    if (this.subproducto !== undefined) obj.subproducto = this.subproducto;
    if (this.id_lote !== undefined) obj.id_lote = this.id_lote;
    if (this.precio !== undefined) obj.precio = this.precio;
    return obj;
  }
}

/**
 * DTO de Respuesta para Ganado
 * Datos públicos que se retornan al cliente
 */
export class GanadoResponseDTO extends BaseDTO {
  constructor(ganadoData) {
    super();
    this.id_ganado = ganadoData.id_ganado;
    this.nombre_animal = ganadoData.nombre_animal;
    this.numero_identificacion = ganadoData.numero_identificacion;
    this.fecha_nacimiento = ganadoData.fecha_nacimiento;
    this.raza = ganadoData.raza;
    this.sexo = ganadoData.sexo;
    this.peso_actual = ganadoData.peso_actual;
    this.estado_salud = ganadoData.estado_salud;
    this.estado_reproductivo = ganadoData.estado_reproductivo;
    this.fecha_gestacion = ganadoData.fecha_gestacion;
    this.detalle = ganadoData.detalle;
    this.subproducto = ganadoData.subproducto;
    this.id_lote = ganadoData.id_lote;
    this.nombre_lote = ganadoData.nombre_lote || null;
    this.precio = ganadoData.precio;
    this.fecha_de_ingreso = ganadoData.fecha_de_ingreso;
  }
}

/**
 * DTO para Listar Ganado (resumen)
 * Solo campos importantes para listado
 */
export class GanadoListDTO extends BaseDTO {
  constructor(ganadoData) {
    super();
    this.id_ganado = ganadoData.id_ganado;
    this.nombre_animal = ganadoData.nombre_animal;
    this.raza = ganadoData.raza;
    this.sexo = ganadoData.sexo;
    this.estado_salud = ganadoData.estado_salud;
    this.peso_actual = ganadoData.peso_actual;
    this.fecha_de_ingreso = ganadoData.fecha_de_ingreso;
  }
}

/**
 * DTO para Actualizar Estado de Salud
 * Caso especial: solo actualizar salud del animal
 */
export class UpdateGanadoSaludDTO extends BaseDTO {
  constructor(data) {
    super();
    this.estado_salud = data.estado_salud;
    this.detalle = data.detalle || null;
  }
}
