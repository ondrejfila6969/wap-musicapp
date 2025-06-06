import path from "path";
import multer, { FileFilterCallback } from "multer";
import { Request } from "express";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../../public/songs"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const filter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (
    file.mimetype === "audio/mpeg" ||
    file.mimetype === "audio/wav" ||
    file.mimetype === "audio/x-wav"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file format. Only MP3 and WAV are allowed"));
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 100, // 100MB
  },
  fileFilter: filter,
});

export default upload;