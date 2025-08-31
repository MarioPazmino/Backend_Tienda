module.exports = (req, res, next) => {
    if (!req.admin || req.admin.rol !== 'superadmin') {
        return res.status(403).json({ error: 'Acceso solo para superadmin' });
    }
    next();
};
