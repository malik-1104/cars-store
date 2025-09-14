const router = require("express").Router();
const carsController = require("../controllers/cars.controller");

const genId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

router.get("/", carsController.getCarsList);

router.get("/:matricule", carsController.getCarsByMatricule);

router.post("/", carsController.createCar);

router.put("/:matricule", carsController.updateCarFull);

router.patch("/:matricule", carsController.updateCarPartial);

router.delete("/:matricule", carsController.deleteCar);

module.exports = router;
