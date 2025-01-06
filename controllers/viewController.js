const { Calisan } = require('../models'); // Calisan modelini dahil et

// Ana sayfa ekranını render eden controller
exports.renderAnaSayfa = async (req, res) => {
    // Oturum kontrolü (giriş yapmış mı?)
    if (!req.session.user) {
        return res.redirect('/login'); // Giriş yapmamışsa login sayfasına yönlendir
    }

    try {
        // Shift verilerini veritabanından al
        const shifts = await Calisan.findAll(); // veya başka bir model kullanabilirsiniz

        // Ana sayfayı render et ve shift verilerini gönder
        res.render('anasayfa', { shifts });
    } catch (error) {
        res.status(500).send('Veri çekilirken bir hata oluştu: ' + error.message);
    }
};
