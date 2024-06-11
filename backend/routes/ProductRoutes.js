const router = require('express').Router()
const ProductController = require('../controllers/ProductController')

//helpers
const checkToken = require('../helpers/check-token')

router.post('/register', checkToken, ProductController.register)
router.get('/myproducts', checkToken, ProductController.getAllUserProducts)
router.get('/allproducts', ProductController.getAllProducts)
router.get('/:id', ProductController.getProductbyId)

module.exports = router