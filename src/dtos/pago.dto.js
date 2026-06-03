import { BaseDTO } from './base.dto.js';

/**
 * DTO para Crear Pago
 */
export class CreatePagoDTO extends BaseDTO {
  constructor(data) {
    super();
    this.id_pedido = data.id_pedido;
    this.monto = data.monto;
    this.metodo_pago = data.metodo_pago; // 'efectivo', 'transferencia', 'pse', 'wompi'
    this.referencia = data.referencia || null;
  }
}

/**
 * DTO para Actualizar Pago
 */
export class UpdatePagoDTO extends BaseDTO {
  constructor(data) {
    super();
    if (data.estado !== undefined) this.estado = data.estado;
    if (data.referencia !== undefined) this.referencia = data.referencia;
  }

  toObjectFiltered() {
    const obj = {};
    if (this.estado !== undefined) obj.estado = this.estado;
    if (this.referencia !== undefined) obj.referencia = this.referencia;
    return obj;
  }
}

/**
 * DTO de Respuesta para Pago
 */
export class PagoResponseDTO extends BaseDTO {
  constructor(pagoData) {
    super();
    this.id_pago = pagoData.id_pago;
    this.id_pedido = pagoData.id_pedido;
    this.monto = pagoData.monto;
    this.metodo_pago = pagoData.metodo_pago;
    this.estado = pagoData.estado;
    this.referencia = pagoData.referencia;
    this.fecha_pago = pagoData.fecha_pago;
  }
}

/**
 * DTO para Listar Pagos
 */
export class PagoListDTO extends BaseDTO {
  constructor(pagoData) {
    super();
    this.id_pago = pagoData.id_pago;
    this.id_pedido = pagoData.id_pedido;
    this.monto = pagoData.monto;
    this.metodo_pago = pagoData.metodo_pago;
    this.estado = pagoData.estado;
    this.fecha_pago = pagoData.fecha_pago;
  }
}

/**
 * DTO para Confirmar Pago (webhook)
 */
export class ConfirmPagoDTO extends BaseDTO {
  constructor(data) {
    super();
    this.id_pago = data.id_pago;
    this.estado = data.estado; // 'completado', 'fallido', etc.
    this.referencia_externa = data.referencia_externa || null;
  }
}
