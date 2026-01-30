const express = require('express');
const router = express.Router();
const productService = require('../services/product-service');

// Obtener todos los productos
router.get('/', async (req, res) => {
    const result = await productService.getAllProducts();
    res.json(result.data);
});

// Obtener productos por rango de existencia
router.get('/between-existence/:min/:max', async (req, res) => {
    const min = parseInt(req.params.min);
    const max = parseInt(req.params.max);
    const result = await productService.findProductBetweenExistence(min, max);
    res.status(result.status || 200).json(result.success ? result.data : { message: result.message });
});

// Obtener un producto por SKU
router.get('/sku/:sku', async (req, res) => {
    const result = await productService.findBySku(req.params.sku);
    res.status(result.status || 200).json(result.success ? result.data : { message: result.message });
});

// Obtener un producto por ID
router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await productService.getProductById(id);
    res.status(result.status || 200).json(result.success ? result.data : { message: result.message });
});

// Crear un nuevo producto
router.post('/', async (req, res) => {
    const result = await productService.createProduct(req.body);
    res.status(result.status || 200).json(result.success ? result.data : { message: result.message });
});

// Actualizar un producto existente
router.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await productService.updateProduct(id, req.body);
    res.status(result.status || 200).json(result.success ? result.data : { message: result.message });
});

// Eliminar un producto por ID
router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await productService.deleteProduct(id);
    res.status(result.status || 200).json(result.success ? result.data : { message: result.message });
});

module.exports = router;
