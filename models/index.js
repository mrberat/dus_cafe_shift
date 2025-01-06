const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/config.json").development;

// Sequelize veritabanı bağlantısı
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    logging: false, // Konsolda SQL sorgularını gösterme (isteğe bağlı)
  }
);

const db = {};

// Sequelize nesnesi
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Modelleri dahil et
db.Maaslar = require("./maaslar")(sequelize, DataTypes);
db.Kullanici = require("./kullanicilar")(sequelize, DataTypes);
db.Calisanlar = require("./calisanlar")(sequelize, DataTypes);
db.Shiftler = require("./shiftler")(sequelize, DataTypes);
db.WeeklyShift = require("./weeklyShift")(sequelize, DataTypes);
db.Gorevler = require("./gorevler")(sequelize, DataTypes);
db.silinenCalisanlar = require("./silinenCalisanlar")(sequelize, DataTypes);

// Model İlişkilerini Tanımla
db.Shiftler.belongsTo(db.Calisanlar, {
  foreignKey: "calisan_id",
  onDelete: "CASCADE",
});
db.Calisanlar.hasMany(db.Shiftler, { foreignKey: "calisan_id" });

db.Calisanlar.belongsTo(db.Gorevler, {
  foreignKey: "gorev_id",
  onDelete: "SET NULL",
});
db.Gorevler.hasMany(db.Calisanlar, { foreignKey: "gorev_id" });

db.Calisanlar.hasMany(db.Maaslar, {
  foreignKey: "calisan_id",
  onDelete: "CASCADE",
}); // Çalışanların maaşları
db.Maaslar.belongsTo(db.Calisanlar, {
  foreignKey: "calisan_id",
  onDelete: "CASCADE",
}); // Maaşlar, çalışanlara ait

db.silinenCalisanlar.belongsTo(db.Calisanlar, {
  foreignKey: "calisan_id",
  targetKey: "calisan_id",
  onDelete: "CASCADE",
}); // Silinen çalışanlar, çalışan tablosuna bağlıdır

db.Calisanlar.hasMany(db.silinenCalisanlar, {
  foreignKey: "calisan_id",
}); // Çalışanlar, silinen çalışanlarla ilişkilendirilir

// Veritabanı bağlantısını test et
sequelize
  .authenticate()
  .then(() => {
    console.log("Veritabanı bağlantısı başarılı.");
  })
  .catch((err) => {
    console.error("Veritabanı bağlantısı başarısız:", err);
  });

module.exports = db;
