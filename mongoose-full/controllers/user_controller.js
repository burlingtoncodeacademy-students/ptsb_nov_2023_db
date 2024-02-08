//? Allows us to have sub routes in express
const router = require("express").Router();

//? Importing bcrypt
const bcrypt = require("bcrypt");

//? Importing jsonwebtoken
const jwt = require("jsonwebtoken");

//? Importing our User Table
const User = require("../models/user_model");

//? Creating/Signing up a user
router.post("/signup", async (req, res) => {
  try {
    const user = new User({
      firstName: req.body.first,
      lastName: req.body.last,
      email: req.body.email,
      //   password: req.body.password,
      //? Using bcrypt to hash the password
      password: bcrypt.hashSync(req.body.password, 12),
    });

    const newUser = await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2 days",
    });

    res.status(200).json({
      Msg: "Success! User created!",
      User: newUser,
      Token: token,
    });
  } catch (err) {
    res.status(500).json({
      Error: err.code === 11000 ? "Unable to signup" : err,
    });
  }
});

//? Logging in a user
router.post("/signin", async (req, res) => {
  try {
    let { email, password } = req.body;

    const user = await User.findOne({ email: email });

    // console.log(user) // Check found user obj

    if (!user) throw new Error("User not found");

    let passwordMatch = await bcrypt.compare(password, user.password);

    // console.log({ passwordMatch }); Check if passwords actually match

    if (!passwordMatch) throw new Error("Invalid Details");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 24,
    });

    res.status(200).json({
      Msg: "User Signed In!",
      User: user,
      Token: token,
    });
  } catch (err) {
    res.status(500).json({
      Error: err,
    });
  }
});

//? Exporting the routes within this controller
module.exports = router;
