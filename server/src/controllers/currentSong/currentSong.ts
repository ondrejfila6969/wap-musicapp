import { Request, Response, NextFunction } from "express";
import Song from "../../models/song/song";
import User from "../../models/user/user";
import Playlist from "../../models/playlist/playlist";
import CurrentSong from "../../models/currentSong/currentSong";

export const getCurrentSongById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

export const updateCurrentSong = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) return res.status(404).send({ message: "Song not found" });
    const data = await CurrentSong.findOneAndUpdate(song.albumId);
    if (data) {
      return res.status(200).send({
        message: "Song updated",
      });
    }
    res.status(404).send({ message: "Song not found" });
  } catch (e) {
    res.status(500).send(e);
  }
};

export const createCurrentSong = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const [randomSong] = await Song.aggregate([{ $sample: { size: 1 } }]);
    if (!randomSong) {
      return res.status(404).send({ message: "No song found" });
    }

    const album = await Playlist.findOne({ songs: randomSong._id });
    if (!album) {
      return res.status(404).send({ message: "Album not found" });
    }

    const index = album.songs.findIndex(song=> song._id === randomSong._id);

    if (index === -1) {
      return res.status(404).json({ message: 'Song not found in playlist' });
    }

    const currentSong = new CurrentSong({
      userId: req.params.userid,
      playlistId: album._id,
      songId: randomSong._id,
      songIndex: Number(index), 
    });

    await currentSong.save();

    return res.status(200).send({
      message: "Song updated",
      currentSong,
    });
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Server error", error: e });
  }
};