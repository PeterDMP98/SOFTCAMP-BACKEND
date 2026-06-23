import { GanadoService } from "./ganadoService.js";
import { LoteService } from "./loteService.js";
import { TareaService } from "./tareaService.js";
import { SiembraService } from "./siembraService.js";
import { ProductoService } from "./productoService.js";
import { StockService } from "./stockService.js";
import { HistorialClinicoService } from "./historialClinicoService.js";
import { RegistroPesajeService } from "./registroPesajeService.js";
import { RegistroReproduccionService } from "./registroReproduccionService.js";
import { SyncRepository } from "../repositories/syncRepository.js";

const isPendingId = (id) =>
  id == null || String(id).startsWith("pending-") || String(id).startsWith("local-");

const normalizeOperation = (op) => {
  const { entity, action, payload } = op;
  const idKeys = {
    ganado: "id_ganado",
    lote: "id_lote",
    tarea: "id_tarea",
    siembra: "id_siembra",
    producto: "id_producto",
    stock: "id_stock",
    historialClinico: "id_historial_clinico",
    registroPesaje: "id_registros_pesajes",
    registroReproduccion: "id_registros_reproduccion",
  };

  const idKey = idKeys[entity];
  const payloadId =
    entity === "stock"
      ? payload?.id_stock ?? payload?.id_stock_producto
      : payload?.[idKey];

  if (action === "update" && idKey && isPendingId(payloadId)) {
    const next = { ...payload };
    delete next[idKey];
    if (entity === "stock") {
      delete next.id_stock;
      delete next.id_stock_producto;
    }
    return { entity, action: "create", payload: next, _resolvedFrom: "pending-id" };
  }
  return op;
};

const markSyncedForResult = async (entity, result) => {
  const map = {
    ganado: ["ganado", "id_ganado", result?.id_ganado],
    lote: ["lotes", "id_lote", result?.id_lote],
    tarea: ["tarea", "id_tarea", result?.id_tarea],
    siembra: ["siembra", "id_siembra", result?.id_siembra],
    producto: ["productos", "id_producto", result?.id_producto],
    stock: [
      "stock_producto",
      "id_stock_producto",
      result?.id_stock_producto || result?.id_stock,
    ],
  };
  const cfg = map[entity];
  if (cfg && cfg[2]) {
    await SyncRepository.markSynced(cfg[0], cfg[1], cfg[2]);
  }
};

const applyOperation = async (op, id_usuario) => {
  const { entity, action, payload } = normalizeOperation(op);

  if (entity === "ganado") {
    if (action === "create") return await GanadoService.create(payload, id_usuario);
    if (action === "update") {
      if (!payload.id_ganado) throw new Error("id_ganado requerido");
      return await GanadoService.update(payload.id_ganado, payload, id_usuario);
    }
    if (action === "delete") {
      return await GanadoService.delete(payload.id_ganado, id_usuario);
    }
  }

  if (entity === "lote") {
    if (action === "create") return await LoteService.create(payload, id_usuario);
    if (action === "update") {
      if (!payload.id_lote) throw new Error("id_lote requerido");
      return await LoteService.update(payload.id_lote, payload, id_usuario);
    }
  }

  if (entity === "tarea") {
    if (action === "create") return await TareaService.create(payload, id_usuario);
    if (action === "update") {
      if (!payload.id_tarea) throw new Error("id_tarea requerido");
      return await TareaService.update(payload.id_tarea, payload, id_usuario);
    }
    if (action === "delete") {
      return await TareaService.delete(payload.id_tarea, id_usuario);
    }
  }

  if (entity === "siembra") {
    if (action === "create") return await SiembraService.create(payload, id_usuario);
    if (action === "update") {
      if (!payload.id_siembra) throw new Error("id_siembra requerido");
      return await SiembraService.update(payload.id_siembra, payload, id_usuario);
    }
  }

  if (entity === "producto") {
    if (action === "create") return await ProductoService.create(payload, id_usuario);
    if (action === "update") {
      if (!payload.id_producto) throw new Error("id_producto requerido");
      return await ProductoService.update(payload.id_producto, payload, id_usuario);
    }
  }

  if (entity === "stock") {
    const stockId = payload.id_stock_producto || payload.id_stock;
    if (action === "create") return await StockService.create(payload, id_usuario);
    if (action === "update") {
      if (!stockId) throw new Error("id de stock requerido");
      return await StockService.update(stockId, payload, id_usuario);
    }
  }

  if (entity === "historialClinico") {
    if (action === "create") {
      if (!payload.id_ganado) throw new Error("id_ganado requerido para historial");
      const { id_ganado, ...data } = payload;
      return await HistorialClinicoService.create(id_ganado, data, id_usuario);
    }
    if (action === "update") {
      if (!payload.id_historial_clinico) throw new Error("id_historial_clinico requerido");
      return await HistorialClinicoService.update(payload.id_historial_clinico, payload, id_usuario);
    }
  }

  if (entity === "registroPesaje") {
    if (action === "create") {
      if (!payload.id_ganado) throw new Error("id_ganado requerido para pesaje");
      const { id_ganado, ...data } = payload;
      return await RegistroPesajeService.create(id_ganado, data, id_usuario);
    }
    if (action === "update") {
      if (!payload.id_registros_pesajes) throw new Error("id_registros_pesajes requerido");
      return await RegistroPesajeService.update(payload.id_registros_pesajes, payload, id_usuario);
    }
  }

  if (entity === "registroReproduccion") {
    if (action === "create") return await RegistroReproduccionService.create(payload, id_usuario);
    if (action === "update") {
      if (!payload.id_registros_reproduccion) throw new Error("id requerido");
      return await RegistroReproduccionService.update(
        payload.id_registros_reproduccion,
        payload,
        id_usuario
      );
    }
  }

  throw new Error(`Operación no soportada: ${entity}.${action}`);
};

export const SyncService = {
  conflictStrategy: "last-write-wins",

  async pushOperations(operations, id_usuario) {
    const synced = [];
    const failed = [];
    const resolved = [];

    for (const op of operations) {
      const normalized = normalizeOperation(op);
      if (normalized._resolvedFrom) {
        resolved.push({ queueId: op.id, reason: normalized._resolvedFrom });
      }
      try {
        const result = await applyOperation(normalized, id_usuario);
        await markSyncedForResult(normalized.entity, result);
        synced.push({
          id: op.id,
          entity: op.entity,
          action: normalized.action,
          result,
        });
      } catch (error) {
        failed.push({
          id: op.id,
          entity: op.entity,
          action: op.action,
          error: error.message,
        });
      }
    }

    return {
      strategy: this.conflictStrategy,
      synced,
      failed,
      resolved,
    };
  },

  async pullData(id_usuario) {
    const [ganado, lotes, tareas, siembra, productos, stock] = await Promise.all([
      GanadoService.getAllByUser(id_usuario),
      LoteService.getAllByUser(id_usuario),
      TareaService.getAllByUser(id_usuario),
      SiembraService.getAllByUser(id_usuario),
      ProductoService.getAllByUser(id_usuario),
      StockService.getAllByUser(id_usuario),
    ]);

    return {
      ganado,
      lotes,
      tareas,
      siembra,
      productos,
      stock,
      pulledAt: new Date().toISOString(),
    };
  },

  async getServerStatus(id_usuario) {
    return await SyncRepository.getPendingCountsByUser(id_usuario);
  },
};
