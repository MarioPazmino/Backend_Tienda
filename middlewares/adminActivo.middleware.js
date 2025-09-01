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
  // Verificar fecha de expiración
  if (admin.fechaExpiracion && new Date(admin.fechaExpiracion) < new Date()) {
    // Desactivar automáticamente si expiró
    if (admin.activo) {
      admin.activo = false;
      await admin.save();
    }
    return res.status(403).json({ error: 'Tu licencia ha expirado. Contacta al superadmin para renovarla.' });
  }
  next();
};
