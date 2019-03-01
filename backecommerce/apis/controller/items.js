const router = require('express').Router()
const itemsModel = require('../model/itemsModel')

router.post('/', itemsModel.insertItems)

module.exports = router