const db = require("../db");

const createSale = async (req, res) => {
  try {
    const { carId, saleAmount } = req.body;
    if (!carId || !saleAmount) {
      return res.status(400).json({ error: "carId and saleAmount are required" });
    }

    const idSale = Math.random().toString(36).substring(2, 9);
    const items = await db.sales.readAll();
    if (items.find((s) => s.idSale === idSale)) {
      return res.status(409).json({ error: "idSale already exists" });
    }

    const newItem = {
      ...req.body,
      idSale,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    items.push(newItem);
    await db.sales.writeAll(items);

    const cars = await db.cars.readAll();
    const carIdx = cars.findIndex((c) => c.matricule === carId);
    if (carIdx !== -1) {
      cars[carIdx].saleAt = new Date().toISOString(); 
      await db.cars.writeAll(cars);
    }

    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const getAllSales = async (req, res) => {
  try {
    const all = await db.sales.readAll();
    let items = all.slice();
    const { carId, page = 1, limit = 50 } = req.query;

    if (carId) items = items.filter((s) => s.carId === carId);

    const p = Math.max(1, parseInt(page));
    const l = Math.max(1, parseInt(limit));
    const total = items.length;
    const start = (p - 1) * l;
    const data = items.slice(start, start + l);

    const confirmedSales = items.filter((s) => s.status === "confirmed").length;
    const unsuccessfulSales = items.filter(
      (s) => s.status === "pending" || s.status === "cancelled"
    ).length;
    const successRate = total > 0 ? ((confirmedSales / total) * 100).toFixed(2) : 0;

    res.json({ total, page: p, limit: l, successRate: `${successRate}%`, data });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const getSaleById = async (req, res) => {
  try {
    const items = await db.sales.readAll();
    const sale = items.find((s) => s.idSale === req.params.idSale);
    if (!sale) return res.status(404).json({ error: "Sale not found" });
    res.json(sale);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const replaceSale = async (req, res) => {
  try {
    const items = await db.sales.readAll();
    const idx = items.findIndex((s) => s.idSale === req.params.idSale);
    if (idx === -1) return res.status(404).json({ error: "Sale not found" });

    const updated = {
      ...req.body,
      idSale: req.params.idSale,
      updatedAt: new Date().toISOString(),
    };
    items[idx] = updated;
    await db.sales.writeAll(items);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const updateSale = async (req, res) => {
  try {
    const items = await db.sales.readAll();
    const idx = items.findIndex((s) => s.idSale === req.params.idSale);
    if (idx === -1) return res.status(404).json({ error: "Sale not found" });

    const updated = { ...items[idx], ...req.body, updatedAt: new Date().toISOString() };
    items[idx] = updated;
    await db.sales.writeAll(items);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const deleteSale = async (req, res) => {
  try {
    const items = await db.sales.readAll();
    const idx = items.findIndex((s) => s.idSale === req.params.idSale);
    if (idx === -1) return res.status(404).json({ error: "Sale not found" });

    const deleted = items.splice(idx, 1)[0];
    await db.sales.writeAll(items);
    res.json({ deleted });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getAllSales,
  getSaleById,
  createSale,
  replaceSale,
  updateSale,
  deleteSale,
};
