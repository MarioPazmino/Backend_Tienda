/**
 * @swagger
 * /admin/change-password:
 *   post:
 *     summary: Cambiar la contraseña del administrador autenticado
 *     tags: [Administradores]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *                 minLength: 6
 *     responses:
 *       200:
 *         description: Contraseña actualizada correctamente
 *       400:
 *         description: Error de validación
 */
router.post('/change-password', auth, adminController.changePassword);
router.post(
	'/change-password',
	auth,
	[
		body('newPassword')
			.isLength({ min: 6 })
			.withMessage('La nueva contraseña debe tener al menos 6 caracteres.')
	],
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		next();
	},
	adminController.changePassword
);
const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/admin.controller');


const { body, validationResult } = require('express-validator');
const auth = require('../../middlewares/auth.middleware');


/**
 * @swagger
 * tags:
 *   name: Administradores
 *   description: Endpoints para gestión de administradores
 */

/**
 * @swagger
 * /admin/register:
 *   post:
 *     summary: Crear un nuevo administrador (solo admin autenticado)
 *     tags: [Administradores]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Administrador creado
 *       400:
 *         description: Error de validación
 */
router.post('/register', auth, adminController.register);

/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: Iniciar sesión como administrador
 *     tags: [Administradores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login exitoso, retorna token JWT
 *       401:
 *         description: Credenciales inválidas
 */
router.post(
	'/login',
	[
		body('username').notEmpty().withMessage('El usuario es requerido'),
		body('password').notEmpty().withMessage('La contraseña es requerida')
	],
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		next();
	},
	adminController.login
);

module.exports = router;
