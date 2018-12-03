'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();

// conecta ao banco
mongoose.connect('mongodb://localhost:27017/ApiProdutosDB');

// Carrega os Models
const Produto = require('./models/Produto');


// carrega as rotass
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// Rotas
app.use('/', indexRoute);
app.use('/api/produto', productRoute);

module.exports = app;