const User = require('../models/User')
const Cart = require('../models/Cart')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const getToken = require('../helpers/get-token')
const check_token = require('../helpers/check-token')


module.exports = class UserController {

    static async register(req, res){
        const {name, email, phone, cpf, password, confirmpassword} = req.body

        if(!name){
            res.status(422).json({message: 'O nome é obrigatorio!'})
            return
        }

        if(!email){
            res.status(422).json({message: 'O email é obrigatorio!'})
            return
        }

        if(!phone){
            res.status(422).json({message: 'O telefone é obrigatorio!'})
            return
        }

        if(!cpf){
            res.status(422).json({message: 'O CPF é obrigatorio!'})
            return
        }

        if(!password){
            res.status(422).json({message: 'A senha é obrigatorio!'})
            return
        }

        if(!confirmpassword){
            res.status(422).json({message: 'A confirmamção de senha é obrigatorio!'})
            return
        }

        if(password !== confirmpassword){
            res.status(422).json({message: 'As senhas devem ser iguais!'})
            return
        }

        const userExist = await User.findOne({email: email})

        if(userExist){
            res.status(422).json({message: 'Esse email ja foi cadastrado!'})
            return
        }

        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        const user = new User({
            name: name,
            email: email,
            phone: phone,
            cpf: cpf,
            password : passwordHash,
        })

        const cart = new Cart({
            owner:{
                _id: user._id,
                name: user.name,
                email: user.email
            }
        })

        try {
            
            const newUser = await user.save()
            await cart.save()
            res.status(202).json({message: 'Usuario criado com sucesso', newUser})

        } catch (error) {
            res.status(500).json({message: error})
        }
    }

    static async login(req, res) {

        const {email, password} = req.body

        //validar
        if(!email){
            res.status(422).json({message: 'O email é obrigatorio!'})
            return
        }

        if(!password){
            res.status(422).json({message: 'A senha é obrigatorio!'})
            return
        }

        //check user
        const user = await User.findOne({email: email})

        if(!user){
            res.status(422).json({message: 'Usuario não cadastrado!'})
            return
        }

        //check password
        const checkPassword = await bcrypt.compare(password, user.password)

        if(!checkPassword){
            res.status(422).json({message: 'Senha invalida!'})
            return
        }

        try {
        
        const secret = process.env.SECRET 
        const token = jwt.sign(
            {
                id: user._id
            },
            secret,
        )
        res.status(200).json({message: 'Autenticação bem sucedida!', token})

        } catch (error) {
            res.status(500).json({message: error})
        }
     }

     static async checkUser(req, res){
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
      
        if(!token){
          res.status(401).json({message: 'Acesso negado!'})
          return
        }
      
        try {
          const secret = process.env.SECRET
      
          jwt.verify(token, secret, async (err, decoded) =>{
            if(err){
              return res.status(400).json({message: 'Token inválido!'})
            } 
      
            req.id = decoded.id
            const currentUser = await User.findById(req.id)
            res.status(200).json(currentUser)
          })
      
        } catch (error) {
          res.status(400).json({message: 'Token inválido!'})
          return
        }
      }

      static async updateMoneyMinus(req, res){
        
        const {money} = req.body

        const user = await User.findById(req.id)
        
        if(money < 0 || money === undefined){
            res.status(400).json({message: 'Digite um valor correto!'})
            return
        }

        user.money = parseFloat(user.money) - parseFloat(money);

        if(user.money < 0){
            res.status(400).json({message: 'Você não tem dinheiro suficiente!'})
            return
        }
        

        try {
            await User.findByIdAndUpdate(req.id, user)
            res.status(200).json({message: 'Dinheiro atualizado com sucesso!'})
        } catch (error) {
            res.status(402).json({message: error})
        }
      }

      static async updateMoneyPlus(req, res){
        
        const {money} = req.body

        if(!money){
            res.status(400).json({message: 'Digite um valor!'})
            return
        }
        console.log(money)

        const user = await User.findById(req.id)
        
        if(money <= 0 || money === " "){
            res.status(400).json({message: 'Digite um valor correto!'})
            return
        }

        user.money = parseFloat(user.money) + parseFloat(money);
        

        try {
            await User.findByIdAndUpdate(req.id, user)
            res.status(200).json({message: 'Dinheiro atualizado com sucesso!'})
        } catch (error) {
            res.status(402).json({message: error})
        }
      }

      static async updateUser(req,res){
        const {email, phone, password, confirmpassword} = req.body
        const user = await User.findById(req.id)

        const userExist = await User.findOne({email: email})

        if(user.email !== email && userExist){
            res.status(422).json({message: 'Esse email ja foi cadastrado!'})
            return
        }

        user.email = email

        if(!phone){
            res.status(422).json({message: 'O telefone é obrigatorio!'})
            return
        }

        user.phone = phone

        if(password !== confirmpassword){
            res.status(422).json({message: 'As senhas devem ser iguais!'})
            return
        } else if(password == confirmpassword && password !== null){

            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)

            user.password = passwordHash
        }


        try {
            const updatedUser = await User.findOneAndUpdate(
                {_id: user.id},
                {$set: user},
                {new: true},
            )
            res.status(200).json({message: 'Usuário atualizado com sucesso!'})
        } catch (error) {
            res.status(500).json({message: 'Erro ao atualizar usuário!'})

        }

      }

      static async getUserbyId(req,res){

        const userId = req.params.id
        
        try {
            const user = await User.findById(userId)
            res.status(200).json({user: user})
        } catch (error) {
            
        }
      }
}