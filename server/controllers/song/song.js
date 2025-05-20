const path = require("path");
const fs = require("fs");
const Song = require("../../models/song/song");
const User = require("../../models/user/user");
const songFileController = require("../../middleware/songFile");
const playlist = require("../../models/playlist/playlist");

const songFile = songFileController.single("songUpload");

const createSong = [
  saveFileIntoFolder,
  async (req, res, next) => {
    if (!req.file) {
      return res.status(500).json({ message: "File didn't upload" });
    }
    const { userid, albumid } = req.params;
    const { songName, collabArtists, yearOfRelease } = req.body;
    if (!userid || !songName || !collabArtists  || !yearOfRelease) {
      return res.status(404).json({ message: "Missing data" });
    }

    const user = await User.findOneById(userid);
    if (!user) {
      return res.status(404).send("User not found");
    }
    const album = await Playlist.findOneById(albumid);
    const albumCover = album.cover;
    try {
      const song = new Song({
        uploadedby: userid,
        artistName: user.userName,
        collabArtists: {
          type: [String],
          ref: "User",
          default: [],
        },
        songCover: { type: String, required: true },
        songName,
        songSrc: "http://localhost:3000/songs/" + req.file.filename,
        songLength: getAudioDuration(
          path.join(__dirname, `../../../public/songs/${req.file.filename}`)
        ),
        yearOfRelease,
      });

      await song.save();
      return res.status(200).send("Song created");
    } catch (error) {
      await deletePhoto(
        path.join(__dirname, `../../../public/songs/${req.file.filename}`)
      );
      return res.status(500).json({
        message: "Error creating song",
        error: error.message,
      });
    }
  },
];

const getSongById = async (req, res, next) => {
  try {
    const data = await Song.findById(req.params.id);
    if (data) {
      return res.status(200).send({
        message: "Song found",
        payload: data,
      });
    }
    res.status(404).send({ message: "Song not found" });
  } catch (e) {
    res.status(500).send(e);
  }
};

const updateSong = async (req, res, next) => {
  try {
    const data = {};
    const result = await Song.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    if (result) {
      return res.status(200).send({
        message: "Song updated",
        payload: result,
      });
    }
    res.status(404).send({ message: "Song not updated" });
  } catch (e) {
    res.status(500).send(e);
  }
};

const deleteSong = async (req, res, next) => {
  try {
    const result = await Song.findByIdAndDelete(req.params.id);
    if (result) {
      return res.status(200).send({
        message: "Song deleted",
        payload: result,
      });
    }
    res.status(404).send({ message: "Song not deleted" });
  } catch (e) {
    res.status(500).send(e);
  }
};

const saveFileIntoFolder = (req, res, next) => {
  songFile(req, res, (err) => {
    if (err) {
      return res.status(500).json({ message: "Invalid file format" });
    }
    next();
  });
};

const getAudioDuration = async (filePath) => {
  try {
    const metadata = await mm.parseFile(filePath);
    const durationInSeconds = metadata.format.duration;
    console.log("Duration (s):", durationInSeconds);
    return durationInSeconds;
  } catch (error) {
    console.error("Error reading metadata:", error.message);
    return 1000;
  }
};

const deletePhoto = async (filePath) => {
  try {
    await fs.promises.unlink(filePath);
  } catch (err) {
    throw new Error("Failed to delete song photo");
  }
};

module.exports = {
  createSong,
  getSongById,
  updateSong,
  deleteSong,
};
