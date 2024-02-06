//? Allows us to have sub routes in express
const router = require("express").Router();

//? Importing bcrypt
const bcrypt = require("bcrypt");

//? Importing our User Table
const User = require("../models/user_model");

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

    res.status(200).json({
      Mgs: "Success! User created!",
      User: newUser,
    });
  } catch (err) {
    res.status(500).json({
      Error: err.code === 11000 ? "Unable to signup" : err,
    });
  }
});

//? Exporting the routes
module.exports = router;
