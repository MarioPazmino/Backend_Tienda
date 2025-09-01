// Middleware para bloquear acciones de edición si el admin no está activo
const Admin = require('../models/admin.model');

module.exports = async (req, res, next) => {
  // Permitir siempre a superadmin
  if (req.admin && req.admin.rol === 'superadmin') return next();

  // Buscar admin en DB para obtener el estado actualizado
  const admin = await Admin.findById(req.admin.id);
  if (!admin || !admin.activo) {
    return res.status(403).json({ error: 'Tu cuenta está deshabilitada. Contacta al superadmin.' });
  }
  next();
};
