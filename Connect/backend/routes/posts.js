const Post = require("../models/Post")
const User = require("../models/User")
const router = require("express").Router()

//create post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body)
  try {
    const savedPost = await newPost.save()
    res.status(200).json(savedPost)
  } catch (error) {
    res.status(500).json(error)
  }
})

//update post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body })
      res.status(200).json("the post has been updated")
    } else {
      res.status(403).json("You cant update someone elses post")
    }
  } catch (error) {
    res.status(500).json(error)
  }

})
//delete post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (post.userId === req.body.userId) {
      await post.deleteOne()
      res.status(200).json("the post has been deleted")
    } else {
      res.status(403).json("You cant delete someone elses post")
    }
  } catch (error) {
    res.status(500).json(error)
  }

})
//like and dislike post
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } })
      res.status(200).json("Post has been liked")
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } })
      res.status(200).json("The post has been disliked")
    }
  } catch (error) {
    res.status(500).json(error)
  }
})

//add comment on a post
router.put("/:id/comment", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post.comments.includes(req.body.user)) {
      await post.updateOne({ $push: { comments: { "comment": req.body.comment, "commenter": req.body.user } } })
      res.status(200).json("Comment added")
    }
  } catch (error) {
    res.status(500).json(error)
  }
})

//get a post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    res.status(200).json(post)
  } catch (error) {
    res.status(500).json(error)
  }
})

//get a users all posts
router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get timeline posts
router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts))
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router