import { BaseDTO } from './base.dto.js';

/**
 * DTO para Crear Chat de IA
 */
export class CreateChatIADTO extends BaseDTO {
  constructor(data) {
    super();
    this.titulo = data.titulo;
    this.rol_usuario = data.rol_usuario; // 'campesino', 'comprador'
    this.contexto = data.contexto || null;
  }
}

/**
 * DTO para Enviar Mensaje en Chat
 */
export class SendMensajeDTO extends BaseDTO {
  constructor(data) {
    super();
    this.id_chat = data.id_chat;
    this.contenido = data.contenido;
    this.tipo_consulta = data.tipo_consulta || 'general';
  }
}

/**
 * DTO de Respuesta para Mensaje
 */
export class MensajeResponseDTO extends BaseDTO {
  constructor(mensajeData) {
    super();
    this.id_mensaje = mensajeData.id_mensaje;
    this.id_chat = mensajeData.id_chat;
    this.rol = mensajeData.rol; // 'user' o 'assistant'
    this.contenido = mensajeData.contenido;
    this.timestamp = mensajeData.timestamp;
    this.metadata = mensajeData.metadata;
  }
}

/**
 * DTO de Respuesta para Chat
 */
export class ChatIAResponseDTO extends BaseDTO {
  constructor(chatData, mensajes = []) {
    super();
    this.id_chat = chatData.id_chat;
    this.titulo = chatData.titulo;
    this.rol_usuario = chatData.rol_usuario;
    this.fecha_creacion = chatData.fecha_creacion;
    this.ultima_actualizacion = chatData.ultima_actualizacion;
    this.mensajes = mensajes.map(m => new MensajeResponseDTO(m));
  }
}

/**
 * DTO para Listar Chats
 */
export class ChatIAListDTO extends BaseDTO {
  constructor(chatData) {
    super();
    this.id_chat = chatData.id_chat;
    this.titulo = chatData.titulo;
    this.fecha_creacion = chatData.fecha_creacion;
    this.ultima_actualizacion = chatData.ultima_actualizacion;
  }
}

/**
 * DTO para Recomendación de IA
 */
export class CreateRecomendacionDTO extends BaseDTO {
  constructor(data) {
    super();
    this.id_chat = data.id_chat;
    this.tipo = data.tipo; // 'cultivo', 'ganaderia', 'marketing'
    this.titulo = data.titulo;
    this.descripcion = data.descripcion;
    this.confianza = data.confianza || 0.7; // 0-1
  }
}

/**
 * DTO de Respuesta para Recomendación
 */
export class RecomendacionResponseDTO extends BaseDTO {
  constructor(recData) {
    super();
    this.id_recomendacion = recData.id_recomendacion;
    this.id_chat = recData.id_chat;
    this.tipo = recData.tipo;
    this.titulo = recData.titulo;
    this.descripcion = recData.descripcion;
    this.confianza = recData.confianza;
    this.aceptada = recData.aceptada;
    this.descartada = recData.descartada;
    this.fecha_creacion = recData.fecha_creacion;
  }
}

/**
 * DTO para Actuar sobre Recomendación
 */
export class AccionRecomendacionDTO extends BaseDTO {
  constructor(data) {
    super();
    this.id_recomendacion = data.id_recomendacion;
    this.accion = data.accion; // 'aceptar', 'descartar'
    this.comentario = data.comentario || null;
  }
}

/**
 * DTO para Tarea Generada por IA
 */
export class TareaIADTO extends BaseDTO {
  constructor(data) {
    super();
    this.id_recomendacion = data.id_recomendacion;
    this.titulo = data.titulo;
    this.descripcion = data.descripcion;
    this.tipo = data.tipo;
    this.prioridad = data.prioridad || 'media';
    this.fecha_vencimiento = data.fecha_vencimiento || null;
  }
}

/**
 * DTO de Respuesta para Tarea Generada
 */
export class TareaGeneradaResponseDTO extends BaseDTO {
  constructor(tareaData) {
    super();
    this.id_tarea = tareaData.id_tarea;
    this.id_recomendacion = tareaData.id_recomendacion;
    this.titulo = tareaData.titulo;
    this.descripcion = tareaData.descripcion;
    this.tipo = tareaData.tipo;
    this.prioridad = tareaData.prioridad;
    this.estado = tareaData.estado;
    this.fecha_vencimiento = tareaData.fecha_vencimiento;
  }
}

/**
 * DTO para Respuesta Completa del Contexto de Chat
 */
export class ContextoChatDTO extends BaseDTO {
  constructor(data) {
    super();
    this.chat = new ChatIAResponseDTO(data.chat, data.mensajes);
    this.recomendaciones = data.recomendaciones.map(r => new RecomendacionResponseDTO(r));
    this.tareas_generadas = data.tareas_generadas.map(t => new TareaGeneradaResponseDTO(t));
  }
}
