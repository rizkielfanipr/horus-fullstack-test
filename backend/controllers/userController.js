const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');

// GET /user - Mengambil daftar semua pengguna
exports.getUsers = async (req, res) => {
  try {
    // Mendapatkan semua pengguna dari database
    const users = await UserModel.findAll();
    // Mengirimkan data pengguna dalam format JSON
    res.json(users);
  } catch (err) {
    // Menangani error dan mengirimkan status 500 jika ada masalah
    res.status(500).json({ error: err.message });
  }
};

// POST /user/register - Mendaftarkan pengguna baru
exports.registerUser = async (req, res) => {
  const { username, password, email, name } = req.body;

  try {
    // Meng-hash password sebelum menyimpan ke database
    const hashedPassword = await bcrypt.hash(password, 10);
    // Membuat pengguna baru di database
    const newUser = await UserModel.create({
      username,
      password: hashedPassword,
      email,
      name,
    });

    // Mengirimkan respons sukses dan data pengguna yang baru dibuat
    res.status(201).json({
      message: 'User created successfully',
      user: newUser, // Mengirim data pengguna yang baru dibuat
    });
  } catch (err) {
    // Menangani error jika ada masalah dalam pembuatan pengguna
    res.status(500).json({ error: err.message });
  }
};

// POST /user/login - Login pengguna
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Mencari pengguna berdasarkan username
    const user = await UserModel.findOne({ where: { username } });

    if (!user) {
      // Mengirimkan error jika pengguna tidak ditemukan
      return res.status(404).json({ error: 'User not found' });
    }

    // Memverifikasi password yang dimasukkan dengan password yang ada di database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      // Mengirimkan error jika password tidak cocok
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Membuat token JWT yang berisi id dan username pengguna
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET, // Kunci rahasia JWT yang diset di .env
      { expiresIn: '1h' } // Token berlaku selama 1 jam
    );

    // Mengirimkan token JWT kepada pengguna
    res.json({
      message: 'Login successful',
      token, // Mengirimkan token yang baru dibuat
    });
  } catch (err) {
    // Menangani error jika terjadi kesalahan pada login
    res.status(500).json({ error: err.message });
  }
};

// PUT /user/:id - Mengupdate data pengguna berdasarkan ID
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, password, email, name } = req.body;

  try {
    // Mencari pengguna berdasarkan ID
    const user = await UserModel.findByPk(id);

    if (!user) {
      // Mengirimkan error jika pengguna tidak ditemukan
      return res.status(404).json({ error: 'User not found' });
    }

    // Memperbarui data pengguna dengan data yang baru
    user.username = username || user.username;
    user.password = password ? await bcrypt.hash(password, 10) : user.password;
    user.email = email || user.email;
    user.name = name || user.name;

    // Menyimpan perubahan data pengguna
    await user.save();
    // Mengirimkan data pengguna yang sudah diperbarui
    res.json(user);
  } catch (err) {
    // Menangani error jika ada masalah dalam pembaruan data
    res.status(500).json({ error: err.message });
  }
};

// DELETE /user/:id - Menghapus pengguna berdasarkan ID
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Mencari pengguna berdasarkan ID
    const user = await UserModel.findByPk(id);

    if (!user) {
      // Mengirimkan error jika pengguna tidak ditemukan
      return res.status(404).json({ error: 'User not found' });
    }

    // Menghapus pengguna dari database
    await user.destroy();
    // Mengirimkan status 204 (no content) setelah pengguna dihapus
    res.status(204).send();
  } catch (err) {
    // Menangani error jika ada masalah dalam penghapusan
    res.status(500).json({ error: err.message });
  }
};
