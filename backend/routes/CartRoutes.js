const router = require('express').Router()
const CartController = require('../controllers/CartCrontroller')

//helpers
const checkToken = require('../helpers/check-token')

router.patch('/addproduct/:id', checkToken, CartController.addProductToCart)
router.patch('/removeone/:id', checkToken, CartController.removeUnitFromCart)
router.get('/getcart', checkToken, CartController.allCartProducts)
router.patch('/deleteproduct/:id', checkToken, CartController.removeItemFromCart)
router.get('/usercart', checkToken, CartController.userCart)
router.patch('/clearcart', checkToken, CartController.clearCart)

module.exports = router