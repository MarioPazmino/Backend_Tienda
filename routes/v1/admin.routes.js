const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/admin.controller');

const auth = require('../../middlewares/auth.middleware');

// Solo un admin autenticado puede crear nuevos administradores
router.post('/register', auth, adminController.register);
router.post('/login', adminController.login);

module.exports = router;
