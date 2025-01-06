const express = require("express");
const router = express.Router();
const calisanlarController = require("../controllers/calisanlarController");

router.get("/calisanlar", calisanlarController.renderCalisanlarPage);
router.get("/api/calisanlar", calisanlarController.getCalisanlar);
router.post("/calisanlar", calisanlarController.addCalisan);
router.post("/api/calisanlar/:id/archive", calisanlarController.archiveCalisan); // Arşivleme işlemi
router.get("/gorevler", calisanlarController.getGorevler);

module.exports = router;
