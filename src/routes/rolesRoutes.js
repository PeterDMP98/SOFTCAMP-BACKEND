import { Router } from "express";
import { RolesGrupoModel } from "../models/rolesGrupoModel.js";

import {
  getRoles,
  getRolesGrupo,
  getRolesByGrupo
} from "../controllers/rolesController.js";

const router = Router();

// Obtener grupos de roles
router.get("/grupos", getRolesGrupo);

// Obtener roles por grupo
router.get("/grupo/:id_grupo", getRolesByGrupo);

// Obtener todos los roles
router.get("/", getRoles);

export default router;
