const path = require('path');
const { Maaslar,Calisanlar } = require("../models");

// Anasayfa ekranını render eden controller
exports.renderMaaslar = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../views/maaslar.html'));
    } catch (error) {
        res.status(500).send('Bir hata oluştu: ' + error.message);
    }
};
exports.getFilteredSalaries = async (req, res) => {
    try {
      const { year, month } = req.query;
  
      // Filtreleme için koşullar
      const filters = {};
      if (year) filters.yil = parseInt(year, 10); // Yıl filtresi
      if (month) filters.ay = parseInt(month, 10); // Ay filtresi
  
      // Maaş ve çalışan bilgilerini birleştir
      const salaries = await Maaslar.findAll({
        where: filters,
        include: [
          {
            model: Calisanlar,
            attributes: ["ad", "soyad"], // Çalışan adı ve soyadı alınır
          },
        ],
      });
  
      // Formatlanmış veriler
      const formattedSalaries = salaries.map((salary) => ({
        name: `${salary.Calisanlar.ad} ${salary.Calisanlar.soyad}`,
        totalSalary: salary.toplam_maas,
      }));
  
      res.json(formattedSalaries); // JSON yanıt
    } catch (error) {
      console.error("Maaş verileri alınırken hata oluştu:", error.message);
      res.status(500).json({ error: "Maaş verileri alınamadı." });
    }
  };
  