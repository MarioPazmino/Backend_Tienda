const express = require('express');
const router = express.Router();

const auth = require('../../middlewares/auth.middleware');

router.get('/', productController.getAll);
router.get('/:id', productController.getById);
router.post('/', auth, productController.create);
router.put('/:id', auth, productController.update);
router.delete('/:id', auth, productController.delete);

module.exports = router;
