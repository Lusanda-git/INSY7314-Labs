import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Note } from './models/Note.mjs';

dotenv.config();

const app = express();
app.use(express.json());

// MongoDB connection
const uri = process.env.ATLAS_URI;

mongoose.connect(uri)
  .then(() => console.log(' Connected to MongoDB Atlas'))
  .catch((err) => console.error(' MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
  res.send('If you are reading this on this URL, no more crying');
});

app.get('/test', (req, res) => {
  res.send('Testing the /test endpoint');
});

app.post('/add-note', async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    await newNote.save();
    res.status(201).send(' Note saved successfully');
  } catch (err) {
    console.error(' Error saving note:', err);
    res.status(500).send('Error saving note');
  }
});

// Server
app.listen(3000, () => {
  console.log('🚀 Express server is running on http://localhost:3000');
});
