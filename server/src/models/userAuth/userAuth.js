const mongoose = require("mongoose");

const userAuthSchema = mongoose.Schema({
  referencesUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  password: { type: String, required: true },
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
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
});

module.exports = mongoose.model("userAuthSchema", userAuthSchema);
