require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
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
    res.send('API da Digital Shop funcionando!')
});

app.get('/api/products', (req, res) => {
    res.json([
        { id: '1', name: 'Ebook de Programação', price: 29.99 },
        { id: '2', name: 'Curso de React Avançado', price: 199.90 }
    ]);
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;