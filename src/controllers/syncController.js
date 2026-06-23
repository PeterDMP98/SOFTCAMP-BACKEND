import { SyncService } from "../services/syncService.js";

export const pushSync = async (req, res) => {
  try {
    const operations = req.body?.operations;
    if (!Array.isArray(operations) || operations.length === 0) {
      return res.status(400).json({ message: "Se requiere un arreglo operations" });
    }

    const result = await SyncService.pushOperations(operations, req.user.id_usuario);
    return res.json({
      message: "Sincronización procesada",
      ...result,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const pullSync = async (req, res) => {
  try {
    const data = await SyncService.pullData(req.user.id_usuario);
    return res.json({
      message: "Datos obtenidos correctamente",
      data,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const syncStatus = async (req, res) => {
  try {
    const status = await SyncService.getServerStatus(req.user.id_usuario);
    return res.json({
      message: "Estado de sincronización",
      data: status,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
