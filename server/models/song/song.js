const mongoose = require("mongoose");

const songSchema = mongoose.Schema({
  uploadedby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  artistName: {
    type: String,
    ref: "User",
    required: true,
  },
  collabArtists: {
    type: [String],
    ref: "User",
    default: [],
  },
  songCover: { type: String, required: true },
  songName: { type: String, required: true },
  songSrc: { type: String, default: true },
  songLength: { type: Number, default: 0 },
  yearOfRelease: { type: Number, required: true},
  numberOfStreams: { type: Number, default: 0 },
});

module.exports = mongoose.model("Song", songSchema);
