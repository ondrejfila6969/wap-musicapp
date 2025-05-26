import { Request, Response, NextFunction } from "express";
import Playlist from "../../models/playlist/playlist";
import User from "../../models/user/user";
import fs from "fs";
import path from "path";
import albumCoverUpload from "./albumCoverUpload";

const albumCover = albumCoverUpload.single("albumCoverFile");

export const saveFileIntoFolder = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  albumCover(req, res, (err: any) => {
    if (err) {
      console.error("Multer error:", err);
      return res.status(500).json({ message: err.message || "File upload error" });
    }
    next();
  });

};

export const deletePhoto = async (filePath: string) =>{
  if(filePath === path.join(__dirname, `../../../public/albumCovers/Default_cover.png`)) return;
  try {
    await fs.promises.unlink(filePath);
  } catch (err) {
    console.log("Error with Deleting Image / Video")
    console.error(err); 
  }
}


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

export const createAlbum = [saveFileIntoFolder, async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;
  const { albumName } = req.body;

  try {
  const coverFile = req.file?.filename || "Default_cover.png";

  //const existingUser = await User.findOneById(userId);
  //if(!existingUser) return res.status(404).send({message: "User not found"})
    const data = new Playlist({
      userId: userId, //change this in model to object id in model when userauth is working
      name: albumName,
      type: "album",  
      cover: `http://localhost:3000/albumCovers/${coverFile}`
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
}]

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
