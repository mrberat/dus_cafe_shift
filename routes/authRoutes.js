const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Giriş ekranını render eden rota
router.get('/login', authController.renderLoginPage); // login sayfasını gösterir

// Giriş işlemi rotası
router.post('/login', authController.login); // login işlemini yapar

// Logout işlemi
router.get('/login', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Oturum kapatılırken hata:', err);
        return res.redirect('/login');
      }
      res.clearCookie('connect.sid'); // Tarayıcıdan session ID'yi sil
      res.render('login'); // Login sayfasını kullanıcıya göster
    });
  });


   

module.exports = router; 








