import { RolesModel } from "../models/rolesModel.js";
import { RolesGrupoModel } from "../models/rolesGrupoModel.js";

// ============================
// ✅ Obtener todos los roles
// ============================
export const getRoles = async (req, res) => {
  try {
    const roles = await RolesModel.getAll();
    return res.json({
      success: true,
      total: roles.length,
      roles
    });
  } catch (error) {
    console.error("❌ Error listando roles:", error);
    return res.status(500).json({ message: "Error obteniendo roles" });
  }
};

// ============================
// ✅ Obtener grupos de roles
// ============================
export const getRolesGrupo = async (req, res) => {
  try {
    const grupos = await RolesGrupoModel.getAll();
    return res.json({
      success: true,
      total: grupos.length,
      grupos
    });
  } catch (error) {
    console.error("❌ Error listando grupos:", error);
    return res.status(500).json({ message: "Error obteniendo grupos" });
  }
};

// ============================
// ✅ Obtener roles por grupo
// ============================
export const getRolesByGrupo = async (req, res) => {
  try {
    const { id_grupo } = req.params;

    const roles = await RolesModel.getRolesByGrupo(id_grupo);

    return res.json({
      success: true,
      total: roles.length,
      roles
    });

  } catch (error) {
    console.error("❌ Error obteniendo roles del grupo:", error);
    return res.status(500).json({ message: "Error obteniendo roles por grupo" });
  }
};
