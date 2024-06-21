const mongoose = require('mongoose')
const { Schema } = mongoose

const User = mongoose.model(
    'User',
    new Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        cpf: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        money: {
            type: Number,
            default: 0 
        },

    },
    {timestamps: true},
    ),
)

module.exports = User