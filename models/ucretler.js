module.exports = (sequelize, DataTypes) => {
    const Ucretler = sequelize.define('ucretler', {
        gorev_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        saatlik_ucret: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    }, {
        tableName: 'ucretler', // Tablo adı
        timestamps: false // Eğer tablonuzda createdAt ve updatedAt gibi zaman damgaları yoksa
    });

    return Ucretler;
};