const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  twitter: {
    id: String,
    token: String,
    displayName: String,
    username: String
  }
});

module.exports = mongoose.model("User", userSchema);
