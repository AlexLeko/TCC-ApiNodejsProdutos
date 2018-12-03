'use strict'

const mongoose = require('mongoose');
const Produto = mongoose.model('Produto');
const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/product-repository');

exports.get = async (req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: "Falha ao listar o produto",
            data: e
        });
    }
}

// exports.getById = async (req, res, next) => {
//     try {
//         var data = await repository.getById(req.params.id);
//         res.status(200).send(data);
//     } catch (e) {
//         res.status(500).send({
//             message: "Falha ao listar o produto",
//             data: e
//         });
//     }
// }

exports.post = async (req, res, next) => {
    let contract = new ValidationContract();
    contract.greaterThan(req.body.codigo, 'O código é obrigatório e deve ser maior que zero.')
    contract.hasMinLen(req.body.titulo, 3, 'O título deve conter pelo menos 3 caracteres.')
    contract.greaterThan(req.body.valor, 'O valor é obrigatório e deve ser maior que zero.')
    
    // se os dados forem validos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await repository.create(req.body);
        res.status(201).send({
            message: "Produto cadastrado com sucesso!"
        });
    } catch (e) {
        res.status(500).send({
            message: "Falha na requisição de criar produto",
            data: e
        });
    }
};

exports.put = async (req, res, next) => {
    try {
        await repository.update(req.params.id, req.body);
        res.status(200).send({
            message: "Produto atualizado com sucesso!"
        });
    } catch (e) {
        res.status(500).send({
            message: "Falha ao atualizar o produto",
            data: e
        });
    }
};

exports.delete = async (req, res, next) => {
    try {
        await repository.delete(req.body.id);
        res.status(200).send({
            message: "Produto removido com sucesso!"
        });
    } catch (e) {
        res.status(500).send({
            message: "Falha ao remover o produto",
            data: e
        });
    }
};