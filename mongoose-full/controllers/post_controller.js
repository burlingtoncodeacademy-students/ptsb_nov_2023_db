const router = require("express").Router();

const Post = require("../models/post_model");

//? Using params to grab user id and add it to a post
// router.post("/create/:id", async (req, res) => {
//   try {
//     let post = new Post({
//       text: req.body.text,
//       user_id: req.params.id,
//     });

//     const newPost = await post.save();

//     res.status(200).json({
//       Created: newPost,
//     });
//   } catch (err) {
//     res.status(500).json({
//       Error: err,
//     });
//   }
// });

router.get("/mine", async (req, res) => {
  try {
    let results = await Post.find({ user_id: req.user._id }).select({
      _id: 1,
      text: 1,
      createdAt: 1,
      updatedAt: 1,
    });

    res.status(200).json({
      Results: results,
    });
  } catch (err) {
    res.status(500).json({
      Error: err,
    });
  }
});
router.post("/create", async (req, res) => {
  try {
    let post = new Post({
      text: req.body.text,
      user_id: req.user._id,
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

router.get("/all", async (req, res) => {
  try {
    let results = await Post.find()
      .populate("user_id", ["firstName", "lastName", "-_id"])
      .select({
        text: 1,
        createdAt: 1,
        updatedAt: 1,
      });

    res.status(200).json({
      Results: results,
    });
  } catch (err) {
    res.status(500).json({
      Error: err,
    });
  }
});

module.exports = router;
