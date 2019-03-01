const router = require('express').Router()
const authRequired = require('../helpers/authRequired')

const product = require('./controller/products')
const transactions = require('./controller/transactions')
const items = require('./controller/items')
const users = require('./controller/users')
const stores = require('./controller/stores')

router.use('/products', product)
router.use('/transactions', transactions)
router.use('/items', items)
router.use('/auth', users)
router.use('/stores', stores)

router.get('/', (req, res) => {
  res.status(200).json({
    message: '/products to see the products'
  })
})

module.exports = router