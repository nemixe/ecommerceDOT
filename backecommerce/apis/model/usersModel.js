const db = require('../../helpers/connection')
const jwt = require('jsonwebtoken')

module.exports = {
  authLogin: async (req, res) => {
    var user = [
      req.body.username ? req.body.username : null,
      req.body.email ? req.body.email : null,
      req.body.password
    ]
    sql = "SELECT * FROM Users WHERE (username = ? OR email = ?) AND password = ? "
    db.query(sql, user, (err, response) => {
      if (err) {
        return res.status(500).json({
          message: "error occured while authenticating, please try again!",
          error: err
        })
      }
      if (response.length == 0) {
        return res.status(401).json({
          message: "auth failed, please check your username and password is match!"
        })
      }
      const token = jwt.sign({ data: response.email }, '1n1p455w0rd', { expiresIn: '1h' })

      res.status(201).json({
        message: "login success!",
        payload: {
          id_user: response[0]["id_user"],
          token
        }
      })
    })
  },
  register: async (req, res) => {
    const date = new Date()
    const birth_date = new Date(req.body.birth_date)
    const user = {
      full_name: req.body.full_name,
      username: req.body.username ? req.body.username : null,
      email: req.body.email,
      password: req.body.password,
      photo_profil: req.body.photo_profil ? req.body.photo_profil : null,
      phone_number: req.body.phone_number,
      gender: req.body.gender,
      birth_date: birth_date.getFullYear() + '-' + birth_date.getMonth() + '-' + birth_date.getDate(),
      create_account_date: date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate()
    }
    db.query("INSERT INTO Users SET ?", user, (err, response) => {
      if (err) {
        return res.status(500).json({
          message: "error occured when processing register, please try again!",
          error: err
        })
      }

      res.status(200).json({
        message: "register success",
        payload: response
      })
    })
  }
}