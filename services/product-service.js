const productRepository = require('../repositories/product-repository');

class ProductService {


    getAllProducts() {
        const products = productRepository.findAll();
        return {
            products,
            total : products.length
        };
    }

    getProductById(id) {
        return productRepository.findById(id);
    }

    createProduct(product) {
        return productRepository.create(product);
    }

    updateProduct(id, product) {
        return productRepository.update(id, product);
    }

    deleteProduct(id) {
        return productRepository.deleteById(id);
    }
}
module.exports = new ProductService();