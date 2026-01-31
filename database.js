const {Sequelize} = require('sequelize');


const sequelize = new Sequelize('products_db', 'postgres', 'postgres', {
    host: 'localhost',
    port: 5437,
    dialect: 'postgres',
    logging: true,
});

sequelize.authenticate()
    .then(() => {
        console.log('Conexión establecida con éxito.');
    })
    .catch(err => {
        console.error('Error al conectar con la base de datos:', err);
    });


module.exports = sequelize;