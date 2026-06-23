import { RolesService } from "../services/rolesService.js";

export const getRoles = async (req, res) => {
  try {
    const roles = await RolesService.getAllRoles();
    return res.json({
      success: true,
      total: roles.length,
      data: roles,
      roles,
    });
  } catch (error) {
    console.error("Error listando roles:", error);
    return res.status(500).json({ message: "Error obteniendo roles" });
  }
};

export const getRolesGrupo = async (req, res) => {
  try {
    const grupos = await RolesService.getAllGrupos();
    return res.json({
      success: true,
      total: grupos.length,
      data: grupos,
      grupos,
    });
  } catch (error) {
    console.error("Error listando grupos:", error);
    return res.status(500).json({ message: "Error obteniendo grupos" });
  }
};

export const getRolesByGrupo = async (req, res) => {
  try {
    const { id_grupo } = req.params;
    const roles = await RolesService.getRolesByGrupo(id_grupo);

    return res.json({
      success: true,
      total: roles.length,
      data: roles,
      roles,
    });
  } catch (error) {
    const status = error.message.includes("no encontrado") ? 404 : 500;
    if (status === 500) console.error("Error obteniendo roles del grupo:", error);
    return res.status(status).json({ message: error.message });
  }
};
