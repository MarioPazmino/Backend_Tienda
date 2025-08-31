const express = require('express');
const router = express.Router();


const clickRoutes = require('./v1/click.routes');
const productRoutes = require('./v1/product.routes');

router.use('/products', productRoutes);
router.use('/clicks', clickRoutes);

module.exports = router;
