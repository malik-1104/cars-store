const db = require("../db");

const createCar = async (req, res) => {
  try {
    const { matricule, name, year } = req.body;
    if (!matricule || !name)
      return res.status(400).json({
        error: {
          ...(!matricule && { matricule: "matricule is required" }),
          ...(!name && { name: "name is required" }),
        },
      });

    const items = await db.cars.readAll();
    if (items.find((i) => i.matricule === matricule))
      return res.status(409).json({
        error: {
          matricule: "matricule must be unique",
        },
      });

    const newCar = { ...req.body, createdAt: new Date().toISOString() };
    items.push(newCar);
    await db.cars.writeAll(items);
    res.status(201).json(newCar);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const updateCarFull = async (req, res) => {
  try {
    const items = await db.cars.readAll();
    const idx = items.findIndex((i) => i.matricule === req.params.matricule);
    if (idx === -1) return res.status(404).json({ error: "Not found" });

    const updated = {
      ...req.body,
      matricule: req.params.matricule,
      updatedAt: new Date().toISOString(),
    };
    items[idx] = updated;
    await db.cars.writeAll(items);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const updateCarPartial = async (req, res) => {
  try {
    const items = await db.cars.readAll();
    const idx = items.findIndex((i) => i.matricule === req.params.matricule);
    if (idx === -1) return res.status(404).json({ error: "Not found" });

    const updated = { ...items[idx], ...req.body, updatedAt: new Date().toISOString() };
    items[idx] = updated;
    await db.cars.writeAll(items);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const deleteCar = async (req, res) => {
  try {
    const items = await db.cars.readAll();
    const idx = items.findIndex((i) => i.matricule === req.params.matricule);
    if (idx === -1) return res.status(404).json({ error: "Not found" });

    const deleted = items.splice(idx, 1)[0];
    await db.cars.writeAll(items);
    res.json({ deleted });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const getCarsList = async (req, res) => {
  try {
    const all = await db.cars.readAll();
    let items = all.filter((c) => !c.saleAt);

    const {
      page = 1,
      limit = 100,
      carType,
      color,
      year,
      matricule,
      minPrice,
      maxPrice,
      search,
      categories,
    } = req.query;

    if (categories)
      items = items.filter((i) =>
        categories
          .split(",")
          .map((x) => x.trim().toLowerCase())
          .includes((i.carType || "").toLowerCase())
      );
    if (carType)
      items = items.filter((i) => (i.carType || "").toLowerCase() === carType.toLowerCase());
    if (color)
      items = items.filter((i) => (i.color || "").toLowerCase() === color.toLowerCase());
    if (year) items = items.filter((i) => (i.year || "") === String(year));
    if (matricule) items = items.filter((i) => (i.matricule || "") === String(matricule));
    if (minPrice) items = items.filter((i) => Number(i.price) >= Number(minPrice));
    if (maxPrice) items = items.filter((i) => Number(i.price) <= Number(maxPrice));
    if (search) {
      const s = search.toLowerCase();
      items = items.filter(
        (i) => (i.name || "").toLowerCase().includes(s) || (i.matricule || "").includes(s)
      );
    }

    const p = Math.max(1, parseInt(page));
    const l = Math.max(1, parseInt(limit));
    const total = items.length;
    const start = (p - 1) * l;
    const data = items.slice(start, start + l);

    res.json({ total, page: p, limit: l, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const getCarsByMatricule = async (req, res) => {
  try {
    const items = await db.cars.readAll();
    const car = items.find((c) => c.matricule === req.params.matricule && !c.saleAt);
    if (!car) return res.status(404).json({ error: "Not found" });
    res.json(car);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  createCar,
  updateCarFull,
  updateCarPartial,
  deleteCar,
  getCarsList,
  getCarsByMatricule,
};
