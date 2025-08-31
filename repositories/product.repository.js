const Product = require('../models/product.model');

class ProductRepository {
    async findAll() {
        return Product.find();
    }
    async findById(id) {
        return Product.findById(id);
    }
    async create(data) {
        return Product.create(data);
    }
    async update(id, data) {
        return Product.findByIdAndUpdate(id, data, { new: true });
    }
    async delete(id) {
        return Product.findByIdAndDelete(id);
    }
}

module.exports = new ProductRepository();
