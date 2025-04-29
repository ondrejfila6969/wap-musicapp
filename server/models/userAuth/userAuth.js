const mongoose = require("mongoose");

const userAuthSchema = mongoose.Schema({
    password: {type: String, required: true},
    email: {type: String, required: true}
})

module.exports = mongoose.model("userAuthSchema", userAuthSchema);