import express from "express";
import Post from "../models/post.js";
import checkAuth from "../middleware/check-auth.js";

const router = express.Router();

// GET /post → Fetch all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).send("Error fetching posts");
  }
});

// POST /post/upload → Create new post (protected)
router.post("/upload", checkAuth, async (req, res) => {
  try {
    const post = new Post(req.body);
    await post.save();
    res.status(201).send("Post created");
  } catch (err) {
    res.status(400).send("Error creating post");
  }
});

// PATCH /post/:id → Update post
router.patch("/:id", async (req, res) => {
  try {
    await Post.findByIdAndUpdate(req.params.id, req.body);
    res.send("Post updated");
  } catch (err) {
    res.status(400).send("Error updating post");
  }
});

// DELETE /post/:id → Delete post (protected)
router.delete("/:id", checkAuth, async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.send("Post deleted");
  } catch (err) {
    res.status(400).send("Error deleting post");
  }
});

export default router;
