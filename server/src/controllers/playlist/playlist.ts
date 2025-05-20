import { Request, Response, NextFunction } from "express";
import Playlist from "../../models/playlist/playlist";

export const getAllPlaylists = async (req: Request, res: Response, next: NextFunction) => {
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

export const getPlaylistById = async (req: Request, res: Response, next: NextFunction) => {
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

export const createPlaylist = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;
  const { albumName } = req.body;
  try {
    const data = new Playlist({
      userId,
      name: albumName,
      type: "playlist",
      cover: "http://localhost:3000/albumCovers/Default_cover.png"
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

export const updatePlaylist = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = {
      name: req.body.name,
    };
    const result = await Playlist.findByIdAndUpdate(req.params.id, data, { new: true });
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

export const deletePlaylist = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await Playlist.findByIdAndDelete(req.params.id);
    if (result) {
      return res.status(200).send({
        message: "Playlist deleted",
        payload: result,
      });
    }
    res.status(404).send({
      message: "Playlist not deleted",
    });
  } catch (e) {
    res.status(500).send(e);
  }
};
