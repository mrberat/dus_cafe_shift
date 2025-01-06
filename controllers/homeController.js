const path = require("path");
const { Op } = require("sequelize");
const { Shiftler } = require("../models");
const { Calisanlar } = require("../models");
const { WeeklyShift } = require("../models");
// Anasayfa ekranını render eden controller
exports.renderAnasayfa = (req, res) => {
  // Kullanıcı giriş yaptı mı kontrol et
  if (!req.session || !req.session.user) {
    return res.redirect("/login"); // Eğer giriş yapılmadıysa login ekranına yönlendir
  }

  // Giriş yapılmışsa, anasayfa dosyasını render et
  res.sendFile(path.join(__dirname, "../views/anasayfa.html"));
};


exports.getShiftsForSelectedWeek = async (req, res) => {
  try {
    const { startDate } = req.query;

    if (!startDate) {
      return res.status(400).json({
        message: "Lütfen geçerli bir başlangıç tarihi seçin.",
      });
    }

    // Tarih aralığını hesapla: başlangıç + 6 gün
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6);

    const shifts = await WeeklyShift.findAll({
      where: {
        start_date: {
          [Op.between]: [startDate, endDate.toISOString().split("T")[0]],
        },
      },
      order: [["start_date", "ASC"]],
    });

    res.json(shifts);
  } catch (error) {
    console.error("WeeklyShift verileri alınırken hata oluştu:", error);
    res.status(500).json({ message: "Veriler alınamadı." });
  }
};
