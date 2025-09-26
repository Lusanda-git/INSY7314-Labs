const jwt = require("jsonwebtoken");
const User = require("../models/User");

const register = async (req, res) => {
  console.log("Register route hit");
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      return res.status(400).json({ message: "Invalid email format" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(409).json({ message: "User already exists" });

    const newUser = new User({ email, password });
    await newUser.save();

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined in .env");
      return res.status(500).json({ message: "Server misconfiguration" });
    }

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(201).json({ token });
 } catch (err) {
  console.error("Registration error:", err.message);
  console.error("Full stack:", err.stack);
  return res.status(500).json({ message: "Server error" });
}

};

const login = async (req, res) => {
  console.log("Login route hit");
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined in .env");
      return res.status(500).json({ message: "Server misconfiguration" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({ token });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { register, login };
