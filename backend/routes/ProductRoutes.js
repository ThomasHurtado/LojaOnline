const router = require('express').Router()
const ProductController = require('../controllers/ProductController')

//helpers
const checkToken = require('../helpers/check-token')

router.post('/register', checkToken, ProductController.register)
router.get('/myproducts', checkToken, ProductController.getAllUserProducts)
router.get('/allproducts', ProductController.getAllProducts)
router.get('/getproduct/:id', ProductController.getProductbyId)
router.patch('/editproduct/:id', checkToken, ProductController.editProduct)
router.delete('/deleteproduct/:id', checkToken, ProductController.deleteProduct)


module.exports = router