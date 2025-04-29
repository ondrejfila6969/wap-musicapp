const mongoose = require("mongoose");

const playlistSchema = mongoose.Schema({
    name: {type: String, required: true},
})

module.exports = mongoose.model("Playlist", playlistSchema);