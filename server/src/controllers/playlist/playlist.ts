import { Request, Response, NextFunction } from "express";
import Playlist from "../../models/playlist/playlist";
import User from "../../models/user/user";
import fs from "fs";
import path from "path";
import albumCoverUpload from "./albumCoverUpload";
import playlistCoverUpload from "./playlistCoverUpload";
import mongoose from "mongoose";

const albumCover = albumCoverUpload.single("albumCoverFile");

export const saveFileIntoFolderAlbum = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  albumCover(req, res, (err: any) => {
    if (err) {
      console.error("Multer error:", err);
      return res
        .status(500)
        .json({ message: err.message || "File upload error" });
    }
    next();
  });
};

const playlistCover = playlistCoverUpload.single("playlistCoverFile");

export const saveFileIntoFolderPlaylist = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  playlistCover(req, res, (err: any) => {
    if (err) {
      console.error("Multer error:", err);
      return res
        .status(500)
        .json({ message: err.message || "File upload error" });
    }
    next();
  });
};

export const deletePhoto = async (filePath: string) => {
  if (
    filePath ===
    path.join(__dirname, `../../../public/albumCovers/Default_cover.png`)
  )
    return;
  try {
    await fs.promises.unlink(filePath);
  } catch (err) {
    console.log("Error with Deleting Image / Video");
    console.error(err);
  }
};

export const getAllPlaylists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await Playlist.find();
    if (data && data.length !== 0) {
      return res.status(200).send({
        message: "Playlists found",
        payload: data,
      });
    }
    res.status(404).send({
      message: "Playlists not found",
    });
  } catch (e) {
    res.status(500).send(e);
  }
};

export const getAllPlaylistsByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await Playlist.find({ userId: req.params.userId });
    if (data) {
      return res.status(200).send({
        message: "Playlists found",
        payload: data,
      });
    }
    res.status(404).send({
      message: "Playlists not found",
    });
  } catch (e) {
    res.status(500).send(e);
  }
};

export const getPlaylistById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await Playlist.findById(req.params.id);
    if (data) {
      return res.status(200).send({
        message: "Playlist found",
        payload: data,
      });
    }
    res.status(404).send({
      message: "Playlist not found",
    });
  } catch (e) {
    res.status(500).send(e);
  }
};

export const createAlbum = [
  saveFileIntoFolderAlbum,
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const { albumName } = req.body;

    try {
      const coverFile = req.file?.filename || "Default_cover.png";

      const user = await User.findById(userId);
      if (!user) return res.status(404).send({ message: "User not found" });

      const data = new Playlist({
        userId: userId, //change this in model to object id in model when userauth is working
        username: user.username,
        name: albumName,
        type: "album",
        cover: `http://localhost:3000/albumCovers/${coverFile}`,
      });
      const result = await data.save();
      if (result) {
        return res.status(201).send({
          message: "Playlist created",
          payload: result,
        });
      }
      res.status(404).send({
        message: "Playlist not created",
      });
    } catch (e) {
      res.status(500).send(e);
    }
  },
];

export const addSongToPlaylist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { playlistId, songId } = req.params;

  try {
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      return res.status(404).send({ message: "Playlist not found" });
    }

    const songObjectId = new mongoose.Types.ObjectId(songId);

    if (
      playlist.songs.some((id: mongoose.Types.ObjectId) =>
        id.equals(songObjectId)
      )
    ) {
      return res.status(400).send({ message: "Song already in playlist" });
    }

    playlist.songs.push(songObjectId);
    const updatedPlaylist = await playlist.save();
    res.status(200).send({
      message: "Song added to playlist",
      payload: updatedPlaylist,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export const createPlaylist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  const { albumName } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).send({ message: "User not found" });

    const data = new Playlist({
      userId: userId,
      username: user.username,
      name: albumName,
      type: "playlist",
      cover: `http://localhost:3000/albumCovers/Default_cover.png`,
    });

    const result = await data.save();
    if (result) {
      return res.status(201).send({
        message: "Playlist created",
        payload: result,
      });
    }
    res.status(404).send({
      message: "Playlist not created",
    });
  } catch (e) {
    res.status(500).send(e);
  }
};

export const updatePlaylist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = {
      name: req.body.name,
    };
    const result = await Playlist.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    if (result) {
      return res.status(200).send({
        message: "Playlist updated",
        payload: result,
      });
    }
    res.status(404).send({
      message: "Playlist not updated",
    });
  } catch (e) {
    res.status(500).send(e);
  }
};

export const deletePlaylist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const playlist = await Playlist.findById(req.params.id);

    if (!playlist) {
      return res.status(404).send({ message: "Playlist not found" });
    }

    await Promise.all(
      playlist.songs.map(async (songId: mongoose.Types.ObjectId) => {
        await Playlist.updateMany(
          { songs: songId },
          { $pull: { songs: songId } }
        );
      })
    );

    const result = await Playlist.findByIdAndDelete(req.params.id);

    return res.status(200).send({
      message: "Playlist deleted and songs removed from all playlists",
      payload: result,
    });
  } catch (e) {
    console.error("Error deleting playlist:", e);
    res.status(500).send(e);
  }
};

export const changingPlaylistCover = [
  saveFileIntoFolderPlaylist,
  async (req: Request, res: Response, next: NextFunction) => {
    const { playlistId } = req.params;

    try {
      const coverFile = req.file?.filename || "Default_cover.png";

      const updatedPlaylist = await Playlist.findByIdAndUpdate(
        playlistId,
        {
          cover: `http://localhost:3000/playlistCovers/${coverFile}`,
        },
        { new: true } 
      );

      if (!updatedPlaylist) {
        return res.status(404).send({ message: "Playlist not found" });
      }

      return res.status(200).send({
        message: "Playlist updated with new cover",
        payload: updatedPlaylist,
      });
    } catch (error) {
      console.error("Error adding cover to playlist:", error);
      return res.status(500).send({ message: "Internal server error" });
    }
  },
];
