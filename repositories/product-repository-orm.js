const {Pool} = require('pg');
const ProductModel = require('../repositories/models/product-model');
const { or } = require('sequelize');

class ProductRepositoryOrm {

    async findAll() {
        const products = await ProductModel.findAll({       
            order: [['id', 'ASC']]
        });
        return products;
    }

    async findById(id) {
        const product = await ProductModel.findByPk(id);
        if (!product) {
            return null;
        }
        return product.toJSON();
    }

    async findBySku(sku) {
        const product = await ProductModel.findOne({ where: { sku } });
        if (!product) {
            return null;
        }
        return product.toJSON();
    }

    // async findProductBetweenExistence(minExistence, maxExistence){
    //     const res = await this.pool.query('SELECT * FROM products WHERE stock BETWEEN $1 AND $2',[minExistence,maxExistence]);
    //     return res.rows
    // }

    // async create(producto) {
    //     const { name, description, price, stock, sku } = producto;
    //     const res = await this.pool.query(
    //         'INSERT INTO products (name, description, price, stock, sku) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    //         [name, description, price, stock, sku]
    //     );
    //     return res.rows[0];
    // }

    // async update(id, productoActualizado) {
    //     const { name, description, price, stock, sku } = productoActualizado;
    //     const res = await this.pool.query(
    //         'UPDATE products SET name = $1, description = $2, price = $3, stock = $4, sku = $5 WHERE id = $6 RETURNING *',
    //         [name, description, price, stock, sku, id]
    //     );
    //     return res.rows[0];
    // }

    // async deleteById(id) {
    //     const res = await this.pool.query(
    //         'DELETE FROM products WHERE id = $1 RETURNING *',
    //         [id]
    //     );
    //     return res.rows[0];
    // }
}

module.exports = new ProductRepositoryOrm();
