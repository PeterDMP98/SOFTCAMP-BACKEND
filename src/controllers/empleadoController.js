import { EmpleadoService } from "../services/empleadoService.js";
import { EmpleadoResponseDTO, EmpleadoListDTO } from "../dtos/index.js";
import { mapToDto, mapListToDto } from "../utils/dtoMapper.js";

export const getEmpleados = async (req, res) => {
  try {
    const empleados = await EmpleadoService.getAllByPadre(req.user.id_usuario);
    return res.json({
      message: "Empleados obtenidos correctamente",
      data: mapListToDto(EmpleadoListDTO, empleados),
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getEmpleadoById = async (req, res) => {
  try {
    const empleado = await EmpleadoService.getById(req.params.id, req.user.id_usuario);
    return res.json({
      message: "Empleado obtenido correctamente",
      data: mapToDto(EmpleadoResponseDTO, empleado),
    });
  } catch (error) {
    const status = error.message.includes("no encontrado") ? 404 : 500;
    return res.status(status).json({ message: error.message });
  }
};

export const createEmpleado = async (req, res) => {
  try {
    if (!req.body.nombre || !req.body.correo || !req.body.telefono) {
      return res.status(400).json({ message: "Nombre, correo y teléfono son requeridos" });
    }
    const nuevo = await EmpleadoService.create(req.body, req.user.id_usuario);
    return res.status(201).json({
      message: "Empleado creado correctamente",
      data: mapToDto(EmpleadoResponseDTO, nuevo),
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const updateEmpleado = async (req, res) => {
  try {
    const actualizado = await EmpleadoService.update(req.params.id, req.body, req.user.id_usuario);
    return res.json({
      message: "Empleado actualizado correctamente",
      data: mapToDto(EmpleadoResponseDTO, actualizado),
    });
  } catch (error) {
    const status = error.message.includes("no encontrado") ? 404 : 400;
    return res.status(status).json({ message: error.message });
  }
};

export const deleteEmpleado = async (req, res) => {
  try {
    await EmpleadoService.delete(req.params.id, req.user.id_usuario);
    return res.json({ message: "Empleado desactivado correctamente" });
  } catch (error) {
    const status = error.message.includes("no encontrado") ? 404 : 400;
    return res.status(status).json({ message: error.message });
  }
};
