import { BaseDTO } from './base.dto.js';

/**
 * DTO para Crear Convenio
 */
export class CreateConvenioDTO extends BaseDTO {
  constructor(data) {
    super();
    this.nombre = data.nombre;
    this.descripcion = data.descripcion || null;
    this.tipo_producto = data.tipo_producto;
    this.precio_unitario = data.precio_unitario;
    this.cantidad_minima = data.cantidad_minima || 0;
    this.fecha_inicio = data.fecha_inicio;
    this.fecha_vencimiento = data.fecha_vencimiento;
  }
}

/**
 * DTO para Actualizar Convenio
 */
export class UpdateConvenioDTO extends BaseDTO {
  constructor(data) {
    super();
    if (data.nombre !== undefined) this.nombre = data.nombre;
    if (data.descripcion !== undefined) this.descripcion = data.descripcion;
    if (data.precio_unitario !== undefined) this.precio_unitario = data.precio_unitario;
    if (data.cantidad_minima !== undefined) this.cantidad_minima = data.cantidad_minima;
    if (data.fecha_vencimiento !== undefined) this.fecha_vencimiento = data.fecha_vencimiento;
  }

  toObjectFiltered() {
    const obj = {};
    if (this.nombre !== undefined) obj.nombre = this.nombre;
    if (this.descripcion !== undefined) obj.descripcion = this.descripcion;
    if (this.precio_unitario !== undefined) obj.precio_unitario = this.precio_unitario;
    if (this.cantidad_minima !== undefined) obj.cantidad_minima = this.cantidad_minima;
    if (this.fecha_vencimiento !== undefined) obj.fecha_vencimiento = this.fecha_vencimiento;
    return obj;
  }
}

/**
 * DTO de Respuesta para Convenio
 */
export class ConvenioResponseDTO extends BaseDTO {
  constructor(convenioData) {
    super();
    this.id_convenio = convenioData.id_convenio;
    this.nombre = convenioData.nombre;
    this.descripcion = convenioData.descripcion;
    this.tipo_producto = convenioData.tipo_producto;
    this.precio_unitario = convenioData.precio_unitario;
    this.cantidad_minima = convenioData.cantidad_minima;
    this.fecha_inicio = convenioData.fecha_inicio;
    this.fecha_vencimiento = convenioData.fecha_vencimiento;
    this.estado = convenioData.estado;
  }
}

/**
 * DTO para Listar Convenios
 */
export class ConvenioListDTO extends BaseDTO {
  constructor(convenioData) {
    super();
    this.id_convenio = convenioData.id_convenio;
    this.nombre = convenioData.nombre;
    this.tipo_producto = convenioData.tipo_producto;
    this.precio_unitario = convenioData.precio_unitario;
    this.estado = convenioData.estado;
  }
}
