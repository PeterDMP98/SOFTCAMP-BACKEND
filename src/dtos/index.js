/**
 * DTOs Index - Exporta todos los DTOs del proyecto
 * Permite importaciones simples: import { CreateGanadoDTO } from '../dtos'
 */

// Base
export { BaseDTO } from './base.dto.js';

// Usuario & Auth
export {
  RegisterDTO,
  LoginDTO,
  UpdateUsuarioDTO,
  ChangePasswordDTO,
  UsuarioResponseDTO,
  AuthResponseDTO,
  UsuarioListDTO
} from './usuario.dto.js';

// Ganado
export {
  CreateGanadoDTO,
  UpdateGanadoDTO,
  GanadoResponseDTO,
  GanadoListDTO,
  UpdateGanadoSaludDTO
} from './ganado.dto.js';

// Lote
export {
  CreateLoteDTO,
  UpdateLoteDTO,
  LoteResponseDTO,
  LoteListDTO,
  ToggleLoteDTO
} from './lote.dto.js';

// Producto
export {
  CreateProductoDTO,
  UpdateProductoDTO,
  ProductoResponseDTO,
  ProductoListDTO,
  UpdateProductoCantidadDTO
} from './producto.dto.js';

// Siembra
export {
  CreateSiembraDTO,
  UpdateSiembraDTO,
  SiembraResponseDTO,
  SiembraListDTO
} from './siembra.dto.js';

// Stock
export {
  CreateStockDTO,
  UpdateStockDTO,
  StockResponseDTO,
  StockListDTO
} from './stock.dto.js';

// Pedido
export {
  CreatePedidoDTO,
  UpdatePedidoDTO,
  PedidoResponseDTO,
  PedidoListDTO,
  UpdatePedidoEstadoDTO
} from './pedido.dto.js';

// Carrito
export {
  AddCarritoDTO,
  UpdateCarritoDTO,
  CarritoResponseDTO,
  CarritoListDTO
} from './carrito.dto.js';

// Pago
export {
  CreatePagoDTO,
  UpdatePagoDTO,
  PagoResponseDTO,
  PagoListDTO,
  ConfirmPagoDTO
} from './pago.dto.js';

// Tarea
export {
  CreateTareaDTO,
  UpdateTareaDTO,
  TareaResponseDTO,
  TareaListDTO,
  UpdateTareaEstadoDTO
} from './tarea.dto.js';

// Empleado
export {
  CreateEmpleadoDTO,
  UpdateEmpleadoDTO,
  EmpleadoResponseDTO,
  EmpleadoListDTO
} from './empleado.dto.js';

// Convenio
export { ConvenioResponseDTO, ConvenioListDTO } from './convenio.dto.js';

// Historial Clínico
export {
  CreateHistorialClinicoDTO,
  UpdateHistorialClinicoDTO,
  HistorialClinicoResponseDTO,
  HistorialClinicoListDTO
} from './historialClinico.dto.js';

// Registro de Pesaje
export {
  CreateRegistroPesajeDTO,
  UpdateRegistroPesajeDTO,
  RegistroPesajeResponseDTO,
  RegistroPesajeListDTO,
  PesoHistorialDTO
} from './registroPesaje.dto.js';

// Registro de Reproducción
export {
  CreateRegistroReproduccionDTO,
  UpdateRegistroReproduccionDTO,
  RegistroReproduccionResponseDTO,
  RegistroReproduccionListDTO,
  ReproductorHistorialDTO
} from './registroReproduccion.dto.js';

// IA
export {
  CreateChatIADTO,
  SendMensajeDTO,
  MensajeResponseDTO,
  ChatIAResponseDTO,
  ChatIAListDTO,
  CreateRecomendacionDTO,
  RecomendacionResponseDTO,
  AccionRecomendacionDTO,
  TareaIADTO,
  TareaGeneradaResponseDTO,
  ContextoChatDTO
} from './ia.dto.js';
