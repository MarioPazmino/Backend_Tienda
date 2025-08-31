const express = require('express');
const router = express.Router();

const productRoutes = require('./v1/product.routes');
const serviceRoutes = require('./v1/service.routes');

router.use('/products', productRoutes);
router.use('/services', serviceRoutes);

module.exports = router;
