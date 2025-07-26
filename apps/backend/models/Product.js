const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    imageUrl: {
        type: String,    
    },
    category: {
        type: String,
        required: true,
        enum: ['Ebook', 'Course', 'Software', 'Template', 'Audio', 'Video', 'Other']
    },
    stock: {
        type: Number,
        default: 1,
        min: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', productSchema);