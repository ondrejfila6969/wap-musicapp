import createError from "http-errors";
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
require("dotenv").config();

mongoose
  .connect(
    String(process.env.MONGODB_URL)
  )
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error(err);
  });

import playlistRouter from "./routes/playlist/playlist";
import songRouter from "./routes/song/song";
import userRouter from "./routes/user/user";
import searchRouter from "./routes/search/search";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true, 
}));
app.use(express.static(path.join(__dirname, "public")));
app.use("/songs", express.static(path.join(__dirname, "../public/songs")));
app.use("/pfps", express.static(path.join(__dirname, "../public/pfps")));
app.use("/albumCovers", express.static(path.join(__dirname, "../public/albumCovers")));
app.use("/playlistCovers", express.static(path.join(__dirname, "../public/playlistCovers")));

app.use("/api/user", userRouter);
app.use("/api/playlist", playlistRouter);
app.use("/api/song", songRouter);
app.use("/api/search", searchRouter);

// Catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});

// Error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
});

// Start the server
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});