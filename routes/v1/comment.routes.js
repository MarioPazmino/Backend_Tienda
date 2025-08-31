const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const commentStatsController = require('../../controllers/comment.stats.controller');
/**
 * @swagger
 * /comments/product/{productId}/stats:
 *   get:
 *     summary: Obtener estadísticas de calificaciones por estrellas de un producto
 *     tags: [Comentarios]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Estadísticas de calificaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                 promedio:
 *                   type: number
 *                 distribucion:
 *                   type: object
 *                   additionalProperties:
 *                     type: integer
 */
router.get('/product/:productId/stats', commentStatsController.getStatsByProduct);

/**
 * @swagger
 * tags:
 *   name: Comentarios
 *   description: Endpoints para comentarios de productos
 */

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Agregar un comentario a un producto
 *     tags: [Comentarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               nombre:
 *                 type: string
 *               calificacion:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               comentario:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comentario creado
 *       400:
 *         description: Error de validación
 */
router.post(
  '/',
  [
    body('productId').notEmpty().withMessage('El ID del producto es requerido'),
    body('nombre').notEmpty().withMessage('El nombre es requerido'),
    body('calificacion').isInt({ min: 1, max: 5 }).withMessage('La calificación debe ser entre 1 y 5'),
    body('comentario').notEmpty().withMessage('El comentario es requerido')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  commentController.create
);

/**
 * @swagger
 * /comments/product/{productId}:
 *   get:
 *     summary: Obtener comentarios de un producto con paginación
 *     tags: [Comentarios]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Cantidad por página
 *     responses:
 *       200:
 *         description: Lista de comentarios
 */
router.get('/product/:productId', commentController.getByProduct);

module.exports = router;
