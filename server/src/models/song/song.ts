import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  uploadedby: {
    type: Number,
    ref: "User",
    required: true,
  },
  albumId :{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Playlist",
    required: true,
  },
  artistName: {
    type: String,
    ref: "User",
    required: true,
  },
  collabArtists: {
    type: String,
    default: "",
  },
  songCover: { type: String, required: true },
  songName: { type: String, required: true },
  songSrc: { type: String, default: true },
  songLength: { type: Number, default: 0 },
  yearOfRelease: { type: Number, required: true},
  numberOfStreams: { type: Number, default: 0 },
});

export default mongoose.model("Song", songSchema);
