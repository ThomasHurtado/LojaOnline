const mongoose = require('mongoose')
const { Schema } = mongoose

const Product = mongoose.model(
    'Product',
    new Schema({
        name: {
            type: String,
            required: true
        },
        brand: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true 
        },
        available: {
            type: Boolean,
            default: true 
        },

        owner: Object,

    },
    {timestamps: true},
    ),
)

module.exports = Product