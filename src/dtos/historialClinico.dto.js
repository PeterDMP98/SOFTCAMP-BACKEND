import { BaseDTO } from './base.dto.js';

/**
 * DTO para Crear Historial Clínico
 */
export class CreateHistorialClinicoDTO extends BaseDTO {
  constructor(data) {
    super();
    this.id_ganado = data.id_ganado;
    this.fecha_consulta = data.fecha_consulta;
    this.tipo_enfermedad = data.tipo_enfermedad;
    this.diagnostico = data.diagnostico;
    this.tratamiento = data.tratamiento || null;
    this.medicamentos = data.medicamentos || null;
    this.notas_adicionales = data.notas_adicionales || null;
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
    if (data.medicamentos !== undefined) this.medicamentos = data.medicamentos;
    if (data.notas_adicionales !== undefined) this.notas_adicionales = data.notas_adicionales;
  }

  toObjectFiltered() {
    const obj = {};
    if (this.diagnostico !== undefined) obj.diagnostico = this.diagnostico;
    if (this.tratamiento !== undefined) obj.tratamiento = this.tratamiento;
    if (this.medicamentos !== undefined) obj.medicamentos = this.medicamentos;
    if (this.notas_adicionales !== undefined) obj.notas_adicionales = this.notas_adicionales;
    return obj;
  }
}

/**
 * DTO de Respuesta para Historial Clínico
 */
export class HistorialClinicoResponseDTO extends BaseDTO {
  constructor(hcData) {
    super();
    this.id_historial = hcData.id_historial;
    this.id_ganado = hcData.id_ganado;
    this.nombre_animal = hcData.nombre_animal;
    this.fecha_consulta = hcData.fecha_consulta;
    this.tipo_enfermedad = hcData.tipo_enfermedad;
    this.diagnostico = hcData.diagnostico;
    this.tratamiento = hcData.tratamiento;
    this.medicamentos = hcData.medicamentos;
    this.notas_adicionales = hcData.notas_adicionales;
  }
}

/**
 * DTO para Listar Historial Clínico
 */
export class HistorialClinicoListDTO extends BaseDTO {
  constructor(hcData) {
    super();
    this.id_historial = hcData.id_historial;
    this.nombre_animal = hcData.nombre_animal;
    this.fecha_consulta = hcData.fecha_consulta;
    this.tipo_enfermedad = hcData.tipo_enfermedad;
    this.diagnostico = hcData.diagnostico;
  }
}
