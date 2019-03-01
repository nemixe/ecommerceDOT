const router = require('express').Router()
const transactionsModel = require('../model/transactionsModel')

router.post('/', transactionsModel.transactionLine)

module.exports = router