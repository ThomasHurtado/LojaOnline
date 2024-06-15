const Cart = require('../models/Cart')
const User = require('../models/User')
const Product = require('../models/Product')
const Sale = require('../models/Sale')
const mongoose = require('mongoose');

const check_token = require('../helpers/check-token')

module.exports = class SaleControllers{

    static async createSale(req, res){

        const id = req.params.id
        let cart
        let user
        const userId = req.id

        try {
            user = await User.findById(req.id)
        } catch (error) {
            return res.status(400).json({ message: 'User not found' })
        }

        try {

            cart = await Cart.findById(id)

        } catch (error) {
            return res.status(404).json({ message: 'Cart not found' })
        }

        if(parseFloat(cart.price) > parseFloat(user.money)){
            return res.status(400).json({ message: 'Voce não possue dinheiro suficiente' })
        }

        user.money = parseFloat(user.money) - parseFloat(cart.price)

        const cartItems = cart.items;
        const cartItemsCopy = cartItems.slice()

        const sale = new Sale({
            buyer: {
                _id: userId,
            },
            items: cartItemsCopy
        })

        try {

            for (const item of cartItems) {
                const product = await Product.findById(item.product);
                
                if(item.quantity > product.amount){
                    return res.status(400).json({ message: `${product.name} possue apenas ${product.amount} unidade(s) em estoque` })
                }
            }

            for (const item of cartItems) {
                const product = await Product.findById(item.product);
                product.amount -= item.quantity
                await Product.findOneAndUpdate(item.product, product)
            }
            
            
        } catch (error) {
            console.log(error);
        }
        try {
            
            await User.findByIdAndUpdate(req.id, user)
            await sale.save()
            res.status(200).json({message: "Sua compra foi faturada!"})

        } catch (error) {
            res.status(500).json({ message: 'Erro ao faturar compra' })
        }
    }
}