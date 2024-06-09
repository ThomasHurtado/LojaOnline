const router = require('express').Router()
const UserController = require('../controllers/UserControllers')

//helpers
const checkToken = require('../helpers/check-token')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/checkuser', UserController.checkUser)
router.patch('/updateuser/:id', checkToken, UserController.updateUser)
router.patch('/updatemoneyplus', checkToken, UserController.updateMoneyPlus)
router.patch('/updatemoneyminus', checkToken, UserController.updateMoneyMinus)

module.exports = router