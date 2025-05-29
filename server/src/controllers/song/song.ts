import path from "path";
import fs from "fs";
import { Request, Response, NextFunction } from "express";
import { getAudioDurationInSeconds } from "get-audio-duration";
import Song from "../../models/song/song";
import User from "../../models/user/user";
import songFileController from "./songUpload";
import Playlist from "../../models/playlist/playlist";

const songFile = songFileController.single("songFile");

const saveFileIntoFolder = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  songFile(req, res, (err: any) => {
    if (err) {
      return res.status(500).json({ message: "Invalid file format" });
    }
    next();
  });
};

const getAudioDuration = async (filePath: string): Promise<number> => {
  try {
    const duration = await getAudioDurationInSeconds(filePath);
    console.log("Duration (s):", duration);
    return duration;
  } catch (error: any) {
    console.error("Error reading duration:", error.message);
    return 1000;
  }
};

const deletePhoto = async (filePath: string): Promise<void> => {
  try {
    await fs.promises.unlink(filePath);
  } catch (err) {
    throw new Error("Failed to delete song photo");
  }
};

export const createSong = [
  saveFileIntoFolder,
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("Song uploaded to folder");

    if (!req.file) {
      console.log("no file")
      return res.status(500).json({ message: "File didn't upload" });
    }

    const { userid, albumid } = req.params;
    const { songName, collabArtists, yearOfRelease } = req.body;

    if (!userid || !songName || !yearOfRelease) {
      return res.status(404).json({ message: "Missing data" });
    }

    console.log("no missing data");
    
    const user = await User.findById(userid);
    if (!user) {
      return res.status(404).json({ message:"User not found" });
    }

    console.log(albumid);
    const album = await Playlist.findById(albumid);
    const albumCover = album?.cover;

    try {
      const duration = await getAudioDuration(
        path.join(__dirname, `../../../public/songs/${req.file.filename}`)
      );

      const song = new Song({
        uploadedby: userid, //change this in model to object id in model when userauth is working
        artistName: user.username, //chanage change change cahanneehqeqwheqwheqwehqwehqwheqwehqwheqwehqwehqwhqwehqwheqwheqwheqwhe
        collabArtists,
        songCover: albumCover,
        songName,
        songSrc: "http://localhost:3000/songs/" + req.file.filename,
        songLength: duration,
        yearOfRelease,
      });

      await song.save();
      await Playlist.findByIdAndUpdate(
        album._id,
        { $push: { songs: song._id } },
        { new: true } 
      );
      return res.status(200).send("Song created");
    } catch (error: any) {
      await deletePhoto(
        path.join(__dirname, `../../../public/songs/${req.file.filename}`)
      );
      console.log(error);
      return res.status(500).json({
        message: "Error creating song",
        error: error.message,
      });
    }
  },
];

export const getSongById = async (
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

export const updateSong = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = {}; // Add logic here to update specific fields from req.body
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

export const deleteSong = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
