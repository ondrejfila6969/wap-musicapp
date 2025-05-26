import createError from "http-errors";
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";

mongoose
  .connect(
    "mongodb+srv://admin:adminadmin@cluster0.zymn1.mongodb.net/?retryWrites=true&w=majority&appName=cluster0"
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

const app = express();

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use("/songs", express.static(path.join(__dirname, "public/songs")));
app.use("/pfps", express.static(path.join(__dirname, "../public/pfps/")));

app.use("/user", userRouter);
app.use("/playlist", playlistRouter);
app.use("/song", songRouter);

// Catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});

// Error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

// Start the server
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
