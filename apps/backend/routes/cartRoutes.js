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