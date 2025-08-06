const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carritoController');

// Obtener el carrito de un usuario (con total incluido)
router.get('/api/carrito/:usuario_id', carritoController.obtenerCarrito);

// Agregar una obra al carrito
router.post('/api/carrito', carritoController.agregarAlCarrito);

// Eliminar una obra del carrito
router.delete('/api/carrito', carritoController.eliminarDelCarrito);

module.exports = router;
