// Importing + using dotenv
require("dotenv").config();

// Importing the express library
const express = require("express");
// Storing the function call of express in a variable
const app = express();

// Allows our server to accept json data
app.use(express.json());

// Importing mongoclient from the library
const { MongoClient } = require("mongodb");

const PORT = process.env.PORT;

let client = new MongoClient(process.env.MONGO_DB_URL);

async function dbConnect() {
  try {
    // Connecting to the db server
    await client.connect();
    // let db = client.db("mongoclient");
    // let collection = db.collection("users");
    let db = await client.db("mongoclient");
    let collection = await db.collection("users");

    return collection;
  } catch (err) {
    console.log(err);
  }
}

app.post("/create", async (req, res) => {
  try {
    let newUser = req.body;
    let userColl = await dbConnect();

    await userColl.insertOne(newUser);

    res.status(200).json({
      Created: newUser,
      Status: "Success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      Error: err,
    });
  }
});

app.get("/userdata", async (req, res) => {
  try {
    let userColl = await dbConnect();
    let results = [];

    let userList = await userColl.find();

    // await userList.forEach((userObj) => {
    //   results.push(userObj);
    // });

    for await (let userObj of userList) {
      results.push(userObj);
    }

    res.status(200).json({
      Results: results,
    });
  } catch (err) {
    res.send(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server is connected on port ${PORT}`);
});
