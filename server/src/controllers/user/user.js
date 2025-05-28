const User = require("../../models/user/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
    console.log("register")
    const { username, email, password } = req.body;

    if (!(username && email && password))
      return res.status(400).send({ message: "All fields are required!" });

    console.log("1")
    const userExist = await User.findOne({ email });
    if (userExist)
      return res
        .status(400)
        .send({ message: "This email is already registered." });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    console.log("3")
    const token = jwt.sign({ userId: user._id, email }, process.env.TOKEN_KEY, {
      expiresIn: "2h",
    });
    console.log(4)
    res.status(201).json({ token, user: { username, email } });
  } catch (err) {
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
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).send({
      message: "User found",
      payload: user,
    });
  } catch (err) {
    res.status(500).json({ erorr: err.message });
  }
};
