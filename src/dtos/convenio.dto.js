import { BaseDTO } from "./base.dto.js";

/**
 * DTO de respuesta para convenio comercial (campesino ↔ comprador)
 */
export class ConvenioResponseDTO extends BaseDTO {
  constructor(convenioData) {
    super();
    this.id_convenio = convenioData.id_convenio;
    this.id_usuario_campesino = convenioData.id_usuario_campesino;
    this.id_usuario_comprador = convenioData.id_usuario_comprador;
    this.descuento = convenioData.descuento;
    this.detalle_de_contrato = convenioData.detalle_de_contrato;
    this.fecha_fin = convenioData.fecha_fin;
    this.fecha_creacion = convenioData.fecha_creacion;
    this.estado = convenioData.estado;
    this.comprador_nombre = convenioData.comprador_nombre;
    this.campesino_nombre = convenioData.campesino_nombre;
  }
}

export class ConvenioListDTO extends BaseDTO {
  constructor(convenioData) {
    super();
    this.id_convenio = convenioData.id_convenio;
    this.descuento = convenioData.descuento;
    this.estado = convenioData.estado;
    this.fecha_fin = convenioData.fecha_fin;
    this.comprador_nombre = convenioData.comprador_nombre;
    this.campesino_nombre = convenioData.campesino_nombre;
  }
}
