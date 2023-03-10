const { GetUser } = require("../utils/token");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(403).json({ message: "A token is required for authentication." });
  }

  try {
    const decoded = GetUser(token);
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({ message: "Invalid token." });
  }
  return next();
};

module.exports = verifyToken;