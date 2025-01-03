const { Sequelize } = require('sequelize');
require('dotenv').config();  

const sequelize = new Sequelize(
  process.env.DB_NAME, // Nama database
  process.env.DB_USER, // Nama pengguna
  process.env.DB_PASSWORD, // Kata sandi pengguna
  {
    host: process.env.DB_HOST, // Host MySQL
    dialect: 'mysql',
    logging: false,
  }
);

module.exports = sequelize;
