const router = require("express").Router();
const salesController = require("../controllers/sales.controller");

router.get("/", salesController.getAllSales);

router.get("/:idSale", salesController.getSaleById);

router.post("/", salesController.createSale);

router.put("/:idSale", salesController.replaceSale);

router.patch("/:idSale", salesController.updateSale);

router.delete("/:idSale", salesController.deleteSale);

module.exports = router;
