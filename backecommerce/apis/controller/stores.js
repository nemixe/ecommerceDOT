const router = require('express').Router()
const storeModel = require('../model/storesModel')

router.get('/', storeModel.getDataToko)
router.get('/:id_store', storeModel.getDataTokoById)

module.exports = router