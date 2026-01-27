const express = require('express');
const router = express.Router();

const productService = require('../services/product-service');

// Obtener todos los productos
router.get('/', (req, res) => {
    const result = productService.getAllProducts();
    res.json(result);
});

// Obtener un producto por ID
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = productService.getProductById(id);
    if (product) {
        res.json(product);
    }
    else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
});

// Crear un nuevo producto
router.post('/', (req, res) => {
    const newProduct = productService.createProduct(req.body);
    res.status(201).json(newProduct);
});

// Actualizar un producto existente
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedProduct = productService.updateProduct(id, req.body);
    if (updatedProduct) {
        res.json(updatedProduct);
    }
    else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
});

// Eliminar un producto por ID
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const deletedProduct = productService.deleteProduct(id);
    if (deletedProduct) {
        res.json(deletedProduct);
    }
    else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
});

module.exports = router;