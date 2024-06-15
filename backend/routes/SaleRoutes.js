const router = require('express').Router()
const SaleControllers = require('../controllers/SaleCrontollers')

//helpers
const checkToken = require('../helpers/check-token')

router.post('/finishsale/:id', checkToken, SaleControllers.createSale)


module.exports = router