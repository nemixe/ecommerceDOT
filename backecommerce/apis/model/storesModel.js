const db = require('../../helpers/connection')

module.exports = {
  getDataToko: async (req, res) => {
    db.query("SELECT * FROM Stores LIMIT 50", (err, rows) => {
      if (err) {
        return res.status(500).json({
          message: "error occured when getting data Stores",
          error: err
        })
      }
      res.status(200).json({
        count_limit: 50,
        payloads: rows
      })
    })
  },
  getDataTokoById: async (req, res) => {
    db.query("SELECT * FROM Stores WHERE id_store = ?", req.params.id_store, (err, response) => {
      if (err) {
        return res.status(500).json({
          message: "error occured please try again later!",
          error: err
        })
      }
      const sql = `
        SELECT * FROM Products WHERE id_store = ?
      `
      db.query(sql, req.params.id_store, (error, products) => {
        if (error) {
          return res.status(500).json({
            message: "error occured when getting data Store by id",
            error
          })
        }
        res.status(200).json({
          payload: response,
          products: {
            count: products.length,
            data: products
          }
        })
      })
    })
  }
}