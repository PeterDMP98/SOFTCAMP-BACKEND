import { BaseDTO } from './base.dto.js';

/**
 * DTO para Registro de Usuario
 * Datos requeridos para crear un nuevo usuario
 */
export class RegisterDTO extends BaseDTO {
  constructor(data) {
    super();
    this.nombre = data.nombre;
    this.correo = data.correo;
    this.contrasena = data.contrasena;
    this.telefono = data.telefono || null;
    this.direccion = data.direccion || null;
    this.id_rol = data.id_rol; // Debe ser validado en el service
  }
}

/**
 * DTO para Login de Usuario
 * Datos requeridos para autenticarse
 */
export class LoginDTO extends BaseDTO {
  constructor(data) {
    super();
    this.correo = data.correo;
    this.contrasena = data.contrasena;
  }
}

/**
 * DTO para Actualizar Usuario
 * Algunos campos opcionales para actualización
 */
export class UpdateUsuarioDTO extends BaseDTO {
  constructor(data) {
    super();
    this.nombre = data.nombre || undefined;
    this.telefono = data.telefono !== undefined ? data.telefono : undefined;
    this.direccion = data.direccion !== undefined ? data.direccion : undefined;
  }

  toObjectFiltered() {
    const obj = {};
    if (this.nombre !== undefined) obj.nombre = this.nombre;
    if (this.telefono !== undefined) obj.telefono = this.telefono;
    if (this.direccion !== undefined) obj.direccion = this.direccion;
    return obj;
  }
}

/**
 * DTO para Cambiar Contraseña
 * Datos requeridos para cambiar la contraseña
 */
export class ChangePasswordDTO extends BaseDTO {
  constructor(data) {
    super();
    this.contrasena_actual = data.contrasena_actual;
    this.contrasena_nueva = data.contrasena_nueva;
    this.contrasena_confirmacion = data.contrasena_confirmacion;
  }
}

/**
 * DTO de Respuesta para Usuario
 * Datos públicos que se retornan al cliente
 */
export class UsuarioResponseDTO extends BaseDTO {
  constructor(userData) {
    super();
    this.id_usuario = userData.id_usuario;
    this.nombre = userData.nombre;
    this.correo = userData.correo;
    this.telefono = userData.telefono;
    this.direccion = userData.direccion;
    this.estado = userData.estado;
    this.fecha_registro = userData.fecha_registro;
    this.id_rol = userData.id_rol;
    this.rol = userData.rol;
    this.id_grupo = userData.id_grupo;
    this.grupo = userData.grupo;
  }
}

/**
 * DTO de Respuesta con Token
 * Retornado en login exitoso
 */
export class AuthResponseDTO extends BaseDTO {
  constructor(userData, token) {
    super();
    this.token = token;
    this.usuario = new UsuarioResponseDTO(userData);
  }
}

/**
 * DTO para Listar Usuarios (Admin)
 * Datos públicos para listado
 */
export class UsuarioListDTO extends BaseDTO {
  constructor(userData) {
    super();
    this.id_usuario = userData.id_usuario;
    this.nombre = userData.nombre;
    this.correo = userData.correo;
    this.estado = userData.estado;
    this.rol = userData.rol;
    this.fecha_registro = userData.fecha_registro;
  }
}
