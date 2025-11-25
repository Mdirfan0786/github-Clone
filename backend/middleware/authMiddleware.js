const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "no token, Authorization failed!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Error While Authorize : ", err.message);
    return res.status(401).json({ message: "invalid token" });
  }
};

module.exports = authMiddleware;
