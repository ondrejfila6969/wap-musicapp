const mongoose = require("mongoose");

const playlistSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: { type: String, required: true },
  songs: { type: [mongoose.Schema.Types.ObjectId], ref: "Song", default: [] },
  type: {
    type: String,
    enum: ["album", "playlist"],
    required: true,
  },
});

module.exports = mongoose.model("Playlist", playlistSchema);
