const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product)
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: 'Um produto com este nome ja existe.', error: err.message});
        }
        res.status(400).json({ message: 'Erro ao criar produto', error: err.message});
    }
});

router.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao obter produtos', error: err.message});
    }
});

router.get('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
             return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.status(200).json(product);
    } catch (err) {
         if (err.name === 'CastError') {
        return res.status(400).json({ message: 'ID de produto inválido', error: err.message });
    }
        res.status(500).json({ message: 'Erro ao obter produto por ID', error: err.message });
    }

});

router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado para atualização' });
    }
    res.status(200).json(product);
  } catch (err) {
    if (err.name === 'ValidationError') { // Erros de validação do schema
      return res.status(400).json({ message: 'Erro de validação', error: err.message });
    }
    if (err.code === 11000) { // Erro de chave duplicada (nome único)
      return res.status(400).json({ message: 'Um produto com este nome já existe.', error: err.message });
    }
    res.status(500).json({ message: 'Erro ao atualizar produto', error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado para exclusão' });
    }
    res.status(200).json({ message: 'Produto excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao excluir produto', error: err.message });
  }
});

app.get('/api/cart', async (req, res) => {
    try {
        const cart = await Cart.findOne().populate('items'); 
        if (!cart) {
            return res.status(200).json({ items: [] });
        }
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar o carrinho.', error: err });
    }
});

module.exports = router;