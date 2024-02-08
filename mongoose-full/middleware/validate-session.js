//? Importing jwt to verify/decode the payload
const jwt = require("jsonwebtoken");

//? Importing user model so we can search for their _id after it has been decoded
const User = require("../models/user_model");

//? Middleware still has access to the request, response, and requires the next() function to move passed it
const validateSession = async (req, res, next) => {
  try {
    //? Take token provided by the request object (headers.authorization)
    const auth = req.headers.authorization;
    // console.log(auth);

    //? Checking if authorization header is present and value, if not, throw an error
    if (!auth) throw new Error("Unauthorized");

    //? Separate the token from the string
    const token = auth.split(" ")[1];

    //? Checking if token present. ex.) is there a token after the "Bearer" portion of the string
    if (!token) throw new Error("Unauthorized");

    //? Decode the token - Should be decoded payload (obj with user id on it)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);

    //? Find user in our db
    const user = await User.findById(decoded.id);

    //? Check if user exists in db
    if (!user) throw new Error("User not found");

    //? Add the found user to the request object
    req.user = user;

    //? Move forward and continue completing the request
    return next();
  } catch (err) {
    res.status(401).json({ Error: err.message });
  }
};

module.exports = validateSession;
