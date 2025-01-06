// Giriş yapılmadan erişim engelleyen middleware
module.exports = (req, res, next) => {
    // Eğer kullanıcı session'ında yoksa, login sayfasına yönlendir
    if (!req.session.user) {
        return res.redirect('/login');  // Giriş yapılmamışsa login sayfasına yönlendir
    }
    
    // Kullanıcı giriş yapmışsa, işlemi devam ettir
    next();
};
