/**
 * Mapea filas de BD a objetos DTO planos para respuestas HTTP.
 */
export const mapToDto = (DtoClass, data) => new DtoClass(data).toObject();

export const mapListToDto = (DtoClass, items = []) =>
  items.map((item) => mapToDto(DtoClass, item));
