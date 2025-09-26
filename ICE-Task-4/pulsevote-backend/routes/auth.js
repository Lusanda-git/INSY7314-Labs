const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const authMiddleware = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);

// ✅ Protected route
router.get("/protected", authMiddleware, (req, res) => {
  res.status(200).json({ message: "Access granted", userId: req.user.id });
});

module.exports = router;
