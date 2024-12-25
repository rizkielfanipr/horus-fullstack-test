const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// API Endpoints
router.get('/user', userController.getUsers);
router.post('/user', userController.createUser);
router.put('/user/:id', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);

module.exports = router;
