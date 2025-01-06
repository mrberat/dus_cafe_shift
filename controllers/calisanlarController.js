const {
  Calisanlar,
  Gorevler,
  silinenCalisanlar,
  Maaslar,
  sequelize,
} = require("../models");
const path = require("path");

module.exports = {
  // Çalışanlar HTML sayfasını render et
  renderCalisanlarPage: (req, res) => {
    try {
      res.sendFile(path.join(__dirname, "../views/calisanlar.html"));
    } catch (error) {
      console.error("HTML sayfasını yükleme hatası:", error);
      res.status(500).send("Sayfa yüklenemedi");
    }
  },

  // JSON olarak çalışanları getir
  getCalisanlar: async (req, res) => {
    try {
      const calisanlar = await Calisanlar.findAll({
        include: [{ model: Gorevler, attributes: ["gorev_ad"] }],
      });
      res.json(calisanlar); // JSON formatında döndür
    } catch (error) {
      console.error("Çalışanları getirme hatası:", error);
      res.status(500).json({ error: "Veri çekme hatası" });
    }
  },

  // Çalışan ekle
  addCalisan: async (req, res) => {
    const { ad, soyad, gorev_id } = req.body;
    try {
      await Calisanlar.create({ ad, soyad, gorev_id });
      res.redirect("/calisanlar");
    } catch (error) {
      console.error("Çalışan ekleme hatası:", error);
      res.status(500).send("Çalışan eklenemedi");
    }
  },

  // Çalışan arşivleme ("silinen_calisanlar" tablosuna taşıma)
  archiveCalisan: async (req, res) => {
    const { id } = req.params;

    try {
      await sequelize.transaction(async (t) => {
        console.log("Transaction başladı.");

        // Silinecek çalışan bilgilerini al
        const calisan = await Calisanlar.findOne({
          where: { calisan_id: id },
          transaction: t,
        });

        if (!calisan) {
          throw new Error("Çalışan bulunamadı.");
        }

        // Çalışan bilgilerini silinen_calisanlar tablosuna taşı
        const silinenCalisan = await silinenCalisanlar.create(
          {
            calisan_id: calisan.calisan_id,
            ad: calisan.ad,
            soyad: calisan.soyad,
            gorev_id: calisan.gorev_id,
          },
          { transaction: t }
        );

        console.log("Silinen çalışan başarıyla kaydedildi:", silinenCalisan);

        // Maaslar tablosundaki calisan_id'yi güncelle
        await Maaslar.update(
          { calisan_id: null },
          { where: { calisan_id: id }, transaction: t }
        );

        // Çalışanı calisanlar tablosundan sil
        await Calisanlar.destroy({
          where: { calisan_id: id },
          transaction: t,
        });

        console.log("Transaction başarıyla tamamlandı.");
      });

      res.status(200).json({ message: "Çalışan başarıyla arşivlendi." });
    } catch (error) {
      console.error("Transaction sırasında hata oluştu:", error);
      res.status(500).json({ error: "Arşivleme işlemi tamamlanamadı." });
    }
  },

  // Görevleri getir
  getGorevler: async (req, res) => {
    try {
      const gorevler = await Gorevler.findAll();
      res.json(gorevler);
    } catch (error) {
      console.error("Görevleri getirme hatası:", error);
      res.status(500).send("Veri çekme hatası");
    }
  },
};
