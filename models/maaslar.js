module.exports = (sequelize, DataTypes) => {
    const Maaslar = sequelize.define('maaslar', {
        calisan_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        ay: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        yil: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        toplam_calisma_saati: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        toplam_maas: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    }, {
        tableName: 'maaslar', // Tablo adını 'kullanicilar' olarak değiştiriyoruz
        timestamps: false // Eğer tablonuzda createdAt ve updatedAt gibi zaman damgaları yoksa
    });

    return Maaslar;
};
