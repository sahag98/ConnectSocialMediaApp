const router = require("express").Router()
const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const newUser = new User({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    })

    const user = await newUser.save()
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    !user && res.status(404).json("user not found")

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    !validPassword && res.status(400).json("wrong password")

    const accessToken = jwt.sign(
      { id: user._id },
      process.env.JWT_KEY,
      { expiresIn: "2d" }
    )

    const { password, ...info } = user._doc

    res.status(200).json({ ...info, accessToken })
  } catch (err) {
    res.status(500).json(err)
  }

})


module.exports = router