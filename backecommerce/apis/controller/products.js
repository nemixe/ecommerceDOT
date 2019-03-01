const router = require('express').Router()
const productsModel = require('../model/productsModel')

router.get('/', productsModel.getProducts)
router.get('/:id_product', productsModel.getProductsById)
router.post('/', productsModel.insertProduct)

module.exports = router