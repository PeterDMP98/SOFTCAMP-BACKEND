import { BaseDTO } from './base.dto.js';

/**
 * GUÍA DE INTEGRACIÓN DE DTOs EN CONTROLLERS
 * ========================================
 * 
 * Los DTOs se integran en 3 pasos:
 * 1. Recibir datos del cliente (req.body)
 * 2. Transformar a DTO correspondiente
 * 3. Retornar ResponseDTO
 */

/**
 * EJEMPLO 1: Crear Ganado (POST /api/ganado)
 * 
 * ANTES (sin DTOs):
 * 
 * export const createGanado = async (req, res) => {
 *   try {
 *     const { nombre_animal, raza, sexo, ... } = req.body;
 *     const ganado = await GanadoRepository.create({
 *       nombre_animal,
 *       raza,
 *       sexo,
 *       ...
 *     }, req.user.id_usuario);
 *     res.json(ganado); // Retorna TODO (sync_status, etc.)
 *   } catch (error) {
 *     res.status(500).json({ error: error.message });
 *   }
 * };
 * 
 * DESPUÉS (con DTOs):
 * 
 * import { CreateGanadoDTO, GanadoResponseDTO } from '../dtos/index.js';
 * 
 * export const createGanado = async (req, res) => {
 *   try {
 *     // 1. Validar y transformar entrada
 *     const createDTO = new CreateGanadoDTO(req.body);
 *     
 *     // 2. Guardar en repositorio
 *     const ganadoCreado = await GanadoRepository.create(
 *       createDTO.toObject(),
 *       req.user.id_usuario
 *     );
 *     
 *     // 3. Transformar para retorno
 *     const responseDTO = new GanadoResponseDTO(ganadoCreado);
 *     res.status(201).json(responseDTO.toObject());
 *   } catch (error) {
 *     res.status(500).json({ error: error.message });
 *   }
 * };
 */

/**
 * EJEMPLO 2: Listar Ganado (GET /api/ganado)
 * 
 * ANTES (sin DTOs):
 * 
 * export const getGanado = async (req, res) => {
 *   try {
 *     const ganados = await GanadoRepository.findByUser(req.user.id_usuario);
 *     res.json(ganados); // Retorna objetos completos
 *   } catch (error) {
 *     res.status(500).json({ error: error.message });
 *   }
 * };
 * 
 * DESPUÉS (con DTOs):
 * 
 * import { GanadoListDTO } from '../dtos/index.js';
 * 
 * export const getGanado = async (req, res) => {
 *   try {
 *     const ganados = await GanadoRepository.findByUser(req.user.id_usuario);
 *     // Transformar cada uno a ListDTO
 *     const response = ganados.map(g => new GanadoListDTO(g).toObject());
 *     res.json(response);
 *   } catch (error) {
 *     res.status(500).json({ error: error.message });
 *   }
 * };
 */

/**
 * EJEMPLO 3: Actualizar Ganado (PATCH /api/ganado/:id)
 * 
 * ANTES (sin DTOs):
 * 
 * export const updateGanado = async (req, res) => {
 *   try {
 *     const { id } = req.params;
 *     const ganado = await GanadoRepository.update(
 *       id,
 *       req.body,
 *       req.user.id_usuario
 *     );
 *     res.json(ganado);
 *   } catch (error) {
 *     res.status(500).json({ error: error.message });
 *   }
 * };
 * 
 * DESPUÉS (con DTOs):
 * 
 * import { UpdateGanadoDTO, GanadoResponseDTO } from '../dtos/index.js';
 * 
 * export const updateGanado = async (req, res) => {
 *   try {
 *     const { id } = req.params;
 *     // Solo incluye campos que fueron enviados (undefined = no actualizar)
 *     const updateDTO = new UpdateGanadoDTO(req.body);
 *     
 *     const ganado = await GanadoRepository.update(
 *       id,
 *       updateDTO.toObjectFiltered(), // Solo campos definidos
 *       req.user.id_usuario
 *     );
 *     
 *     if (!ganado) {
 *       return res.status(404).json({ error: 'No encontrado' });
 *     }
 *     
 *     const responseDTO = new GanadoResponseDTO(ganado);
 *     res.json(responseDTO.toObject());
 *   } catch (error) {
 *     res.status(500).json({ error: error.message });
 *   }
 * };
 */

/**
 * MÉTODOS ÚTILES DE BaseDTO
 * =========================
 */
export class DTOUtilsExample extends BaseDTO {
  /**
   * toObject() - Convierte DTO a objeto plano
   * Usa: Cuando envías al repositorio o retornas en res.json()
   */
  exampleToObject() {
    // const dto = new CreateGanadoDTO({ ... });
    // const obj = dto.toObject();
    // // obj = { nombre_animal: '...', raza: '...', ... }
  }

