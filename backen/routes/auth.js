// routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Registro
router.post('/registro', authController.registrar);

// Inicio de sesión
router.post('/login', authController.login);

module.exports = router;