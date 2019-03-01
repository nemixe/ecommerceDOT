const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const authorization = req.headers.authorization ? req.headers.authorization.split(' ') : []

  let token = authorization[0] === "Bearer" ? authorization[1] : null

  jwt.verify(token, '1n1p455w0rd', (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "auth required!"
      })
    } else {
      next()
    }
  })
}