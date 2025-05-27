const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {type: String, required: true},
  password: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  pfpSrc: {
    type: String,
    required: false,
    default: "http://localhost:3000/defaultImages/default_Pfp.png",
  },
});

module.exports = mongoose.model("User", userSchema);
