class ProductRepository {

    constructor() {
        this.productos = [
            { id: 1, nombre: 'Producto A', precio: 100, stock: 10, sku: 'A001' },
            { id: 2, nombre: 'Producto B', precio: 200, stock: 5, sku: 'B002' },
            { id: 3, nombre: 'Producto C', precio: 300, stock: 8, sku: 'C003' },
            { id: 4, nombre: 'Producto D', precio: 150, stock: 20, sku: 'D004' },
            { id: 5, nombre: 'Producto E', precio: 250, stock: 15, sku: 'E005' },
            { id: 6, nombre: 'Producto F', precio: 350, stock: 12, sku: 'F006' },
        ];
    }

    findAll() {
        return this.productos;
    }

    findById(id) {
        return this.productos.find(producto => producto.id === id);
    }

    create(producto) {
        const newProducto = {
            id: this.productos.length + 1,
            ...producto
        };
        this.productos.push(newProducto);
        return newProducto;
    }

    update(id, productoActualizado) {
        const index = this.productos.findIndex(producto => producto.id === id);
        if (index !== -1) {
            this.productos[index] = { id, ...productoActualizado };
            return this.productos[index];
        }
        return null;
    }

    deleteById(id) {
        const index = this.productos.findIndex(producto => producto.id === id);
        if (index !== -1) {
            const deletedProducto = this.productos.splice(index, 1);
            return deletedProducto[0];
        }
        return null;
    }
}

module.exports = new ProductRepository();
