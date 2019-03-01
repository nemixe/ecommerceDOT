const db = require('../../helpers/connection')

module.exports = {
  getProducts: async function (req, res) {
    const sql = `
    SELECT
    Products.id_product, 
    (
      SELECT directory FROM Products_pictures LIMIT 1
    ) as directory,
    Products.product_name, 
    Products.price, 
    Stores.store_name, 
    Products.rating 
    FROM Products
    LEFT JOIN Stores ON Products.id_store = Stores.id_store
    `
    db.query(sql, (err, rows) => {
      if (err) {
        return res.status(500).json({
          message: "please try again",
          error: err
        })
      }
      res.status(200).json({
        limit_rows: rows.length,
        payloads: rows
      })
    })
  },
  getProductsById: async function (req, res) {
    db.query("SELECT * FROM Products WHERE id_product = ?", req.params.id_product, (err, row) => {
      if (err) {
        return res.status(500).json({
          message: "please try again",
          error: err
        })
      }
      if (row.length == 0) {
        return res.status(404).json({
          message: "Product Not Found!"
        })
      }
      db.query("SELECT * FROM Products_pictures where id_product = ?", req.params.id_product, (error, response) => {
        if (error) {
          return res.status(500).json({
            message: "please try again",
            error: err
          })
        }
        res.status(200).json({
          payloads: row,
          images: response
        })
      })
    })
  },
  insertProduct: async function (req, res) {
    const date = new Date()
    const product = {
      id_store: req.body.id_store,
      id_category: req.body.id_category,
      product_name: req.body.product_name,
      description: req.body.description,
      stock: req.body.stock ? req.body.stock : null,
      weight: req.body.weight,
      price: req.body.price,
      min_purchase: req.body.min_purchase ? req.body.min_purchase : 1,
      max_purchase: req.body.max_purchase ? req.body.max_purchase : null,
      condition: req.body.condition,
      date: date.toISOString
    }
    db.query("INSERT INTO Products SET ?", product, (err, response) => {
      if (err) {
        return res.status(500).json({
          message: "please try again!",
          error: err
        })
      }
      res.status(201).json({
        message: "Product created!",
        response: response
      })
    })
  }
}