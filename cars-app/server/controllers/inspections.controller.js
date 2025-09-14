const db = require("../db");

const createInspection = async (req, res) => {
  try {
    const { carId, inspectionDate, mileage } = req.body;
    if (!carId || !inspectionDate || !mileage) {
      return res.status(400).json({ error: "carId, mileage, and inspectionDate are required" });
    }

    const idInspection = Math.random().toString(36).substring(2, 9);
    const items = await db.inspections.readAll();
    if (items.find((i) => i.idInspection === idInspection)) {
      return res.status(409).json({ error: "idInspection already exists" });
    }

    const newItem = { ...req.body, idInspection, createdAt: new Date().toISOString() };
    items.push(newItem);
    await db.inspections.writeAll(items);
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const replaceInspection = async (req, res) => {
  try {
    const items = await db.inspections.readAll();
    const idx = items.findIndex((i) => i.idInspection === req.params.idInspection);
    if (idx === -1) return res.status(404).json({ error: "Inspection not found" });

    const updated = {
      ...req.body,
      idInspection: req.params.idInspection,
      updatedAt: new Date().toISOString(),
    };
    items[idx] = updated;
    await db.inspections.writeAll(items);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const updateInspection = async (req, res) => {
  try {
    const items = await db.inspections.readAll();
    const idx = items.findIndex((i) => i.idInspection === req.params.idInspection);
    if (idx === -1) return res.status(404).json({ error: "Inspection not found" });

    const updated = { ...items[idx], ...req.body, updatedAt: new Date().toISOString() };
    items[idx] = updated;
    await db.inspections.writeAll(items);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const getAllInspections = async (req, res) => {
  try {
    const all = await db.inspections.readAll();
    let items = all.slice();
    const { carId, page = 1, limit = 50 } = req.query;

    if (carId) items = items.filter((i) => i.carId === carId);

    const p = Math.max(1, parseInt(page));
    const l = Math.max(1, parseInt(limit));
    const total = items.length;
    const start = (p - 1) * l;
    const data = items.slice(start, start + l);

    res.json({ total, page: p, limit: l, data });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const getInspectionById = async (req, res) => {
  try {
    const items = await db.inspections.readAll();
    const ins = items.find((i) => i.idInspection === req.params.idInspection);
    if (!ins) return res.status(404).json({ error: "Inspection not found" });
    res.json(ins);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const deleteInspection = async (req, res) => {
  try {
    const items = await db.inspections.readAll();
    const idx = items.findIndex((i) => i.idInspection === req.params.idInspection);
    if (idx === -1) return res.status(404).json({ error: "Inspection not found" });

    const deleted = items.splice(idx, 1)[0];
    await db.inspections.writeAll(items);
    res.json({ deleted });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getAllInspections,
  getInspectionById,
  createInspection,
  replaceInspection,
  updateInspection,
  deleteInspection,
};
