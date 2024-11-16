// index.js
const express = require('express');
const connectToDatabase = require('./config/dbConfig');

const app = express();
app.use(express.json());

// Conectar ao banco de dados
connectToDatabase();

// Importar e utilizar o authController
require('./controllers/productController')(app)
require('./controllers/authController')(app)
require('./controllers/categoryController')(app)


app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
