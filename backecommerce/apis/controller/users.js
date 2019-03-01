const router = require('express').Router()
const userModel = require('../model/usersModel')

router.post('/login', userModel.authLogin)
router.post('/register', userModel.register)

module.exports = router