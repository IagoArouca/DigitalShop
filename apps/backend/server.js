require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

let cart = [];
const MONGO_URI = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());

if(MONGO_URI) {
    mongoose.connect(MONGO_URI)
        .then(() => console.log('MongoDB conectado com sucesso!'))
        .catch(err => console.error('Erro de conexão com MongoDB', err));
} else {
    console.error('MONGO_URI não definida. Conexão com o MongoDB ignorada.');
}

app.get('/', (req, res) => {
    res.send('API da Digital Shop esta funcionando!')
});

app.use('/api/products', productRoutes);

app.get('/api/cart', (req, res) => {
    res.status(200).json(cart)
})

app.post('/api/cart/add', (req, res) => {
    const productToAdd = req.body;
    if (!productToAdd || !productToAdd._id) {
        return res.status(400).json({ message: "Produto inválido." });
    }
    cart.push(productToAdd);
    res.status(200).json({ message: "Produto adicionado ao carrinho com sucesso.", carItem: productToAdd });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`); 
});

module.exports = app;