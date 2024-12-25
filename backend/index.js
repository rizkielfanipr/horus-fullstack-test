const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const sequelize = require('./config/Database');

// Memuat variabel lingkungan dari .env
dotenv.config();

// Membuat aplikasi Express
const app = express();

// Middleware
app.use(cors()); // Mengaktifkan CORS
app.use(bodyParser.json()); // Mengurai body request dalam format JSON

// Rute API
app.use('/api', userRoutes); // Menggunakan rute user di endpoint /api

// Menguji koneksi ke database
sequelize.authenticate()
  .then(() => console.log('Database terhubung'))
  .catch((err) => console.log('Error: ' + err));

// Menyinkronkan model-model database
sequelize.sync({ force: false })
  .then(() => console.log('Database disinkronkan'));

// Menjalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));
