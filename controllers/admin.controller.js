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
