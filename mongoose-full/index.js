//? Importing dotenv, and applying it (giving us access to process.env)
require("dotenv").config();

//? Import seed data
const seedData = require("./seed_data/products_seed");

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

  let foundProducts = await ProductModel.find();

  if (foundProducts.length === 0) {
    console.log("*".repeat(10));
    console.log("Seeding the products collection with data");
    console.log("*".repeat(10));

    await ProductModel.insertMany(seedData);
  }
});

db.on("error", (err) => console.log(`Error ${err}`));

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

//? Get request using query params to Product model
app.get("/product", async (req, res) => {
  try {
    const { min, max, tags } = req.query;
    let all = await ProductModel.find()
      .where("price")
      .gt(min)
      .lt(max)
      .where("tags")
      .in(tags.split(","))
      .limit(10)
      .sort({ price: -1 })
      .select("name emoji price quantity tags");

    res.status(200).json({
      Results: all,
    });
  } catch (err) {
    res.status(500).json({
      Error: err,
    });
  }
});
