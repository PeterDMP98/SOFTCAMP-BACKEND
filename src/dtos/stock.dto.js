import { BaseDTO } from './base.dto.js';

/**
 * DTO para Crear Stock
 */
export class CreateStockDTO extends BaseDTO {
  constructor(data) {
    super();
    this.id_producto = data.id_producto;
    this.cantidad_disponible = data.cantidad_disponible || 0;
    this.cantidad_reservada = data.cantidad_reservada || 0;
    this.ubicacion = data.ubicacion || null;
  }
}

/**
 * DTO para Actualizar Stock
 */
export class UpdateStockDTO extends BaseDTO {
  constructor(data) {
    super();
    if (data.cantidad_disponible !== undefined) this.cantidad_disponible = data.cantidad_disponible;
    if (data.cantidad_reservada !== undefined) this.cantidad_reservada = data.cantidad_reservada;
    if (data.ubicacion !== undefined) this.ubicacion = data.ubicacion;
  }

  toObjectFiltered() {
    const obj = {};
    if (this.cantidad_disponible !== undefined) obj.cantidad_disponible = this.cantidad_disponible;
    if (this.cantidad_reservada !== undefined) obj.cantidad_reservada = this.cantidad_reservada;
    if (this.ubicacion !== undefined) obj.ubicacion = this.ubicacion;
    return obj;
  }
}

/**
 * DTO de Respuesta para Stock
 */
export class StockResponseDTO extends BaseDTO {
  constructor(stockData) {
    super();
    this.id_stock = stockData.id_stock;
    this.id_producto = stockData.id_producto;
    this.nombre_producto = stockData.nombre_producto;
    this.cantidad_disponible = stockData.cantidad_disponible;
    this.cantidad_reservada = stockData.cantidad_reservada;
    this.ubicacion = stockData.ubicacion;
    this.fecha_actualizacion = stockData.fecha_actualizacion;
  }
}

/**
 * DTO para Listar Stock
 */
export class StockListDTO extends BaseDTO {
  constructor(stockData) {
    super();
    this.id_stock = stockData.id_stock;
    this.nombre_producto = stockData.nombre_producto;
    this.cantidad_disponible = stockData.cantidad_disponible;
    this.cantidad_reservada = stockData.cantidad_reservada;
  }
}
