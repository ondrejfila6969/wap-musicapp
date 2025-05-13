const mongoose = require("mongoose");

const songSchema = mongoose.Schema({
  artistId: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    required: true,
  },
  collabArtists: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    default: []
  },
  name: { type: String, required: true },
  dateOfRelease: { type: Date, required: true },
  songSrc: { type: String, required: true },
  songLength: { type: Number, default: 0 },
  numberOfStreams: { type: Number, default: 0 },
});

module.exports = mongoose.model("Song", songSchema);
