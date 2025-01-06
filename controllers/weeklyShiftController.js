// controllers/weeklyShiftController.js
const { WeeklyShift,Calisanlar } = require("../models");
const path = require("path");

// Form sayfasını render eder
exports.renderWeeklyShiftForm = (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "../views/shift.html")); // Form dosyasını gönder
  } catch (error) {
    console.error("Form sayfası yüklenirken hata:", error.message);
    res.status(500).send("Bir hata oluştu.");
  }
};

// Formdan gelen veriyi işler ve veritabanına kaydeder
exports.saveWeeklyShiftData = async (req, res) => {
  try {
    const { start_date, end_date, employee_name } = req.body;

    // Gelen verileri formatlayarak tek seferde toplu oluşturma
    const weeklyShifts = employee_name.map((name, index) => ({
      employee_name: name,
      start_date,
      end_date,
      monday_start: req.body.monday_start[index],
      monday_end: req.body.monday_end[index],
      tuesday_start: req.body.tuesday_start[index],
      tuesday_end: req.body.tuesday_end[index],
      wednesday_start: req.body.wednesday_start[index],
      wednesday_end: req.body.wednesday_end[index],
      thursday_start: req.body.thursday_start[index],
      thursday_end: req.body.thursday_end[index],
      friday_start: req.body.friday_start[index],
      friday_end: req.body.friday_end[index],
      saturday_start: req.body.saturday_start[index],
      saturday_end: req.body.saturday_end[index],
      sunday_start: req.body.sunday_start[index],
      sunday_end: req.body.sunday_end[index],
    }));

    // Veritabanına toplu kayıt
    await WeeklyShift.bulkCreate(weeklyShifts);
    res.redirect("/weekly-shift-form"); // Başarılı kayıt sonrası sayfayı yeniden yükle
  } catch (error) {
    console.error("Veri kaydedilirken hata oluştu:", error.message);
    res.status(500).send("Veri kaydedilirken bir hata oluştu.");
  }
};

exports.getWeeklyShiftForm = async (req, res) => {
  try {
    // Çalışan verilerini al
    const calisanlar = await Calisanlar.findAll({
      attributes: ['calisan_id', 'ad', 'soyad'], // Sadece ihtiyacınız olan sütunlar
      raw: true,
    });

    res.render('weekly-shift-form', { calisanlar }); // Veriyi şablona gönder
  } catch (error) {
    console.error('Çalışan verileri alınırken hata oluştu:', error.message);
    res.status(500).send('Çalışan verileri alınamadı.');
  }
};exports.getWeeklyShiftForm = async (req, res) => {
  try {
    // Çalışan verilerini al
    const calisanlar = await Calisanlar.findAll({
      attributes: ['calisan_id', 'ad', 'soyad'], // Sadece ihtiyacınız olan sütunlar
      raw: true,
    });

    res.render('weekly-shift-form', { calisanlar }); // Veriyi şablona gönder
  } catch (error) {
    console.error('Çalışan verileri alınırken hata oluştu:', error.message);
    res.status(500).send('Çalışan verileri alınamadı.');
  }
};
