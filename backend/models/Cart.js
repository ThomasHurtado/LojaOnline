const mongoose = require('mongoose')
const { Schema } = mongoose

const Cart = mongoose.model(
    'Cart',
    new Schema({
        price: {
            type: Number,
            required: true 
        },

        owner: Object,
        
        items: Array,

    },
    {timestamps: true},
    ),
)

module.exports = Cart