const express = require('express');
const router = express.Router();
const maaslarController = require('../controllers/maaslarController'); // shiftController doğru yolda mı?
const authMiddleware = require('../middlewares/authMiddleware'); 

// Ana sayfa rotası
router.get('/maaslar', authMiddleware, maaslarController.renderMaaslar);
router.get("/api/salaries", maaslarController.getFilteredSalaries);

module.exports = router;