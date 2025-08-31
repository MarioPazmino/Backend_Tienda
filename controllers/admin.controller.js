exports.changePassword = async (req, res) => {
    try {
        const adminId = req.admin.id;
        const { newPassword } = req.body;
        if (!newPassword || newPassword.length < 6) {
            return res.status(400).json({ error: 'La nueva contraseña debe tener al menos 6 caracteres.' });
        }
        await adminService.changePassword(adminId, newPassword);
        res.json({ message: 'Contraseña actualizada correctamente.' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
const adminService = require('../services/admin.service');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const admin = await adminService.register({ username, password });
        res.status(201).json({ message: 'Administrador registrado', admin: { username: admin.username, id: admin._id } });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const admin = await adminService.login(username, password);
        if (!admin) return res.status(401).json({ error: 'Credenciales inválidas' });
        const token = jwt.sign({ id: admin._id, username: admin.username }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
