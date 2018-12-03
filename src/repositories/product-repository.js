'use strict'

const mongoose = require('mongoose');
const Produto = mongoose.model('Produto');


exports.get = async () => {
    const res = await Produto.find({});
    return res;
}

exports.getById = async (id) => {
    const res = await Produto.findById(id);
    return res;
}

exports.create = async (data) => {
    try {
        data.dataEntrada = new Date();
        var produto = new Produto(data);
        await produto.save();
    }
    catch (e) {
        console.log(e)
    }
}

exports.update = async (id, data) => {
    await Produto
        .findByIdAndUpdate(id, {
            $set: {
                codigo: data.codigo,
                titulo: data.title,
                descricao: data.description,
                valor: data.price,
                quantidade: data.quantidade
            }
        });
}

exports.delete = async (id) => {
    await Produto
        .findOneAndRemove(id);
}