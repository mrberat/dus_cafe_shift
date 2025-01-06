const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");
const authMiddleware = require("../middlewares/authMiddleware");

// Ana sayfa rotası
router.get("/anasayfa", authMiddleware, homeController.renderAnasayfa);
// router.get(
//   "/api/shifts/recent",
//   authMiddleware,
//   homeController.getRecentShifts
// );

// router.get("/api/shifts/march", homeController.getMarchShifts);
router.get("/api/shifts/weekly", homeController.getShiftsForSelectedWeek);

module.exports = router;
