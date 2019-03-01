const db = require('../../helpers/connection')

module.exports = {
  insertItems: (req, res, ext) => {
    if (!ext) return res.status(400).json({
      message: "error transaction id doesn valid",
      ext: ext
    })
    var items = []

    if (req.body.payload.length > 1) {
      req.body.payload.map(item => {
        console.log(item)
        items = [...items, [item.id_product, ext, item.quantity, item.price_items]]
      })
    }
    else {
      items = [
        [
          req.body.payload[0].id_product,
          ext,
          req.body.payload[0].quantity,
          req.body.payload[0].price_items
        ]
      ]
      console.log(req.body.payload[0])
    }
    console.log(items)
    const sql = "INSERT INTO Items (id_product, id_transaksi, quantity, price_items) VALUES ?"
    db.query(sql, [items], (err, response) => {
      if (err) {
        console.log(err)
        return 500
      }
    })
  }
}