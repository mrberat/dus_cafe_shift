module.exports = (sequelize, DataTypes) => {
    const Gorevler = sequelize.define(
      "Gorevler",
      {
        gorev_id: { type: DataTypes.INTEGER, primaryKey: true },
        gorev_ad: { type: DataTypes.STRING(10), allowNull: false },
      },
      { tableName: "gorevler", timestamps: false }
    );
  
    Gorevler.associate = (models) => {
      Gorevler.hasMany(models.Calisanlar, { foreignKey: "gorev_id" });
    };
  
    return Gorevler;
  };
  