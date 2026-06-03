import { BaseDTO } from './base.dto.js';

/**
 * DTO para Crear Pedido
 */
export class CreatePedidoDTO extends BaseDTO {
  constructor(data) {
    super();
    this.id_comprador = data.id_comprador;
    this.id_campesino = data.id_campesino;
    this.descripcion = data.descripcion || null;
    this.cantidad_estimada = data.cantidad_estimada;
    this.unidad_medida = data.unidad_medida || 'kg';
    this.precio_unitario = data.precio_unitario;
    this.fecha_entrega_estimada = data.fecha_entrega_estimada || null;
  }
}

/**
 * DTO para Actualizar Pedido
 */
export class UpdatePedidoDTO extends BaseDTO {
  constructor(data) {
    super();
    if (data.descripcion !== undefined) this.descripcion = data.descripcion;
    if (data.cantidad_estimada !== undefined) this.cantidad_estimada = data.cantidad_estimada;
    if (data.precio_unitario !== undefined) this.precio_unitario = data.precio_unitario;
    if (data.fecha_entrega_estimada !== undefined) this.fecha_entrega_estimada = data.fecha_entrega_estimada;
  }

  toObjectFiltered() {
    const obj = {};
    if (this.descripcion !== undefined) obj.descripcion = this.descripcion;
    if (this.cantidad_estimada !== undefined) obj.cantidad_estimada = this.cantidad_estimada;
    if (this.precio_unitario !== undefined) obj.precio_unitario = this.precio_unitario;
    if (this.fecha_entrega_estimada !== undefined) obj.fecha_entrega_estimada = this.fecha_entrega_estimada;
    return obj;
  }
}

/**
 * DTO de Respuesta para Pedido
 */
export class PedidoResponseDTO extends BaseDTO {
  constructor(pedidoData) {
    super();
    this.id_pedido = pedidoData.id_pedido;
    this.id_comprador = pedidoData.id_comprador;
    this.id_campesino = pedidoData.id_campesino;
    this.descripcion = pedidoData.descripcion;
    this.cantidad_estimada = pedidoData.cantidad_estimada;
    this.unidad_medida = pedidoData.unidad_medida;
    this.precio_unitario = pedidoData.precio_unitario;
    this.precio_total = pedidoData.cantidad_estimada * pedidoData.precio_unitario;
    this.estado = pedidoData.estado;
    this.fecha_entrega_estimada = pedidoData.fecha_entrega_estimada;
    this.fecha_solicitud = pedidoData.fecha_solicitud;
  }
}

/**
 * DTO para Listar Pedidos
 */
export class PedidoListDTO extends BaseDTO {
  constructor(pedidoData) {
    super();
    this.id_pedido = pedidoData.id_pedido;
    this.descripcion = pedidoData.descripcion;
    this.cantidad_estimada = pedidoData.cantidad_estimada;
    this.precio_total = pedidoData.cantidad_estimada * pedidoData.precio_unitario;
    this.estado = pedidoData.estado;
    this.fecha_solicitud = pedidoData.fecha_solicitud;
  }
}

/**
 * DTO para Actualizar Estado de Pedido
 */
export class UpdatePedidoEstadoDTO extends BaseDTO {
  constructor(data) {
    super();
    this.estado = data.estado; // 'pendiente', 'confirmado', 'cancelado', etc.
  }
}
