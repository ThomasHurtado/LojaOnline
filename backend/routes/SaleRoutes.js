const router = require('express').Router()
const SaleControllers = require('../controllers/SaleCrontollers')

//helpers
const checkToken = require('../helpers/check-token')

router.post('/finishsale/:id', checkToken, SaleControllers.createSale)
router.get('/mysales', checkToken, SaleControllers.userSales)
router.get('/mypurchases', checkToken, SaleControllers.userPurchases)


module.exports = router