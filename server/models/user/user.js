const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (input) => {
        return input.length >= 1 && input.length <= 20;
      },
      message: "Username must be between 1 and 20 characters long.",
    },
  },
  pfpSrc: {
    type: String,
    required: true,
    default: "http://localhost:3000/defaultImages/default_Pfp.png",
  },
});

module.exports = mongoose.model("User", userSchema);
