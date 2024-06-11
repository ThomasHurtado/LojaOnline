const Cart = require('../models/Cart')
const User = require('../models/User')
const Product = require('../models/Product')
const mongoose = require('mongoose');

const check_token = require('../helpers/check-token')

module.exports = class ProductController{

    static async addProductToCart(req,res){

        const id = req.params.id
        let user
        let product

        try {
            user = await User.findById(req.id)
        } catch (error) {
            return res.status(401).json({message: 'Unauthorized access'})
        }

        try {
            product = await Product.findById(id)
        } catch (error) {
            return res.status(404).json({message: 'Product not found'})
        }
  
        try {

            const cart = await Cart.findOne({owner: user._id})
        
            // Verifique se o produto já está no carrinho
            const index = cart.items.findIndex(item => item.product.toString() === id)
            
            if (index !== -1) {
            // Se o produto já estiver no carrinho, aumente a quantidade dele
            cart.items[index].quantity++;
            } else {
            // Se o produto não estiver no carrinho, adicione-o como um novo item
            cart.items.push({ product: id });
            }

            // Atualize o preço total do carrinho
            cart.price += product.price;

            await cart.save();
            
            res.json({message: 'Product added to cart successfully'})
        } catch (error) {
            res.status(400).json({message: 'Failed to add product to cart'})
            
        }
    }

    static async removeUnitFromCart(req,res){

        const id = req.params.id
        let user
        let product

        try {
            user = await User.findById(req.id)
        } catch (error) {
            return res.status(401).json({message: 'Unauthorized access'})
        }

        try {
            product = await Product.findById(id)
        } catch (error) {
            return res.status(404).json({message: 'Product not found'})
        }

        try {

            const cart = await Cart.findOne({owner: user._id})
        
            // Verifique se o produto já está no carrinho
            const index = cart.items.findIndex(item => item.product.toString() === id)

            if(cart.items[index].quantity > 1){
                cart.items[index].quantity--
                cart.price -= product.price
                }else{
                    cart.items.splice(index, 1)
                   

                }

            await cart.save();
            
            res.json({message: 'deu certo'})
        } catch (error) {
            res.status(400).json({message: 'Failed to remove product to cart'})
            
        }
    }
}