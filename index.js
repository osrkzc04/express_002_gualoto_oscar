const express = require('express');
const app = express();
const port = 3000;

const productRouter = require('./routes/router-product');

app.use('/api/products', productRouter);

app.get('/', (req, res) => {
    res.send('Hola Mundo - Express Server');
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
