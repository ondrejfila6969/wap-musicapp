const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
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
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => {
        return (
          validator.isEmail(value) && value.length >= 0 && value.length <= 50
        );
      },
      message: "Please enter a valid email address",
    },
    match:
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: { type: String, required: true },
  pfpSrc: {
    type: String,
    required: false,
    default: "http://localhost:3000/defaultImages/default_Pfp.png",
  },
});

module.exports = mongoose.model("User", userSchema);
