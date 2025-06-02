const User = require("../../models/user/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const Playlist = require("../../models/playlist/playlist");
const Song = require("../../models/song/song");



exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Enter your email and password." });
    }

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Wrong email or password." });
    }

    const token = jwt.sign({ userId: user._id, email }, process.env.TOKEN_KEY, {
      expiresIn: "2h",
    });

    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.register = async (req, res) => {
  try {
    const { username, email, password, isArtist } = req.body;

    if (!(username && email && password)) {
      return res.status(400).send({ message: "All fields are required!" });
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res
        .status(400)
        .send({ message: "This email is already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
      isArtist: !!isArtist, // Safely convert to boolean
    });

    await user.save();

    const token = jwt.sign({ userId: user._id, email }, process.env.TOKEN_KEY, {
      expiresIn: "2h",
    });
    res
      .status(201)
      .json({ token, user: { username, email, isArtist: user.isArtist } });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).send({
      message: "User found",
      payload: user,
    });
  } catch (err) {
    res.status(500).json({ erorr: err.message });
  }
};

exports.getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    let user;
    if (mongoose.Types.ObjectId.isValid(id)) {
      user = await User.findById(id).select("-password");
    } else {
      user = await User.findOne({ username: id }).select("-password");
    }

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).send({
      message: "User found",
      payload: user,
    });
  } catch (err) {
    res.status(500).json({ erorr: err.message });
  }
};

exports.updateUsername = async (req, res) => {
  try {
    const { username } = req.body;

    // Update the user document
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { username },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    await Playlist.updateMany(
      { userId: updatedUser._id },
      { $set: { username: username } } 
    );

    await Song.updateMany(
      { uploadedby: updatedUser._id },  
      { $set: { artistName: username } }
    );

    res.status(200).json({ payload: updatedUser });
  } catch (error) {
    console.error("Error updating username:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


