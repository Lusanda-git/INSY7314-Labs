const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/User");

const register = async (req, res) => {
  console.log("🔐 Register route hit");

  // ✅ Validate input
  const errors = validationResult(req);
  console.log("📋 Validation errors (register):", errors.array());

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Invalid input",
      errors: errors.array()
    });
  }

  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.warn("⚠️ User already exists:", email);
      return res.status(409).json({ message: "User already exists" });
    }

    const newUser = new User({ email, password });
    await newUser.save();

    if (!process.env.JWT_SECRET) {
      console.error("❌ JWT_SECRET is not defined in .env");
      return res.status(500).json({ message: "Server misconfiguration" });
    }

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(201).json({ token });
  } catch (err) {
    console.error("❌ Registration error:", err.message);
    console.error("🧵 Full stack trace:", err.stack);
    return res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  console.log("🔐 Login route hit");

  // ✅ Validate input
  const errors = validationResult(req);
  console.log("📋 Validation errors (login):", errors.array());

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Invalid input",
      errors: errors.array()
    });
  }

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      console.warn("⚠️ No user found for email:", email);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.warn("⚠️ Password mismatch for user:", email);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!process.env.JWT_SECRET) {
      console.error("❌ JWT_SECRET is not defined in .env");
      return res.status(500).json({ message: "Server misconfiguration" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({ token });
  } catch (err) {
    console.error("❌ Login error:", err.message);
    console.error("🧵 Full stack trace:", err.stack);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { register, login };
