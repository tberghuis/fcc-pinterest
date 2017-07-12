const mongoose = require("mongoose");

const pinSchema = new mongoose.Schema({
  title: String,
  imageUrl: String,
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  likers: [mongoose.Schema.Types.ObjectId]
  // likers: [
  //   { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" }
  // ]
});

module.exports = mongoose.model("Pin", pinSchema);
