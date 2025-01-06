// routes/weeklyShiftRoutes.js
const express = require("express");
const router = express.Router();
const weeklyShiftController = require("../controllers/weeklyShiftController");

// Haftalık shift verisini kaydetme
router.post("/submit-weekly-shift", weeklyShiftController.saveWeeklyShiftData);

// Haftalık shift formunu gösterme
router.get("/weekly-shift-form", weeklyShiftController.renderWeeklyShiftForm);

router.get("/api/calisanlar", weeklyShiftController.getWeeklyShiftForm);

module.exports = router;
