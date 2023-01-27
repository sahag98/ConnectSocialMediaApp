const jwt = require("jsonwebtoken")

function verify(req, res, next) {
  const authHeader = req.headers.token
  console.log(authHeader)
  if (authHeader) {
    const token = authHeader
    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
      if (err) {
        res.status(403).json("Token is not valid")
      }
      else {
        req.user = user
        next()
      }
    })
  } else {
    return res.status(401).json("You are not authorized")
  }
}

module.exports = verify