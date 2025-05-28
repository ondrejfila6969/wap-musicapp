import { Request, Response, NextFunction } from "express";
import Playlist from "../../models/playlist/playlist";
import User from "../../models/user/user";
import Song from "../../models/song/song";

export const MainSearch = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { term } = req.params;
  try {
    const users = await User.find({
      userName: { $regex: term, $options: "i" },
    }).limit(3);

    const playlists = await Playlist.find({
      name: { $regex: term, $options: "i" },
      type: "playlist",
    }).limit(3);

    const albums = await Playlist.find({
      name: { $regex: term, $options: "i" },
      type: "album",
    }).limit(4);

    res.json({
      payload: {
        users,
        playlists,
        albums,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Search failed", error });
  }
};
