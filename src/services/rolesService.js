import { RolesRepository } from "../repositories/rolesRepository.js";

export const RolesService = {
  async getAllRoles() {
    return await RolesRepository.findAllWithGrupo();
  },

  async getAllGrupos() {
    return await RolesRepository.findAllGrupos();
  },

  async getRolesByGrupo(id_grupo) {
    const grupo = await RolesRepository.findGrupoById(id_grupo);
    if (!grupo) {
      throw new Error("Grupo no encontrado");
    }
    return await RolesRepository.findByGrupo(id_grupo);
  },
};
