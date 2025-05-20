import { Request, Response, NextFunction } from "express";
import User from "../../models/user/user";

export const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const data = await User.find();
    if (data && data.length !== 0) {
      return res.status(200).json({
        message: "Users found",
        payload: data,
      });
    }
    return res.status(404).json({ message: "Users not found" });
  } catch (e: any) {
    return res.status(500).json({ error: e.message });
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const data = await User.findById(req.params.id);
    if (data) {
      return res.status(200).json({
        message: "User found",
        payload: data,
      });
    }
    return res.status(404).json({ message: "User not found" });
  } catch (e: any) {
    return res.status(500).json({ error: e.message });
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const username = req.body.username;
    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    const user = new User({ username });
    const result = await user.save();

    return res.status(201).json({
      message: "User created",
      payload: result,
    });
  } catch (e: any) {
    return res.status(500).json({ error: e.message });
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const username = req.body.username;
    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    const result = await User.findByIdAndUpdate(
      req.params.id,
      { username },
      { new: true }
    );

    if (result) {
      return res.status(200).json({
        message: "User updated",
        payload: result,
      });
    }
    return res.status(404).json({ message: "User not updated" });
  } catch (e: any) {
    return res.status(500).json({ error: e.message });
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const result = await User.findByIdAndDelete(req.params.id);
    if (result) {
      return res.status(200).json({
        message: "User deleted",
        payload: result,
      });
    }
    return res.status(404).json({ message: "User not deleted" });
  } catch (e: any) {
    return res.status(500).json({ error: e.message });
  }
};
