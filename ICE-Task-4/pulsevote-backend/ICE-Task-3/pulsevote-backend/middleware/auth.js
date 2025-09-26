const jwt = require("jsonwebtoken");

// ✅ JWT authentication middleware
module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 🔒 Check for Bearer token
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.warn("No token provided in Authorization header");
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // ✅ Verify token and attach user
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return res.status(401).json({ message: "Invalid token", error: err.message });
  }
};
