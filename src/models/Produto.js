'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    codigo: {
        type: Number,
        required: [true, 'O código é obrigatório.'],
    },
    titulo: {
        type: String,
        required: [true, 'O Title é obrigatório.'],
        trim: true
    },
    descricao: {
        type: String,
    },
    valor: {
        type: Number,
        required: [true, 'O valor é obrigatório.'],
    },
    quantidade: {
        type: Number
    },
    dataEntrada: {
        type: Date
    }    
 });

module.exports = mongoose.model('Produto', schema);