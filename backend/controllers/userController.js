const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');

// GET /user
exports.getUsers = async (req, res) => {
  try {
    const users = await UserModel.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /user
exports.createUser = async (req, res) => {
  const { username, password, email, name } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UserModel.create({
      username,
      password: hashedPassword,
      email,
      name,
    });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /user/:id
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, password, email, name } = req.body;

  try {
    const user = await UserModel.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.username = username || user.username;
    user.password = password ? await bcrypt.hash(password, 10) : user.password;
    user.email = email || user.email;
    user.name = name || user.name;

    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /user/:id
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserModel.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
