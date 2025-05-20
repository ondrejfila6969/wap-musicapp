import path from "path";
import fs from "fs";
import { Request, Response, NextFunction } from "express";
import { getAudioDurationInSeconds } from "get-audio-duration";
import Song from "../../models/song/song";
import User from "../../models/user/user";
import songFileController from "./songUpload";
import Playlist from "../../models/playlist/playlist";

const songFile = songFileController.single("songUpload");

const saveFileIntoFolder = (req: Request, res: Response, next: NextFunction): void => {
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
    if (!req.file) {
      return res.status(500).json({ message: "File didn't upload" });
    }

    const { userid, albumid } = req.params;
    const { songName, collabArtists, yearOfRelease } = req.body;

    if (!userid || !songName || !collabArtists || !yearOfRelease) {
      return res.status(404).json({ message: "Missing data" });
    }

    const user = await User.findById(userid);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const album = await Playlist.findById(albumid);
    const albumCover = album?.cover;

    try {
      const duration = await getAudioDuration(
        path.join(__dirname, `../../../public/songs/${req.file.filename}`)
      );

      const song = new Song({
        uploadedby: userid,
        artistName: user.userName,
        collabArtists,
        songCover: albumCover,
        songName,
        songSrc: "http://localhost:3000/songs/" + req.file.filename,
        songLength: duration,
        yearOfRelease,
      });

      await song.save();
      return res.status(200).send("Song created");
    } catch (error: any) {
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

export const getSongById = async (req: Request, res: Response, next: NextFunction) => {
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

export const updateSong = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = {}; // Add logic here to update specific fields from req.body
    const result = await Song.findByIdAndUpdate(req.params.id, data, { new: true });
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

export const deleteSong = async (req: Request, res: Response, next: NextFunction) => {
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
