const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const connectDB = require('./config/db');


const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Backend Tienda API',
            version: '1.0.0',
            description: 'Documentación de la API para el sistema de ventas de productos de seguridad.'
        },
        servers: [
            { url: 'http://localhost:' + (process.env.PORT || 3000) + '/api/v1' }
        ]
    },
    apis: ['./routes/**/*.js', './models/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

const morgan = require('morgan');
const logger = require('./config/logger');
const apiRoutes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;


// Middlewares
app.use(bodyParser.json());
app.use(morgan('combined', { stream: { write: msg => logger.info(msg.trim()) } }));


// Documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Rutas versionadas
app.use('/api/v1', apiRoutes);

// Manejo de errores global
app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(err.status || 500).json({
        error: err.message || 'Error interno del servidor'
    });
});

// Conexión a MongoDB Atlas
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en puerto ${PORT}`);
    });
});
