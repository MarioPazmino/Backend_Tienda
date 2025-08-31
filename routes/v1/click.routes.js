const express = require('express');
const router = express.Router();
const clickController = require('../../controllers/click.controller');


/**
 * @swagger
 * tags:
 *   name: Clicks
 *   description: Endpoints para registrar y consultar clics en productos
 */

/**
 * @swagger
 * /clicks:
 *   post:
 *     summary: Registrar un clic en un producto
 *     tags: [Clicks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: ID del producto
 *     responses:
 *       201:
 *         description: Clic registrado
 *       400:
 *         description: Error de validación
 */
router.post('/', clickController.registerClick);


/**
 * @swagger
 * /clicks:
 *   get:
 *     summary: Obtener todos los clics (solo admin)
 *     tags: [Clicks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de clics
 */
router.get('/', clickController.getStats);


/**
 * @swagger
 * /clicks/by-product:
 *   get:
 *     summary: Obtener estadísticas de clics por producto
 *     tags: [Clicks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Estadísticas por producto
 */
router.get('/by-product', clickController.countByProduct);



module.exports = router;
