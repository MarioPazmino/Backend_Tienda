const express = require('express');
const router = express.Router();



const adminRoutes = require('./v1/admin.routes');
const clickRoutes = require('./v1/click.routes');
const productRoutes = require('./v1/product.routes');

router.use('/admin', adminRoutes);
router.use('/products', productRoutes);
router.use('/clicks', clickRoutes);

module.exports = router;
