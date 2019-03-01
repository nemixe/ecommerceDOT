const db = require('../../helpers/connection')
const itemsModel = require('./itemsModel')

function insertTransaction(req, res) {
  const date = new Date()

  var total_price = null

  req.body.payload.map(item => {
    total_price = total_price + (item.price_items * item.quantity)
  })
  const transactions = {
    total_price: total_price,
    date: date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate(),
    id_user: req.body.id_user,
    id_address: req.body.id_address,
    id_courier: req.body.id_courier
  }

  db.query("INSERT INTO Transactions SET ?", transactions, (err, response) => {
    if (err) {
      return res.status(500).json({
        message: "error occured while procced transaction, please try again!",
        error: err
      })
    }
  })
}

module.exports = {
  transactionLine: async (req, res) => {
    insertTransaction(req, res)
    db.query('SELECT LAST_INSERT_ID() FROM Transactions', (err, response) => {
      if (err) {
        return res.status(500).json({
          message: "error occured, please try again!",
          error: err
        })
      }
      console.log(response[0]["LAST_INSERT_ID()"])
      itemsModel.insertItems(req, res, response[0]["LAST_INSERT_ID()"])
    })
    res.status(200).json({
      message: "Transaction success"
    })
  }
}