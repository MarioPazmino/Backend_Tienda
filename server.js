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
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const logger = require('./config/logger');
const apiRoutes = require('./routes');
const cron = require('node-cron');
const Admin = require('./models/admin.model');

const app = express();
const PORT = process.env.PORT || 3000;


// Middlewares
app.use(helmet());
app.use(cors({
    origin: ['http://localhost:5173'], // Cambia esto por el dominio de tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // 100 peticiones por IP
    message: 'Demasiadas peticiones, intenta más tarde.'
}));
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

// Tarea automática diaria para desactivar admins vencidos
cron.schedule('0 2 * * *', async () => {
  try {
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
    if (result.modifiedCount > 0) {
      logger.info(`Admins desactivados por vencimiento: ${result.modifiedCount}`);
    }
  } catch (err) {
    logger.error('Error en tarea cron de expiración de admins: ' + err.message);
  }
});
