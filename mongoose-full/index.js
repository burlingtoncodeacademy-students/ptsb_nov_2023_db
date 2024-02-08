//? Importing dotenv, and applying it (giving us access to process.env)
require("dotenv").config();

//? Importing Express
const express = require("express");

//? Importing Cors
const cors = require("cors");

//? Importing Mongoose
const mongoose = require("mongoose");

//? Connection string URL variable from .env file
const MONGODB = process.env.MONGO_DB_URL + process.env.DB_NAME;

//? Assign Express
const app = express();

//? Import controller/s
const { userController, postController } = require("./controllers/index");

//? Import validation middleware
const validateSession = require("./middleware/validate-session");

//? Connection middleware, connecting to DB
mongoose.connect(MONGODB);

//? Storing the connection status
const db = mongoose.connection;
// Get seed data

//? Creating a table/collection for our Database
const ProductModel = mongoose.model(
  "product",
  new mongoose.Schema({
    emoji: String,
    name: String,
    quantity: Number,
    price: Number,
    tags: Array,
  })
);

//? Creating event listener for an opened connection to the database
db.once("open", async () => {
  console.log("*".repeat(10));
  console.log(`Connected successfully to database:\n${MONGODB}`);
  console.log("*".repeat(10));

  //TODO Seed Data to ProductModel
});

// TODO Event listener for db connection error

//? Assigning a variable from .env, with fallback port of 8080
//* || - OR/DEFAULT operator
const PORT = process.env.PORT || 8080;

//? Middleware to allow JSON to be accepted by our HTTP server
app.use(express.json());

//? Allow parsing of query strings
app.use(express.urlencoded({ extended: true }));

//? Allow our endpoints to be interacted with via web browser
app.use(cors());

//? Using the controllers
app.use("/user", userController);
app.use(validateSession);
app.use("/post", postController);

//? Initial spin up of the Express server
app.listen(PORT, () => {
  try {
    //* Repeats string x int argument
    console.log("*".repeat(10));
    console.log(`Server is connected: ${PORT}`);
  } catch (err) {
    console.log("Error connecting", err);
  }
});

//TODO Get request using query params to Product model
