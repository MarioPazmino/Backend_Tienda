const express = require('express');
const router = express.Router();
const clickController = require('../../controllers/click.controller');

// Registrar un click (POST)
router.post('/', clickController.registerClick);

// Obtener todos los clicks (GET, solo para admin)
router.get('/', clickController.getStats);

// Estadísticas por producto
router.get('/by-product', clickController.countByProduct);

// Estadísticas por servicio
router.get('/by-service', clickController.countByService);

module.exports = router;
