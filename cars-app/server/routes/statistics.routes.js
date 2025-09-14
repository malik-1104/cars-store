const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res) => {
  try {
    const cars = await db.cars.readAll();
    const sales = await db.sales.readAll();
    const inspections = await db.inspections.readAll();

    const currentYear = new Date().getFullYear();

    const filteredSales = sales.filter(
      (s) => new Date(s.saleDate).getFullYear() === currentYear
    );
    const filteredInspections = inspections.filter(
      (i) => new Date(i.inspectionDate).getFullYear() === currentYear
    );
    const filteredCars = cars.filter(
      (c) => new Date(c.entryDate).getFullYear() === currentYear
    );

    const monthlyProfitAndLoss = Array.from({ length: 12 }, (_, i) => ({
      month: new Date(0, i).toLocaleString("en-US", { month: "long" }),
      profit: 0,
      loss: 0,
    }));

    filteredSales.forEach((s) => {
      const month = new Date(s.saleDate).getMonth();
      monthlyProfitAndLoss[month].profit += parseFloat(s.saleAmount || 0);
    });

    filteredCars.forEach((c) => {
      const month = new Date(c.entryDate).getMonth();
      monthlyProfitAndLoss[month].loss += parseFloat(c.price || 0);
    });

    filteredInspections.forEach((i) => {
      const month = new Date(i.inspectionDate).getMonth();
      monthlyProfitAndLoss[month].loss += parseFloat(i.repairCost || 0);
    });

    const totalSales = filteredSales.length;
    const totalRevenue = filteredSales.reduce(
      (sum, s) => sum + parseFloat(s.saleAmount || 0),
      0
    );

    const monthlySales = Array.from({ length: 12 }, (_, i) => ({
      month: new Date(0, i).toLocaleString("en-US", { month: "long" }),
      Electric: 0,
      Luxury: 0,
      Economy: 0,
    }));

    filteredSales.forEach((s) => {
      const month = new Date(s.saleDate).getMonth();
      const car = cars.find((c) => c.matricule === s.carId);
      if (car) monthlySales[month][car.carType] += 1;
    });

    const carTypeDistribution = cars.reduce((acc, c) => {
      acc[c.carType] = (acc[c.carType] || 0) + 1;
      return acc;
    }, {});

    const totalCars = Object.values(carTypeDistribution).reduce(
      (sum, count) => sum + count,
      0
    );

    const circleChart = Object.entries(carTypeDistribution).map(
      ([type, count]) => ({
        name: type,
        value: count,
        percentage: ((count / totalCars) * 100).toFixed(1),
      })
    );

    res.json({
      values: { totalSales, totalRevenue },
      barChart: monthlySales,
      circleChart,
      profitAndLoss: monthlyProfitAndLoss,
    });
  } catch (err) {
    console.error("Error fetching statistics:", err);
    res.status(500).json({ error: "Failed to fetch statistics" });
  }
});

module.exports = router;
