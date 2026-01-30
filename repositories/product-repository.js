const {Pool} = require('pg');


class ProductRepository {

    constructor() {
        this.pool = new Pool({
            user: 'postgres',
            host: 'localhost',
            database: 'products_db',
            password: 'postgres',
            port: 5437,
        });
    }

    async findAll() {
        const res = await this.pool.query('SELECT * FROM products');
        return res.rows;
    }

    async findById(id) {
        const res = await this.pool.query('SELECT * FROM products WHERE id = $1', [id]);
        return res.rows[0];
    }

    async findBySku(sku) {
        const res = await this.pool.query('SELECT * FROM products WHERE sku = $1', [sku]);
        return res.rows[0];
    }

    async findProductBetweenExistence(minExistence, maxExistence){
        const res = await this.pool.query('SELECT * FROM products WHERE stock BETWEEN $1 AND $2',[minExistence,maxExistence]);
        return res.rows
    }

    async create(producto) {
        const { name, description, price, stock, sku } = producto;
        const res = await this.pool.query(
            'INSERT INTO products (name, description, price, stock, sku) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [name, description, price, stock, sku]
        );
        return res.rows[0];
    }

    async update(id, productoActualizado) {
        const { name, description, price, stock, sku } = productoActualizado;
        const res = await this.pool.query(
            'UPDATE products SET name = $1, description = $2, price = $3, stock = $4, sku = $5 WHERE id = $6 RETURNING *',
            [name, description, price, stock, sku, id]
        );
        return res.rows[0];
    }

    async deleteById(id) {
        const res = await this.pool.query(
            'DELETE FROM products WHERE id = $1 RETURNING *',
            [id]
        );
        return res.rows[0];
    }
}

module.exports = new ProductRepository();
