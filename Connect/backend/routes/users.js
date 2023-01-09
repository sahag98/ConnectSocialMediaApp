const router = require("express").Router()
const bcrypt = require("bcrypt")
const User = require("../models/User")

//update user
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password, salt)
      } catch (err) {
        return res.status(500).json(err)
      }
    }

    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      })
      res.status(200).json("Account has been updated")
    } catch (err) {
      return res.status(500).json(err)
    }
  } else {
    return res.status(403).json("You cant update someone elses account")
  }
})
//delete user
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {

    try {
      await User.findByIdAndDelete(req.params.id)
      res.status(200).json("Account has been deleted")
    } catch (err) {
      return res.status(500).json(err)
    }
  } else {
    return res.status(403).json("You can't delete someone elses account")
  }
})
//get a user

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    const { password, updatedAt, ...other } = user._doc
    res.status(200).json(other)
  } catch (error) {
    res.status(500).json(error)
  }
})

//get all users
router.get('/', function (req, res) {
  User.find({}, function (err, users) {
    if (err) {
      res.send("something went wrong")
    }
    res.json(users)
  })
})

//follow a user

//unfollow a user

module.exports = router