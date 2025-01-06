module.exports = (sequelize, DataTypes) => {
  const SilinenCalisanlar = sequelize.define(
    "SilinenCalisanlar",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      calisan_id: { type: DataTypes.INTEGER, allowNull: false },
      ad: { type: DataTypes.STRING, allowNull: false },
      soyad: { type: DataTypes.STRING, allowNull: false },
      gorev_id: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      tableName: "silinen_calisanlar",
      timestamps: false,
    }
  );

  return SilinenCalisanlar;
};
