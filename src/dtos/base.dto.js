/**
 * Base DTO - Clase base reutilizable para todos los DTOs
 * Proporciona utilidades comunes para transformación de datos
 */
export class BaseDTO {
  /**
   * Convierte un DTO a un objeto plano
   * @returns {Object} Objeto con las propiedades del DTO
   */
  toObject() {
    const obj = {};
    for (const key in this) {
      if (this.hasOwnProperty(key)) {
        obj[key] = this[key];
      }
    }
    return obj;
  }

  /**
   * Filtra campos nulos o undefined
   * @returns {Object} Objeto sin campos vacíos
   */
  toObjectFiltered() {
    const obj = {};
    for (const key in this) {
      if (this.hasOwnProperty(key) && this[key] != null) {
        obj[key] = this[key];
      }
    }
    return obj;
  }

  /**
   * Convierte el DTO a JSON
   * @returns {string} Representación JSON del DTO
   */
  toJSON() {
    return JSON.stringify(this.toObject());
  }

  /**
   * Obtiene solo los campos especificados
   * @param {string[]} fields - Lista de campos a incluir
   * @returns {Object} Objeto con solo los campos especificados
   */
  pick(...fields) {
    const obj = {};
    fields.forEach(field => {
      if (this.hasOwnProperty(field)) {
        obj[field] = this[field];
      }
    });
    return obj;
  }

  /**
   * Obtiene todos excepto los campos especificados
   * @param {string[]} fields - Lista de campos a excluir
   * @returns {Object} Objeto sin los campos especificados
   */
  omit(...fields) {
    const obj = {};
    for (const key in this) {
      if (this.hasOwnProperty(key) && !fields.includes(key)) {
        obj[key] = this[key];
      }
    }
    return obj;
  }
}
