
import path from "path";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function () {
    cb(null, path.join(__dirname, "../../../public/songs"));
  },
  filename: function () {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const filter = () => {
  file.mimetype === "audio/mpeg" ||
  file.mimetype === "audio/wav" ||
  file.mimetype === "audio/x-wav"
    ? cb(null, true)
    : cb(new Error("Invalid file format. Only Mp3 and WAV are allowedJ"));
};

module.exports = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  fileFilter: filter,
});