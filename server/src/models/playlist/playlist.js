const mongoose = require("mongoose");

const playlistSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  username: { type: String, required:true },
  cover: {type: String, default: "http://localhost:3000/albumCovers/Default_cover.png"},
  name: { type: String, required: true },
  songs: { type: [mongoose.Schema.Types.ObjectId], ref: "Song", default: [] },
  type: {
    type: String,
    enum: ["album", "playlist"],
    required: true,
  },
  visibility: {
    type: String,
    enum: ["public", "private"],
    default: "public",
  }
});

module.exports = mongoose.model("Playlist", playlistSchema);
