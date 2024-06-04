const router = require('express').Router()
const UserController = require('../controllers/UserControllers')

//helpers
const checkToken = require('../helpers/check-token')

router.post('/register', UserController.register)
router.post('/login', UserController.login)

module.exports = router