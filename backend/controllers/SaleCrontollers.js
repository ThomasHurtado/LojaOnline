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

                const money = parseFloat(item.quantity)*parseFloat(product.price)*0.95
                const sellerId = product.owner._id
                const seller = await User.findById(sellerId)
                seller.money += money

                await User.findByIdAndUpdate(sellerId, seller)
                await Product.findOneAndUpdate(item.product, product)
            }
            
            
        } catch (error) {
            console.log(error);
        }

        cart.items.splice(0, cart.items.length)
        cart.price = 0

        try {
            
            await User.findByIdAndUpdate(req.id, user)
            await sale.save()
            await Cart.findByIdAndUpdate(cart._id, cart)
            res.status(200).json({message: "Sua compra foi faturada!"})

        } catch (error) {
            res.status(500).json({ message: 'Erro ao faturar compra' })
        }
    }

    static async userSales(req, res){
        const userId = req.id
        const sales = await Sale.find({buyer: userId})

        try {
            

            let productsWithQuantity = []
            const teste = 0

            for (const sale of sales) {
                for (const item of sale.items) {
                    productsWithQuantity.push({
                        productId: item.product,
                        quantity: item.quantity,
                        date: sale.createdAt
                    });
                }
            }
            
            res.status(200).json({ productsWithQuantity: productsWithQuantity, })
        } catch (error) {
            res.status(400).json({message: 'Nao deu certo'})
            console.log(error)
        }

    }

    static async userPurchases(req, res){
        const userId = req.id

        const user = await User.findById(userId)

        const products = await Product.find({'owner._id':user._id})

        if (products.length === 0) {
            return res.status(404).json({ message: 'Nenhum produto encontrado' });
        }

        let purchases = []

        for (const product of products) {
            const sales = await Sale.find({ "items.product": product._id });

            for (const sale of sales) {
                for (const item of sale.items) {
                    if (item.product.equals(product._id)) {
                        purchases.push({
                            productId: item.product,
                            quantity: item.quantity,
                            date: sale.createdAt,
                            buyer: sale.buyer
                        });
                    }
                }
            }
        }

        try {
            res.status(200).json({ purchases: purchases, })
        } catch (error) {
            res.status(400).json({message: 'Nao deu certo'})
            console.log(error)
        }
    }
}