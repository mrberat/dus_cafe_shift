const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const authRoutes = require("./routes/authRoutes"); // authRoutes dahil ediliyor
const homeRoutes = require("./routes/homeRoutes"); // homeRoutes dahil ediliyor
const shiftRoutes = require("./routes/shiftRoutes"); // shiftRoutes dahil ediliyor
const calisanlarRoutes = require("./routes/calisanlarRoutes"); // calisanlarRoutes dahil ediliyor
const maaslarRoutes = require("./routes/maaslarRoutes");
const calisan_harcamalariRoutes = require("./routes/calisan_harcamalariRoutes");
const authMiddleware = require("./middlewares/authMiddleware");
const weeklyShiftRoutes = require("./routes/weeklyShiftRoutes");
const db = require("./models");

const app = express();

// Oturum yönetimi
app.use(
  session({
    secret: "gizliAnahtar", // Oturum güvenliği için bir anahtar
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Geliştirme ortamı için secure=false
  })
);

// Statik dosya servisi
app.use(express.static("public"));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Rotaları kullan
app.use("/", authRoutes); // authRoutes burada kullanılıyor
app.use("/", authMiddleware, homeRoutes); // homeRoutes burada kullanılıyor
app.use("/", authMiddleware, shiftRoutes); //shitRoutes burada kullanılıyor
app.use("/", authMiddleware, calisanlarRoutes); //calisanlarRoutes burada kullanılıyor
app.use("/", authMiddleware, maaslarRoutes); //maaslarRoutes burada kullanılıyor
app.use("/", authMiddleware, calisan_harcamalariRoutes);
app.use("/", authMiddleware, weeklyShiftRoutes);

// Veritabanı bağlantısı ve tablo senkronizasyonu
db.sequelize.sync({ force: false, alter: false, logging: false }).then(() => {
  console.log("Veritabanı mevcut tablolara göre senkronize edildi.");
});

// Sunucuyu başlat
const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server running on http://localhost:3000");
});
