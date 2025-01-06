module.exports = (sequelize, DataTypes) => {
  const Shiftler = sequelize.define(
    "Shiftler",
    {
      shift_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      calisan_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      start_date: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      end_date: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      calisma_saati: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
    },
    {
      tableName: "shiftler",
      timestamps: false,
    }
  );

  // İlişkilendirme burada tanımlanır
  Shiftler.associate = (models) => {
    Shiftler.belongsTo(models.Calisanlar, { foreignKey: "calisan_id" });
  };

  return Shiftler;
};
