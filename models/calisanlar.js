module.exports = (sequelize, DataTypes) => {
  const Calisanlar = sequelize.define(
    "Calisanlar",
    {
      calisan_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: false},
      ad: { type: DataTypes.STRING, allowNull: false },
      soyad: { type: DataTypes.STRING, allowNull: false },
      gorev_id: { type: DataTypes.INTEGER, allowNull: false },
    },
    { tableName: "calisanlar", timestamps: false }
  );

  Calisanlar.associate = (models) => {
    Calisanlar.belongsTo(models.Gorevler, { foreignKey: "gorev_id" });
  };

  return Calisanlar;
};
