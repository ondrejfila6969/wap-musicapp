import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
  userId: {
    type: Number,
    ref: "User",
    required: true,
  },
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

export default mongoose.model("Playlist", playlistSchema);
