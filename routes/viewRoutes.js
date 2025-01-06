const express = require('express');
const router = express.Router();
const viewController = require('../controllers/viewController');
const authMiddleware = require('../middlewares/authMiddleware'); 

// Giriş ekranını render eden rota
router.get('/login', authMiddleware, viewController.renderLogin);
// router.get('/anasayfa', viewController.renderAnaSayfa); // Ana sayfayı göster

module.exports = router;
