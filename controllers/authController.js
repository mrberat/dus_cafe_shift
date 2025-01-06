const path = require('path');
const { Kullanici } = require('../models');


// Giriş ekranını render eden controller
exports.renderLoginPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/girisekran.html'));
};

// Giriş işlemi rotası
exports.login = async (req, res) => {
    const { kullanici_adi, sifre } = req.body;

    try {
        // Kullanıcıyı veritabanından kontrol et
        const kullanici = await Kullanici.findOne({ where: { kullanici_adi, sifre } });

        if (kullanici) {
            // Kullanıcıyı session'a kaydet
            req.session.user = kullanici;  // Kullanıcıyı session'a kaydediyoruz
            res.redirect('/anasayfa');  // Ana sayfaya yönlendir
        } else {
            res.status(401).send('Hatalı kullanıcı adı veya şifre!');
        }
    } catch (error) {
        res.status(500).send('Bir hata oluştu: ' + error.message);
    }
};

exports.rendermainPage = (req, res) => {
    (req, res,next) => {
        // Kullanıcı giriş yaptı mı kontrol et
        if (!req.session.user) {
            return res.redirect('/login');  // Eğer giriş yapılmadıysa login ekranına yönlendir
        }
        res.redirect("/anasayfa")
        
     
    };
};

exports.logout = (req, res) => {
    try {
        // Kullanıcının oturumunu sonlandır
        req.session.destroy((err) => {
            if (err) {
                // Eğer bir hata oluşursa
                res.status(500).send('Oturum sonlandırılamadı: ' + err.message);
            } else {
                // Oturum başarıyla sonlandırıldığında giriş sayfasına yönlendir
                res.redirect('/login');
            }
        });
    } catch (error) {
        res.status(500).send('Bir hata oluştu: ' + error.message);
    }
};










