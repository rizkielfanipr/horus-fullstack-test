const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route untuk mendapatkan semua pengguna
router.get('/users', userController.getUsers);

// Route untuk mendaftarkan pengguna baru (register)
router.post('/register', userController.registerUser);

// Route untuk login pengguna (verifikasi username dan password)
router.post('/login', userController.loginUser);

// Route untuk memperbarui data pengguna berdasarkan ID
router.put('/update/:id', userController.updateUser);

// Route untuk menghapus pengguna berdasarkan ID
router.delete('/delete/:id', userController.deleteUser);

module.exports = router;
