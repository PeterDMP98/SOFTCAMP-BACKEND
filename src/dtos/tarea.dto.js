import { BaseDTO } from './base.dto.js';

/**
 * DTO para Crear Tarea
 */
export class CreateTareaDTO extends BaseDTO {
  constructor(data) {
    super();
    this.titulo = data.titulo;
    this.descripcion = data.descripcion || null;
    this.id_ganado = data.id_ganado || null;
    this.id_lote = data.id_lote || null;
    this.fecha_vencimiento = data.fecha_vencimiento || null;
    this.prioridad = data.prioridad || 'media'; // 'baja', 'media', 'alta'
    this.tipo = data.tipo || 'general'; // 'general', 'alimentacion', 'salud', 'reproduccion'
  }
}

/**
 * DTO para Actualizar Tarea
 */
export class UpdateTareaDTO extends BaseDTO {
  constructor(data) {
    super();
    if (data.titulo !== undefined) this.titulo = data.titulo;
    if (data.descripcion !== undefined) this.descripcion = data.descripcion;
    if (data.fecha_vencimiento !== undefined) this.fecha_vencimiento = data.fecha_vencimiento;
    if (data.prioridad !== undefined) this.prioridad = data.prioridad;
  }

  toObjectFiltered() {
    const obj = {};
    if (this.titulo !== undefined) obj.titulo = this.titulo;
    if (this.descripcion !== undefined) obj.descripcion = this.descripcion;
    if (this.fecha_vencimiento !== undefined) obj.fecha_vencimiento = this.fecha_vencimiento;
    if (this.prioridad !== undefined) obj.prioridad = this.prioridad;
    return obj;
  }
}

/**
 * DTO de Respuesta para Tarea
 */
export class TareaResponseDTO extends BaseDTO {
  constructor(tareaData) {
    super();
    this.id_tarea = tareaData.id_tarea;
    this.titulo = tareaData.titulo;
    this.descripcion = tareaData.descripcion;
    this.estado = tareaData.estado;
    this.prioridad = tareaData.prioridad;
    this.tipo = tareaData.tipo;
    this.fecha_vencimiento = tareaData.fecha_vencimiento;
    this.fecha_creacion = tareaData.fecha_creacion;
  }
}

/**
 * DTO para Listar Tareas
 */
export class TareaListDTO extends BaseDTO {
  constructor(tareaData) {
    super();
    this.id_tarea = tareaData.id_tarea;
    this.titulo = tareaData.titulo;
    this.estado = tareaData.estado;
    this.prioridad = tareaData.prioridad;
    this.fecha_vencimiento = tareaData.fecha_vencimiento;
  }
}

/**
 * DTO para Cambiar Estado de Tarea
 */
export class UpdateTareaEstadoDTO extends BaseDTO {
  constructor(data) {
    super();
    this.estado = data.estado; // 'pendiente', 'en_progreso', 'completada', 'cancelada'
  }
}
