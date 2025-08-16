require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const Product = require('./models/Product');
const Cart = require('./models/Cart')

const app = express();
const PORT = process.env.PORT || 5000;


const MONGO_URI = process.env.MONGO_URI;

const corsOptions = {
  origin: 'https://digital-shop-frontend.vercel.app', 
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));
app.use(express.json());

if(MONGO_URI) {
    mongoose.connect(MONGO_URI)
        .then(() => console.log('MongoDB conectado com sucesso!'))
        .catch(err => console.error('Erro de conexão com MongoDB', err));
} else {
    console.error('MONGO_URI não definida. Conexão com o MongoDB ignorada.');
}

const checkAndSeedProducts = async () => {
    try {
        const count = await Product.countDocuments();
        if (count === 0) {
            console.log('Nenhum produto encontrado. Populando o banco de dados...');
            const initialProducts = [
                {
                    name: 'Laptop Dell XPS 15',
                    description: 'Potente e elegante, ideal para produtividade e criatividade. Processador Intel Core i7, 16GB RAM, 512GB SSD.',
                    price: 15000.00,
                    imageUrl: 'https://images.unsplash.com/photo-1593642702749-bf216070e4a2?q=80&w=1000&auto=format&fit=crop',
                    category: 'Eletrônicos',
                },
                {
                    name: 'Headphones Sony WH-1000XM5',
                    description: 'Cancelamento de ruído líder de mercado e áudio de alta resolução. Conforto e tecnologia de ponta.',
                    price: 2000.00,
                    imageUrl: 'https://images.unsplash.com/photo-1596464521473-b3c072b212f3?q=80&w=1000&auto=format&fit=crop',
                    category: 'Acessórios',
                },
                {
                    name: 'Mouse Gamer Logitech G502',
                    description: 'Mouse com 11 botões programáveis e sensor óptico de alta precisão. Perfeito para gamers.',
                    price: 350.00,
                    imageUrl: 'https://images.unsplash.com/photo-1615671172159-994c657a70a8?q=80&w=1000&auto=format&fit=crop',
                    category: 'Acessórios',
                },
                {
                    name: 'Câmera Canon EOS R5',
                    description: 'Câmera mirrorless full-frame para fotógrafos e videomakers profissionais. Gravação em 8K, 45MP.',
                    price: 25000.00,
                    imageUrl: 'https://images.unsplash.com/photo-1599388365612-421731698a9d?q=80&w=1000&auto=format&fit=crop',
                    category: 'Eletrônicos',
                },
                {
                    name: 'Teclado Mecânico HyperX Alloy',
                    description: 'Teclado com switches mecânicos e iluminação RGB customizável. Durabilidade e alta performance.',
                    price: 600.00,
                    imageUrl: 'https://images.unsplash.com/photo-1616781299905-1a3b5a9b9a9d?q=80&w=1000&auto=format&fit=crop',
                    category: 'Acessórios',
                },
                {
                    name: 'Smartwatch Apple Watch Series 7',
                    description: 'Tela maior, mais resistente e com novos recursos de saúde e bem-estar. Conectividade completa.',
                    price: 3000.00,
                    imageUrl: 'https://images.unsplash.com/photo-1563852924-f7a9f8f2b3e8?q=80&w=1000&auto=format&fit=crop',
                    category: 'Eletrônicos',
                },
            ];
            await Product.insertMany(initialProducts);
            console.log('Produtos iniciais populados com sucesso!');
        } else {
            console.log(`O banco de dados já contém ${count} produtos.`);
        }
    } catch (err) {
        console.error('Erro ao popular produtos:', err);
    }
};

app.get('/', (req, res) => {
    res.send('API da Digital Shop esta funcionando!')
});

app.use('/api/products', productRoutes);


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