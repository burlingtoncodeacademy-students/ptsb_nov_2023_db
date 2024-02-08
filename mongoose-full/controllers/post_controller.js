const router = require("express").Router();

const Post = require("../models/post_model");

//? Using params to grab user id and add it to a post
router.post("/create/:id", async (req, res) => {
  try {
    let post = new Post({
      text: req.body.text,
      user_id: req.params.id,
    });

    const newPost = await post.save();

    res.status(200).json({
      Created: newPost,
    });
  } catch (err) {
    res.status(500).json({
      Error: err,
    });
  }
});

module.exports = router;
