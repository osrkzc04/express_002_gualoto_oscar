CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    name VARCHAR(100) NOT NULL,
    stock INT NOT NULL,
    sku VARCHAR(50) UNIQUE NOT NULL
);

INSERT INTO products (description, price, name, stock, sku) VALUES
('Smartphone with 6.5-inch display', 299.99, 'Smartphone X1', 50, 'SKU12345'),
('Wireless headphones with noise cancellation', 99.99, 'Headphones Y2', 100, 'SKU67890'),
('4K Ultra HD Smart TV', 499.99, 'TV Z3', 30, 'SKU54321');