import { LoteModel } from "../models/loteModel.js";

export const getLotes = async (req, res) => {
	try {
		const lotes = await LoteModel.getAllByUser(req.user.id_usuario);
		res.json({ data: lotes });
	} catch (e) {
		res.status(500).json({ error: "Error al obtener los lotes" });
	}
};

export const getLoteById = async (req, res) => {
	try {
		const lote = await LoteModel.getById(
			req.params.id,
			req.user.id_usuario
		);


		if (!lote) {
			return res.status(404).json({ error: "Lote no encontrado" });
		}

		res.json({ data: lote });
	} catch (e) {
		res.status(500).json({ error: "Error al obtener el lote" });
	}
};

export const createLote = async (req, res) => {
	try {
		const lote = await LoteModel.create(req.body, req.user.id_usuario);
		res.status(201).json({ data: lote });
	} catch (e) {
		res.status(500).json({ error: "Error al crear el lote" });
	}
};

export const updateLote = async (req, res) => {
	try {
		const lote = await LoteModel.update(
			req.params.id,
			req.body,
			req.user.id_usuario
		);

		if (!lote) {
			return res.status(404).json({ error: "Lote no encontrado" });
		}

		res.json({ data: lote });
	} catch (e) {
		res.status(500).json({ error: "Error al actualizar el lote" });
	}
};

export const deactivateLote = async (req, res) => {
	try {
		const lote = await LoteModel.deactivate(
			req.params.id,
			req.user.id_usuario
		);

		if (!lote) {
			return res.status(404).json({ error: "No autorizado o no existe" });
		}

		res.json({ message: "Lote dasactivado correctamente" });
	} catch (e) {
		res.status(500).json({ error: "Error al desactivar el lote" });
	}
};
