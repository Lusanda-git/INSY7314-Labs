import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/conn.js";
import postRoutes from "./routes/post.mjs";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

(async () => {
  console.log("🚀 Starting ICE Task 2 backend...");

  try {
    await connectDB(); // Ensures DB is connected before server starts
    console.log("✅ MongoDB connection established");

    // Middleware
    app.use(cors());
    app.use(express.json());

    // Routes
    app.use("/post", postRoutes); // All post routes scoped under /post

    // Health check
    app.get("/", (req, res) => {
      res.status(200).send("✅ ICE Task 2 Backend Running");
    });

    console.log("📡 Reached app.listen()");

    app.listen(PORT, () => {
      console.log(`🌐 Server listening at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Backend startup failed:", err.message);
    process.exit(1);
  }
})();
