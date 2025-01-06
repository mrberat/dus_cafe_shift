const path = require("path");
const { Sequelize } = require("sequelize");
const { Maaslar } = require("../models"); // Maaslar modelini içe aktar

// HTML sayfasını render eden controller
exports.renderCalisanHarcamalari = (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "../views/calisan_harcamalari.html"));
  } catch (error) {
    res.status(500).send("Bir hata oluştu: " + error.message);
  }
};

// Aylık toplam maaşları getiren API
exports.getAylikToplamMaaslar = async (req, res) => {
  try {
    const aylikMaaslar = await Maaslar.findAll({
      attributes: [
        "ay",
        "yil",
        [Sequelize.fn("SUM", Sequelize.col("toplam_maas")), "toplam_maas"],
      ],
      group: ["ay", "yil"],
      order: [
        ["yil", "ASC"],
        ["ay", "ASC"],
      ],
    });

    res.status(200).json(aylikMaaslar);
  } catch (error) {
    console.error("Aylık maaş hesaplama hatası:", error);
    res
      .status(500)
      .json({ error: "Aylık maaşlar hesaplanırken bir hata oluştu." });
  }
};
