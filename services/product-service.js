const productRepository = require('../repositories/product-repository');

class ProductService {

    async getAllProducts() {
        const products = await productRepository.findAll();
        return { success: true, data: products };
    }

    async getProductById(id) {
        const product = await productRepository.findById(id);
        if (!product) {
            return { success: false, message: 'Producto no encontrado', status: 404 };
        }
        return { success: true, data: product };
    }

    async findBySku(sku) {
        const product = await productRepository.findBySku(sku);
        if (!product) {
            return { success: false, message: 'Producto no encontrado', status: 404 };
        }
        return { success: true, data: product };
    }

    async findProductBetweenExistence(min, max) {
        if (min > max) {
            return { success: false, message: 'El valor mínimo no puede ser mayor al máximo', status: 400 };
        }
        const products = await productRepository.findProductBetweenExistence(min, max);
        return { success: true, data: products };
    }

    async createProduct(product) {
        const { name, description, price, stock, sku } = product;
        if (!name || !description || price == null || stock == null || !sku) {
            return { success: false, message: 'Todos los campos son requeridos (name, description, price, stock, sku)', status: 400 };
        }
        const existingSku = await productRepository.findBySku(sku);
        if (existingSku) {
            return { success: false, message: 'Ya existe un producto con ese SKU', status: 409 };
        }
        const newProduct = await productRepository.create(product);
        return { success: true, data: newProduct, status: 201 };
    }

    async updateProduct(id, product) {
        const existingProduct = await productRepository.findById(id);
        if (!existingProduct) {
            return { success: false, message: 'Producto no encontrado', status: 404 };
        }
        const { name, description, price, stock, sku } = product;
        if (!name || !description || price == null || stock == null || !sku) {
            return { success: false, message: 'Todos los campos son requeridos (name, description, price, stock, sku)', status: 400 };
        }
        if (sku !== existingProduct.sku) {
            const existingSku = await productRepository.findBySku(sku);
            if (existingSku) {
                return { success: false, message: 'Ya existe un producto con ese SKU', status: 409 };
            }
        }
        const updatedProduct = await productRepository.update(id, product);
        return { success: true, data: updatedProduct };
    }

    async deleteProduct(id) {
        const existingProduct = await productRepository.findById(id);
        if (!existingProduct) {
            return { success: false, message: 'Producto no encontrado', status: 404 };
        }
        const deletedProduct = await productRepository.deleteById(id);
        return { success: true, data: deletedProduct };
    }
}

module.exports = new ProductService();
