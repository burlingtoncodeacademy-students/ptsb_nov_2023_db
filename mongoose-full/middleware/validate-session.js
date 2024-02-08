const jwt = require("jsonwebtoken");

const User = require("../models/user_model");

const validateSession = async (req, res, next) => {
  // Middleware still has access to the request, response, and requires the next() function to move passed it

  try {
    //1. Take token provided by the request object (headers.authorization)
    const auth = req.headers.authorization;
    console.log(auth);

    //? Checking if authorization header is present and value, if not, throw an error
    if (!auth) throw new Error("Unauthorized");

    return next();
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
};

module.exports = validateSession;
