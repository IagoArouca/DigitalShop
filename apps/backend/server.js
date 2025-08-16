const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const Product = require('./models/Product');
const Cart = require('./models/Cart');

const app = express();

const corsOptions = {
    origin: 'https://digital-shop-frontend.vercel.app',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Conectado ao MongoDB Atlas!');
        checkAndSeedProducts();
    })
    .catch(err => console.error('Erro de conexão com o MongoDB:', err));

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
    res.send('Servidor do Digital Shop está rodando!');
});


app.get('/api/products', async (req, res) => {
    try {
        const { query } = req.query; 
        let products;

        if (query) {
           
            products = await Product.find({ 
                name: { $regex: query, $options: 'i' } 
            });
        } else {
            products = await Product.find();
        }

        res.json(products);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar produtos.', error: err });
    }
});

app.get('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado.' });
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar o produto.', error: err });
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

app.post('/api/cart/add', async (req, res) => {
    try {
        const productToAdd = req.body;
        if (!productToAdd || !productToAdd._id) {
            return res.status(400).json({ message: 'Dados do produto inválidos.' });
        }
        
        let cart = await Cart.findOne();
        if (!cart) {
            cart = await Cart.create({ items: [] });
        }
        
        cart.items.push(productToAdd);
        await cart.save();
        
        res.status(200).json({ message: 'Produto adicionado ao carrinho com sucesso!' });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao adicionar produto ao carrinho.', error: err });
    }
});

app.post('/api/cart/checkout', async (req, res) => {
    try {
        const updatedCart = await Cart.findOneAndUpdate(
            {},
            { items: [] },
            { new: true }
        );

        if (!updatedCart) {
             return res.status(404).json({ message: 'Carrinho não encontrado.' });
        }

        res.status(200).json({ message: 'Carrinho esvaziado com sucesso.' });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao esvaziar o carrinho.', error: err });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});