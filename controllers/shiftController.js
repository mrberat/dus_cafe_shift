const path = require('path');

// Anasayfa ekranını render eden controller
exports.renderShift = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../views/shift.html'));
    } catch (error) {
        res.status(500).send('Bir hata oluştu: ' + error.message);
    }
};
