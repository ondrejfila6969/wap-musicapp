const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token)
    return res.status(403).json({ message: "A token is required for authentication" });
  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.TOKEN_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token " });
  }
};

module.exports = verifyToken;