import { BaseDTO } from './base.dto.js';

/**
 * DTO para Agregar Item a Carrito
 */
export class AddCarritoDTO extends BaseDTO {
  constructor(data) {
    super();
    this.id_producto = data.id_producto;
    this.cantidad = data.cantidad;
    this.precio_unitario = data.precio_unitario;
  }
}

/**
 * DTO para Actualizar Item del Carrito
 */
export class UpdateCarritoDTO extends BaseDTO {
  constructor(data) {
    super();
    if (data.cantidad !== undefined) this.cantidad = data.cantidad;
  }

  toObjectFiltered() {
    const obj = {};
    if (this.cantidad !== undefined) obj.cantidad = this.cantidad;
    return obj;
  }
}

/**
 * DTO de Respuesta para Item del Carrito
 */
export class CarritoResponseDTO extends BaseDTO {
  constructor(carritoData) {
    super();
    this.id_carrito = carritoData.id_carrito;
    this.id_producto = carritoData.id_producto;
    this.nombre_producto = carritoData.nombre_producto;
    this.cantidad = carritoData.cantidad;
    this.precio_unitario = carritoData.precio_unitario;
    this.subtotal = carritoData.cantidad * carritoData.precio_unitario;
  }
}

/**
 * DTO para Listar Carrito
 */
export class CarritoListDTO extends BaseDTO {
  constructor(carritoData, items = []) {
    super();
    this.id_carrito = carritoData.id_carrito;
    this.fecha_creacion = carritoData.fecha_creacion;
    this.items = items.map(item => ({
      id_carrito_item: item.id_carrito_item,
      nombre_producto: item.nombre_producto,
      cantidad: item.cantidad,
      precio_unitario: item.precio_unitario,
      subtotal: item.cantidad * item.precio_unitario
    }));
    this.total = items.reduce((sum, item) => sum + (item.cantidad * item.precio_unitario), 0);
  }
}
