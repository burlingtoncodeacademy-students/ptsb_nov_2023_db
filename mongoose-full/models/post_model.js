const mongoose = require("mongoose");
const User = require("./user_model");

const PostSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      minLength: 1,
    },
    user_id: {
      type: mongoose.ObjectId,
      required: true,
      ref: User,
    },
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.model("post", PostSchema);
