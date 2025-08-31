const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const connectDB = require('./config/db');

const apiRoutes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(bodyParser.json());

// Rutas versionadas
app.use('/api/v1', apiRoutes);

// Conexión a MongoDB Atlas
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en puerto ${PORT}`);
    });
});
