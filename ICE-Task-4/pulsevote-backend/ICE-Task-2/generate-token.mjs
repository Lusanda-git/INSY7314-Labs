import jwt from "jsonwebtoken";

const payload = { username: "Lusanda", role: "student" };
const secret = "your_jwt_secret_here"; // must match your .env JWT_SECRET

const token = jwt.sign(payload, secret, { expiresIn: "1h" });
console.log("✅ Your JWT token:\n", token);
