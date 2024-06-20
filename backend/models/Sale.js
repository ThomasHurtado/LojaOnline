const mongoose = require('mongoose')
const { Schema } = mongoose

const SaleItemSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 1 } // A quantidade padrão é 1
    
});

const SaleSchema = new Schema({
    buyer: { type: Schema.Types.ObjectId, ref: 'User' },
    items: [SaleItemSchema] // Array de itens do carrinho
}, { timestamps: true });

const Sale = mongoose.model('Sale', SaleSchema);

module.exports = Sale