const router = require("express").Router();

const inspectionsController = require("../controllers/inspections.controller");

router.get("/", inspectionsController.getAllInspections);

router.get("/:idInspection", inspectionsController.getInspectionById);

router.post("/", inspectionsController.createInspection);

router.put("/:idInspection", inspectionsController.replaceInspection);

router.patch("/:idInspection", inspectionsController.updateInspection);

router.delete("/:idInspection", inspectionsController.deleteInspection);

module.exports = router;
