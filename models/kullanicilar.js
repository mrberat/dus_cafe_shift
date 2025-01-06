module.exports = (sequelize, DataTypes) => {
    const Kullanici = sequelize.define('Kullanici', {
        calisan_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        kullanici_adi: {
            type: DataTypes.STRING,
            allowNull: false
        },
        sifre: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'kullanicilar', // Tablo adını 'kullanicilar' olarak değiştiriyoruz
        timestamps: false // Eğer tablonuzda createdAt ve updatedAt gibi zaman damgaları yoksa
    });

    return Kullanici;
};

