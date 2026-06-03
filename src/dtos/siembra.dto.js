import { BaseDTO } from './base.dto.js';

/**
 * DTO para Crear Siembra
 */
export class CreateSiembraDTO extends BaseDTO {
  constructor(data) {
    super();
    this.nombre_cultivo = data.nombre_cultivo;
    this.id_lote = data.id_lote;
    this.fecha_siembra = data.fecha_siembra;
    this.variedad = data.variedad || null;
    this.cantidad_semilla = data.cantidad_semilla || null;
    this.unidad_medida_semilla = data.unidad_medida_semilla || 'kg';
    this.tipo_riego = data.tipo_riego || null;
    this.descripcion = data.descripcion || null;
  }
}

/**
 * DTO para Actualizar Siembra
 */
export class UpdateSiembraDTO extends BaseDTO {
  constructor(data) {
    super();
    if (data.nombre_cultivo !== undefined) this.nombre_cultivo = data.nombre_cultivo;
    if (data.fecha_siembra !== undefined) this.fecha_siembra = data.fecha_siembra;
    if (data.variedad !== undefined) this.variedad = data.variedad;
    if (data.cantidad_semilla !== undefined) this.cantidad_semilla = data.cantidad_semilla;
    if (data.tipo_riego !== undefined) this.tipo_riego = data.tipo_riego;
    if (data.descripcion !== undefined) this.descripcion = data.descripcion;
  }

  toObjectFiltered() {
    const obj = {};
    if (this.nombre_cultivo !== undefined) obj.nombre_cultivo = this.nombre_cultivo;
    if (this.fecha_siembra !== undefined) obj.fecha_siembra = this.fecha_siembra;
    if (this.variedad !== undefined) obj.variedad = this.variedad;
    if (this.cantidad_semilla !== undefined) obj.cantidad_semilla = this.cantidad_semilla;
    if (this.tipo_riego !== undefined) obj.tipo_riego = this.tipo_riego;
    if (this.descripcion !== undefined) obj.descripcion = this.descripcion;
    return obj;
  }
}

/**
 * DTO de Respuesta para Siembra
 */
export class SiembraResponseDTO extends BaseDTO {
  constructor(siembraData) {
    super();
    this.id_siembra = siembraData.id_siembra;
    this.nombre_cultivo = siembraData.nombre_cultivo;
    this.id_lote = siembraData.id_lote;
    this.nombre_lote = siembraData.nombre_lote;
    this.fecha_siembra = siembraData.fecha_siembra;
    this.variedad = siembraData.variedad;
    this.cantidad_semilla = siembraData.cantidad_semilla;
    this.unidad_medida_semilla = siembraData.unidad_medida_semilla;
    this.tipo_riego = siembraData.tipo_riego;
    this.descripcion = siembraData.descripcion;
    this.fecha_registro = siembraData.fecha_registro;
  }
}

/**
 * DTO para Listar Siembras
 */
export class SiembraListDTO extends BaseDTO {
  constructor(siembraData) {
    super();
    this.id_siembra = siembraData.id_siembra;
    this.nombre_cultivo = siembraData.nombre_cultivo;
    this.nombre_lote = siembraData.nombre_lote;
    this.fecha_siembra = siembraData.fecha_siembra;
  }
}