  /**
   * toObjectFiltered() - Solo campos no nulos
   * Usa: En actualizaciones parciales (PATCH)
   */
  exampleToObjectFiltered() {
    // const dto = new UpdateGanadoDTO({ raza: 'Holstein' });
    // const obj = dto.toObjectFiltered();
    // // obj = { raza: 'Holstein' } (sin undefined)
  }

  /**
   * pick(...fields) - Solo campos específicos
   * Usa: Cuando necesitas un subconjunto
   */
  examplePick() {
    // const dto = new GanadoResponseDTO(ganadoDB);
    // const slim = dto.pick('id_ganado', 'nombre_animal', 'raza');
    // // slim = { id_ganado, nombre_animal, raza }
  }

  /**
   * omit(...fields) - Todo excepto estos campos
   * Usa: Para excluir campos sensibles
   */
  exampleOmit() {
    // const dto = new UsuarioResponseDTO(userDB);
    // const safe = dto.omit('contrasena', 'token');
    // // safe = { id_usuario, nombre, correo, ... (sin contrasena ni token) }
  }
}

/**
 * ESTRUCTURA TÍPICA DE UN DTO
 * ============================
 * 
 * export class CreateXXXDTO extends BaseDTO {
 *   constructor(data) {
 *     super();
 *     this.campo1 = data.campo1;                    // Requerido
 *     this.campo2 = data.campo2 || null;            // Opcional con valor por defecto
 *     this.campo3 = data.campo3 || 'default';       // Opcional con string por defecto
 *   }
 * }
 * 
 * export class UpdateXXXDTO extends BaseDTO {
 *   constructor(data) {
 *     super();
 *     // Todos los campos son opcionales (undefined = no actualizar)
 *     if (data.campo1 !== undefined) this.campo1 = data.campo1;
 *     if (data.campo2 !== undefined) this.campo2 = data.campo2;
 *   }
 * 
 *   // Sobreescribe toObjectFiltered para filtrar correctamente
 *   toObjectFiltered() {
 *     const obj = {};
 *     if (this.campo1 !== undefined) obj.campo1 = this.campo1;
 *     if (this.campo2 !== undefined) obj.campo2 = this.campo2;
 *     return obj;
 *   }
 * }
 * 
 * export class XXXResponseDTO extends BaseDTO {
 *   constructor(data) {
 *     super();
 *     // Solo campos públicos/seguros
 *     this.id = data.id;
 *     this.campo1 = data.campo1;
 *     // NO incluir: sync_status, contrasena, tokens, etc.
 *   }
 * }
 */

/**
 * FLUJO COMPLETO EN UN CONTROLLER
 * ================================
 * 
 * import {
 *   CreateGanadoDTO,
 *   UpdateGanadoDTO,
 *   GanadoResponseDTO,
 *   GanadoListDTO
 * } from '../dtos/index.js';
 * import { GanadoRepository } from '../repositories/ganadoRepository.js';
 * 
 * // CREATE
 * export const create = async (req, res) => {
 *   const createDTO = new CreateGanadoDTO(req.body);
 *   const result = await GanadoRepository.create(createDTO.toObject(), req.user.id_usuario);
 *   res.status(201).json(new GanadoResponseDTO(result).toObject());
 * };
 * 
 * // READ (uno)
 * export const getById = async (req, res) => {
 *   const result = await GanadoRepository.findById(req.params.id);
 *   if (!result) return res.status(404).json({ error: 'No encontrado' });
 *   res.json(new GanadoResponseDTO(result).toObject());
 * };
 * 
 * // READ (lista)
 * export const getAll = async (req, res) => {
 *   const results = await GanadoRepository.findByUser(req.user.id_usuario);
 *   res.json(results.map(r => new GanadoListDTO(r).toObject()));
 * };
 * 
 * // UPDATE
 * export const update = async (req, res) => {
 *   const updateDTO = new UpdateGanadoDTO(req.body);
 *   const result = await GanadoRepository.update(req.params.id, updateDTO.toObjectFiltered(), req.user.id_usuario);
 *   if (!result) return res.status(404).json({ error: 'No encontrado' });
 *   res.json(new GanadoResponseDTO(result).toObject());
 * };
 * 
 * // DELETE
 * export const delete = async (req, res) => {
 *   const result = await GanadoRepository.delete(req.params.id, req.user.id_usuario);
 *   if (!result) return res.status(404).json({ error: 'No encontrado' });
 *   res.json({ message: 'Eliminado correctamente' });
 * };
 */
