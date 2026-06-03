import { BaseDTO } from './base.dto.js';

/**
 * DTO para Crear Empleado
 */
export class CreateEmpleadoDTO extends BaseDTO {
  constructor(data) {
    super();
    this.nombre = data.nombre;
    this.correo = data.correo;
    this.telefono = data.telefono;
    this.cargo = data.cargo;
    this.fecha_contratacion = data.fecha_contratacion;
    this.salario = data.salario;
  }
}

/**
 * DTO para Actualizar Empleado
 */
export class UpdateEmpleadoDTO extends BaseDTO {
  constructor(data) {
    super();
    if (data.nombre !== undefined) this.nombre = data.nombre;
    if (data.telefono !== undefined) this.telefono = data.telefono;
    if (data.cargo !== undefined) this.cargo = data.cargo;
    if (data.salario !== undefined) this.salario = data.salario;
  }

  toObjectFiltered() {
    const obj = {};
    if (this.nombre !== undefined) obj.nombre = this.nombre;
    if (this.telefono !== undefined) obj.telefono = this.telefono;
    if (this.cargo !== undefined) obj.cargo = this.cargo;
    if (this.salario !== undefined) obj.salario = this.salario;
    return obj;
  }
}

/**
 * DTO de Respuesta para Empleado
 */
export class EmpleadoResponseDTO extends BaseDTO {
  constructor(empleadoData) {
    super();
    this.id_empleado = empleadoData.id_empleado;
    this.nombre = empleadoData.nombre;
    this.correo = empleadoData.correo;
    this.telefono = empleadoData.telefono;
    this.cargo = empleadoData.cargo;
    this.fecha_contratacion = empleadoData.fecha_contratacion;
    this.salario = empleadoData.salario;
    this.estado = empleadoData.estado || 'activo';
  }
}

/**
 * DTO para Listar Empleados
 */
export class EmpleadoListDTO extends BaseDTO {
  constructor(empleadoData) {
    super();
    this.id_empleado = empleadoData.id_empleado;
    this.nombre = empleadoData.nombre;
    this.cargo = empleadoData.cargo;
    this.estado = empleadoData.estado;
  }
}
