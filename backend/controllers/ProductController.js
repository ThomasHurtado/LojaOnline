const User = require('../models/User')
const Product = require('../models/Product')


const getToken = require('../helpers/get-token')
const check_token = require('../helpers/check-token')

module.exports = class ProductController{

    static async register(req, res) {
        
        const { name, brand, description, amount, price } = req.body

        if(!name){
            res.status(422).json({ message: 'O nome do produto é obrigatório' })
            return
        }
        

        if(!brand){
            res.status(422).json({ message: 'A marca do produto é obrigatória'})
            return
        }

        if(!description){
            res.status(422).json({ message: 'A descrição do produto é obrigatória'})
            return
        }

        if(!amount){
            res.status(422).json({ message: 'A quantidade do produto é obrigatória'})
            return
        }

        if(!price){
            res.status(422).json({ message: 'O preço do produto é obrigatório'})
            return
        }

        const user = await User.findById(req.id)

        if(!user){
            res.status(404).json({ message: 'Usuário não encontrado' })
            return
        }

        const product = new Product({
            name: name,
            brand: brand,
            description: description,
            amount: amount,
            price: price,
            owner: {
                _id: user._id,
                name: user.name,
                email: user.email
            },
        })

        if(parseFloat(amount) === 0){
            product.available = false
        }

        try {
            
            const newProduct = await product.save()
            res.status(202).json({message: 'Produto criado com sucesso', newProduct})

        } catch (error) {
            res.status(500).json({message: error})
        }
    }

    static async getAllUserProducts(req, res){

        const user = await User.findById(req.id)

        try {

            const product = await Product.find({'user._id':user._id}).sort('-price')
            res.status(200).json({product,})
            
        } catch (error) {
            res.status(500).json({message: error})
        }
    }

    static async getProductbyId(req, res){

        const id = req.params.id

        const product = await Product.findOne({_id: id})

        if(!product){
            return res.status(404).json({message: 'Produto não encontrado'})
        }

        res.status(200).json({product: product,})
    }

    static async getAllProducts(req,res){

        const products = await Product.find().sort('-createdAt')

        res.status(200).json({products: products,})
    }
}