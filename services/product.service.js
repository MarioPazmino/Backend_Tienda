const productRepository = require('../repositories/product.repository');

class ProductService {
    async getAllProducts() {
        return productRepository.findAll();
    }
    async getProductById(id) {
        return productRepository.findById(id);
    }
    async createProduct(data) {
        return productRepository.create(data);
    }
    async updateProduct(id, data) {
        return productRepository.update(id, data);
    }
    async deleteProduct(id) {
        return productRepository.delete(id);
    }
}

module.exports = new ProductService();
