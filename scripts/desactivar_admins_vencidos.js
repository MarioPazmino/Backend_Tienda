require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('../models/admin.model');
const connectDB = require('../config/db');

(async () => {
  await connectDB();
  const hoy = new Date();
  const result = await Admin.updateMany(
    {
      rol: 'admin',
      activo: true,
      fechaExpiracion: { $lte: hoy }
    },
    { $set: { activo: false } }
  );
  console.log(`Admins desactivados por vencimiento: ${result.modifiedCount}`);
  mongoose.connection.close();
})();
