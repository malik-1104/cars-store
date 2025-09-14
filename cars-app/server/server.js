
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

const routesCars = require("./routes/cars.routes");
const routesIns = require("./routes/inspections.routes");
const routesSales = require("./routes/sales.routes");
const routesStatistics = require("./routes/statistics.routes");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// API routes
app.use("/api/cars", routesCars);
app.use("/api/inspections", routesIns);
app.use("/api/sales", routesSales);
app.use("/api/statistics", routesStatistics);

// MCP
function readJson(file) {
  return JSON.parse(fs.readFileSync(path.join(__dirname, "Data", file), "utf8"));
}

app.get("/mcp/cars", (req, res) => {
  try {
    res.json(readJson("cars.json"));
  } catch (e) {
    res.status(500).json({ error: "Failed to read cars.json" });
  }
});

app.get("/mcp/sales", (req, res) => {
  try {
    res.json(readJson("sales.json"));
  } catch (e) {
    res.status(500).json({ error: "Failed to read sales.json" });
  }
});

app.get("/mcp/inspections", (req, res) => {
  try {
    res.json(readJson("inspections.json"));
  } catch (e) {
    res.status(500).json({ error: "Failed to read inspections.json" });
  }
});

app.get("/", (req, res) => {
  res.json({ ok: true, msg: "API is running" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT} (API + MCP)`)
);
