const path = require("path");
const JSONDatabase = require("./json-database");

module.exports = {
  cars: new JSONDatabase(
    path.join(__dirname, "..", "Data", "cars.json")
  ),
  inspections: new JSONDatabase(
    path.join(__dirname, "..", "Data", "inspections.json")
  ),
  sales: new JSONDatabase(
    path.join(__dirname, "..", "Data", "sales.json")
  ),
};
