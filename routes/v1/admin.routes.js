const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/admin.controller');

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
router.post('/login', adminController.login);

module.exports = router;
