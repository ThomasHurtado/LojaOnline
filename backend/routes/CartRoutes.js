const router = require('express').Router()
const CartController = require('../controllers/CartCrontroller')

//helpers
const checkToken = require('../helpers/check-token')

router.patch('/addproduct/:id', checkToken, CartController.addProductToCart)
router.patch('/removeone/:id', checkToken, CartController.removeUnitFromCart)
router.get('/getcart', checkToken, CartController.allCartProducts)

module.exports = router