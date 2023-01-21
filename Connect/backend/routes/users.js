const router = require("express").Router()
const bcrypt = require("bcrypt")
const User = require("../models/User")
const verify = require("../verifyToken")

//update user
router.put("/:id", verify, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
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
      },
        { new: true }
      )
      res.status(200).json(user)
    } catch (err) {
      return res.status(500).json(err)
    }
  } else {
    return res.status(403).json("You cant update someone else's account")
  }
})
//delete user
router.delete("/:id", verify, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
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
router.get("/all/users", verify, async function (req, res) {
  if (req.user.id === req.body.userId) {
    User.find({}, async function (err, users) {
      if (err) {
        res.send("something went wrong")
      }
      const peoples = await Promise.all(
        users.map((user) => {
          const u = user
          return u
        })
      );
      console.log(peoples)
      let peopleList = []
      peoples.map((people) => {
        const { _id, username, profilePic } = people
        peopleList.push({ _id, username, profilePic })
      })
      res.status(200).json(peopleList)
    })
  } else {
    res.status(403).json("Not authorized")
  }
})

//follow a user
router.put("/:id/follow", verify, async (req, res) => {
  if (req.user.id !== req.params.id) {
    try {
      const user = await User.findById(req.params.id)
      const currentUser = await User.findById(req.user.id)
      if (!user.followers.includes(req.user.id)) {
        await user.updateOne({ $push: { followers: req.user.id } })
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
router.get("/followers/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    const followers = await Promise.all(
      user.followers.map(follower => {
        return User.findById(follower)
      })
    )
    let followersList = []
    followers.map((friend) => {
      const { _id, username, profilePic } = friend
      followersList.push({ _id, username, profilePic })
    })
    res.status(200).json(followersList)
  } catch (error) {
    res.status(500).json(error)
  }
})


//get all followings of a user
router.get("/followings/:userId", async (req, res) => {
  try {
    console.log(req.params.userId)
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

router.put('/:id/unfollow', verify, async (req, res) => {
  if (req.user.id !== req.params.id) {
    try {
      const user = await User.findById(req.params.id)
      const currentUser = await User.findById(req.user.id)
      if (user.followers.includes(req.user.id)) {
        await user.updateOne({ $pull: { followers: req.user.id } })
        await currentUser.updateOne({ $pull: { followings: req.user.id } })
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