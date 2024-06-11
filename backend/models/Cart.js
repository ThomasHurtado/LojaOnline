const mongoose = require('mongoose')
const { Schema } = mongoose

const cartItemSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 1 } // A quantidade padrão é 1
});

const CartSchema = new Schema({
    price: { type: Number, default: 0 },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    items: [cartItemSchema] // Array de itens do carrinho
}, { timestamps: true });

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart