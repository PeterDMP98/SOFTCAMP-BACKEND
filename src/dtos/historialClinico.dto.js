import { BaseDTO } from './base.dto.js';

/**
 * DTO para Crear Historial Clínico
 * Datos requeridos para registrar un nuevo historial clínico
 */
export class CreateHistorialClinicoDTO extends BaseDTO {
  constructor(data) {
    super();
    this.nombre_veterinario = data.nombre_veterinario;
    this.id_ganado = data.id_ganado;
    this.fecha_consulta = data.fecha_consulta;
    this.motivo_consulta = data.motivo_consulta;
    this.diagnostico = data.diagnostico || null;
    this.tratamiento = data.tratamiento || null;
    this.observaciones = data.observaciones || null;
  }
}

/**
 * DTO para Actualizar Historial Clínico
 */
export class UpdateHistorialClinicoDTO extends BaseDTO {
  constructor(data) {
    super();
    if (data.diagnostico !== undefined) this.diagnostico = data.diagnostico;
    if (data.tratamiento !== undefined) this.tratamiento = data.tratamiento;
    if (data.observaciones !== undefined) this.observaciones = data.observaciones;
  }

  toObjectFiltered() {
    const obj = {};
    if (this.diagnostico !== undefined) obj.diagnostico = this.diagnostico;
    if (this.tratamiento !== undefined) obj.tratamiento = this.tratamiento;
    if (this.observaciones !== undefined) obj.observaciones = this.observaciones;
    return obj;
  }
}

/**
 * DTO de Respuesta para Historial Clínico
 */
export class HistorialClinicoResponseDTO extends BaseDTO {
  constructor(hcData) {
    super();
    this.id_historial = hcData.id_historial_clinico;
    this.id_ganado = hcData.id_ganado;
    this.nombre_veterinario = hcData.nombre_de_veterinario;
    this.telefono = hcData.telefono;
    this.correo = hcData.correo;
    this.fecha_registro = hcData.fecha_de_registro;
    this.fecha_cierre = hcData.fecha_de_cierre;
    this.tipo_registro = hcData.tipo;
    this.descripcion = hcData.detalles;
    this.estado_consulta = hcData.estado_de_consulta;
    this.precio = hcData.precio;
    this.ganado_nombre = hcData.ganado_nombre;
    this.ganado_identificacion = hcData.ganado_identificacion;
  }
}

/**
 * DTO para Listar Historiales Clínicos
 */
export class HistorialClinicoListDTO extends BaseDTO {
  constructor(hcData) {
    super();
    this.id_historial = hcData.id_historial_clinico;
    this.id_ganado = hcData.id_ganado;
    this.nombre_veterinario = hcData.nombre_de_veterinario;
    this.telefono = hcData.telefono;
    this.correo = hcData.correo;
    this.fecha_registro = hcData.fecha_de_registro;
    this.fecha_cierre = hcData.fecha_de_cierre;
    this.tipo_registro = hcData.tipo;
    this.descripcion = hcData.detalles;
    this.estado_consulta = hcData.estado_de_consulta;
    this.precio = hcData.precio;
    this.ganado_nombre = hcData.ganado_nombre;
    this.ganado_identificacion = hcData.ganado_identificacion;
  }
}
