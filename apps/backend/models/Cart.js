const mongoose = require('mongoose');
const Product = require('./Product')


const cartSchema = new mongoose.Schema({
    items: [Product.schema],
});

module.exports = mongoose.model('Cart', cartSchema)