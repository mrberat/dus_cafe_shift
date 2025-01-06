const express = require('express');
const router = express.Router();
const shiftController = require('../controllers/shiftController'); // shiftController doğru yolda mı?
const authMiddleware = require('../middlewares/authMiddleware'); 

// Ana sayfa rotası
router.get('/shift', authMiddleware, shiftController.renderShift);

module.exports = router;