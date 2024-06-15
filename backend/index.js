const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()

app.use(express.json())

app.use(cors({ credentials: true, origin: 'http://localhost:3000'}))

//Routes
const UserRoutes = require('./routes/UserRoutes')
const ProductRoutes = require('./routes/ProductRoutes')
const CartRoutes = require('./routes/CartRoutes')
const SaleRoutes = require('./routes/SaleRoutes')

app.use('/users', UserRoutes)
app.use('/products', ProductRoutes)
app.use('/cart', CartRoutes)
app.use('/sales', SaleRoutes)


mongoose
    .connect('mongodb+srv://poo2:1234@cluster0.arlotsu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log("Conectamos ao banco")
        app.listen(5000)
    })
    .catch((err) => console.log(err))
