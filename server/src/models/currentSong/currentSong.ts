import mongoose from "mongoose";

const currentSongSchema = new mongoose.Schema({
  userId : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  playlistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Playlist",
    required: true,
  },
  songIndex: {
    type: Number,
    required: true,
  },
});


export default mongoose.model("CurrentSong", currentSongSchema);

