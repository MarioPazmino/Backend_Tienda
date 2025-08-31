
const express = require('express');
const router = express.Router();

const { body, validationResult } = require('express-validator');
const productController = require('../../controllers/product.controller');
const auth = require('../../middlewares/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Productos
 *   description: Endpoints para gestión de productos
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de productos
 */
router.get('/', productController.getAll);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto encontrado
 *       404:
 *         description: Producto no encontrado
 */
router.get('/:id', productController.getById);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Crear un nuevo producto (solo admin)
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *               categoria:
 *                 type: string
 *               imagen:
 *                 type: string
 *               destacado:
 *                 type: boolean
 *               caracteristicas:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Producto creado
 *       400:
 *         description: Error de validación
 */
router.post(
	'/',
	auth,
		[
			body('name').notEmpty().withMessage('El nombre es requerido'),
			body('price').isNumeric().withMessage('El precio debe ser un número'),
			body('categoria').notEmpty().withMessage('La categoría es requerida'),
			body('imagen').optional().isURL().withMessage('La imagen debe ser una URL válida'),
			body('caracteristicas').optional().isArray().withMessage('Las características deben ser un array de strings')
		],
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		next();
	},
	productController.create
);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Actualizar un producto (solo admin)
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *               categoria:
 *                 type: string
 *               imagen:
 *                 type: string
 *               destacado:
 *                 type: boolean
 *               caracteristicas:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Producto actualizado
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Producto no encontrado
 */
router.put(
	'/:id',
	auth,
		[
			body('name').optional().notEmpty().withMessage('El nombre no puede estar vacío'),
			body('price').optional().isNumeric().withMessage('El precio debe ser un número'),
			body('categoria').optional().notEmpty().withMessage('La categoría no puede estar vacía'),
			body('imagen').optional().isURL().withMessage('La imagen debe ser una URL válida'),
			body('caracteristicas').optional().isArray().withMessage('Las características deben ser un array de strings')
		],
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		next();
	},
	productController.update
);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Eliminar un producto (solo admin)
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto eliminado
 *       404:
 *         description: Producto no encontrado
 */
router.delete('/:id', auth, productController.delete);

module.exports = router;
