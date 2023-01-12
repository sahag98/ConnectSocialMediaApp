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

router.get("/", async (req, res) => {
  const userId = req.query.userId
  const username = req.query.username
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username })
    const { password, updatedAt, ...other } = user._doc
    res.status(200).json(other)
  } catch (error) {
    res.status(500).json(error)
  }
})

//get all users
router.get('/all/users', function (req, res) {
  User.find({}, function (err, users) {
    if (err) {
      res.send("something went wrong")
    }
    res.json(users)
  })
})

//follow a user
router.put('/:id/follow', async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id)
      const currentUser = await User.findById(req.body.userId)
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } })
        await currentUser.updateOne({ $push: { followings: req.params.id } })
        res.status(200).json("user has been followed")
      } else {
        res.status(403).json("you already follow this user")
      }
    } catch (error) {
      res.status(500).json(error)
    }
  } else {
    res.status(403).json("You cant follow yourself")
  }
})

//get all followers of a user
router.get('/followers/all', async (req, res) => {
  try {
    const currentUser = await User.findById(req.body.userId)
    const followers = await Promise.all(
      currentUser.followers.map(follower => {
        return User.findById(follower)
      })
    )
    res.json(followers)
  } catch (error) {
    res.status(500).json(error)
  }
})

//get all followings of a user
router.get('/followings/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    const followings = await Promise.all(
      user.followings.map(following => {
        return User.findById(following)
      })
    )
    let followingsList = []
    followings.map((friend) => {
      const { _id, username, profilePic } = friend
      followingsList.push({ _id, username, profilePic })
    })
    res.status(200).json(followingsList)
  } catch (error) {
    res.status(500).json(error)
  }
})
//unfollow a user

router.put('/:id/unfollow', async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id)
      const currentUser = await User.findById(req.body.userId)
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } })
        await currentUser.updateOne({ $pull: { followings: req.body.userId } })
        res.status(200).json("user has been unfollowed")
      } else {
        res.status(403).json("you dont follow this user")
      }
    } catch (error) {
      res.status(500).json(error)
    }
  } else {
    res.status(403).json("You cant unfollow yourself")
  }
})

module.exports = router