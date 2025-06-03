import User from "../../models/user/user";
import path from "path";
import fs from "fs";
import pfpController from "./pfpController";
import { Request, Response, NextFunction } from "express";

const pfpFile = pfpController.single("pfpFile");

export const saveFileIntoFolder = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  pfpFile(req, res, (err: any) => {
    if (err) {
      console.error("Multer error:", err);
      return res
        .status(500)
        .json({ message: err.message || "File upload error" });
    }
    next();
  });
};

export const deletePhoto = async (filePath: string): Promise<void> => {
  const defaultPath = path.join(
    __dirname,
    "../../../public/pfps/Default_pfp.png"
  );
  if (filePath === defaultPath) return;
  try {
    await fs.promises.unlink(filePath);
  } catch (err) {
    console.log("Error with Deleting Image");
    console.error(err);
  }
};

export const uploadProfilePicture = [
  saveFileIntoFolder,
  async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const user = await User.findById(req.params.id);
      if (!user) {
        deletePhoto(
          path.join(__dirname, `../../../public/pfps/${req.file.filename}`)
        );

        return res.status(404).json({ message: "User not found" });
      }

      await deletePhoto(
        path.join(
          __dirname,
          `../../../public/pfps/${user.pfpSrc.substring(26)}`
        )
      );
      
      const newPath = `http://localhost:3000/pfps/${req.file.filename}`;
      user.pfpSrc = newPath;
      await user.save();

      res.status(200).json({ payload: newPath });
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
];
