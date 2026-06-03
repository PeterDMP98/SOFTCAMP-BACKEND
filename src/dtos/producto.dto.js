import { BaseDTO } from './base.dto.js';

/**
 * DTO para Crear Producto
 * Datos requeridos para registrar un nuevo producto
 */
export class CreateProductoDTO extends BaseDTO {
  constructor(data) {
    super();
    this.nombre = data.nombre;
    this.id_categoria = data.id_categoria || 1; // Categoría por defecto
    this.origen_tipo = data.origen_tipo || null; // 'ganado', 'siembra', etc.
    this.origen_id = data.origen_id || null; // ID del ganado, siembra, etc.
    this.descriptcion = data.descriptcion || null; // Nota: BD tiene typo "descriptcion"
    this.unidad_de_medida = data.unidad_de_medida || 'kg';
    this.cantidad_total = data.cantidad_total || 0;
  }
}

/**
 * DTO para Actualizar Producto
 * Todos los campos son opcionales
 */
export class UpdateProductoDTO extends BaseDTO {
  constructor(data) {
    super();
    if (data.nombre !== undefined) this.nombre = data.nombre;
    if (data.id_categoria !== undefined) this.id_categoria = data.id_categoria;
    if (data.descriptcion !== undefined) this.descriptcion = data.descriptcion;
    if (data.unidad_de_medida !== undefined) this.unidad_de_medida = data.unidad_de_medida;
    if (data.cantidad_total !== undefined) this.cantidad_total = data.cantidad_total;
  }

  toObjectFiltered() {
    const obj = {};
    if (this.nombre !== undefined) obj.nombre = this.nombre;
    if (this.id_categoria !== undefined) obj.id_categoria = this.id_categoria;
    if (this.descriptcion !== undefined) obj.descriptcion = this.descriptcion;
    if (this.unidad_de_medida !== undefined) obj.unidad_de_medida = this.unidad_de_medida;
    if (this.cantidad_total !== undefined) obj.cantidad_total = this.cantidad_total;
    return obj;
  }
}

/**
 * DTO de Respuesta para Producto
 * Datos públicos del producto
 */
export class ProductoResponseDTO extends BaseDTO {
  constructor(productoData) {
    super();
    this.id_producto = productoData.id_producto;
    this.nombre = productoData.nombre;
    this.id_categoria = productoData.id_categoria;
    this.categoria_nombre = productoData.categoria_nombre || null;
    this.origen_tipo = productoData.origen_tipo;
    this.origen_id = productoData.origen_id;
    this.descriptcion = productoData.descriptcion;
    this.unidad_de_medida = productoData.unidad_de_medida;
    this.cantidad_total = productoData.cantidad_total;
    this.creado_en = productoData.creado_en;
  }
}

/**
 * DTO para Listar Productos
 * Solo información resumida
 */
export class ProductoListDTO extends BaseDTO {
  constructor(productoData) {
    super();
    this.id_producto = productoData.id_producto;
    this.nombre = productoData.nombre;
    this.categoria_nombre = productoData.categoria_nombre || 'Sin categoría';
    this.unidad_de_medida = productoData.unidad_de_medida;
    this.cantidad_total = productoData.cantidad_total;
  }
}

/**
 * DTO para Actualizar Cantidad de Producto
 * Caso especial: solo actualizar cantidad
 */
export class UpdateProductoCantidadDTO extends BaseDTO {
  constructor(data) {
    super();
    this.cantidad_total = data.cantidad_total;
  }
}
