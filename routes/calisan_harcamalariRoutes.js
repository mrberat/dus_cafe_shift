const express = require('express');
const router = express.Router();
const calisanHarcamalariController = require('../controllers/calisan_harcamalariController'); // Controller doğru yolda mı?
const authMiddleware = require('../middlewares/authMiddleware'); // Kimlik doğrulama middleware'i

// HTML sayfasını render eden rota
router.get('/calisan_harcamalari', authMiddleware, calisanHarcamalariController.renderCalisanHarcamalari);

// Aylık toplam maaşları getiren API
router.get('/api/aylik_maaslar', authMiddleware, calisanHarcamalariController.getAylikToplamMaaslar);

module.exports = router;
