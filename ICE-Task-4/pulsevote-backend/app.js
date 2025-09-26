const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// ✅ Security & parsing middleware
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://localhost:5173"],
      styleSrc: ["'self'", "https://localhost:5173"],
      imgSrc: ["'self'", "data:"],
      connectSrc: ["'self'", "https://localhost:5000"],
      fontSrc: ["'self'", "https://fonts.googleapis.com"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  })
);
app.use(cors({
  origin: "https://localhost:5173",
  credentials: true
}));
app.use(express.json());

// ✅ Auth routes (corrected path)
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// ✅ Protected route
const authMiddleware = require('./middleware/auth');
app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({
    message: `Welcome, user ${req.user.id}! You have accessed protected data.`,
    timestamp: new Date()
  });
});

// ✅ Test endpoints
app.get('/', (req, res) => {
  res.send('PulseVote API running!');
});

app.get('/test', (req, res) => {
  res.json({ message: 'Testing that PulseVote API running!' });
});

module.exports = app;
