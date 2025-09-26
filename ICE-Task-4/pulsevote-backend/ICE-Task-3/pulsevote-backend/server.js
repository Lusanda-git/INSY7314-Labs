const mongoose = require('mongoose');
const app = require('./app');
const https = require('https');
const fs = require('fs');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => {
  console.error('❌ MongoDB connection error:', err.message);
  process.exit(1); // Exit if DB fails
});

// ✅ HTTPS server options
const options = {
  key: fs.readFileSync('ssl/key.pem'),
  cert: fs.readFileSync('ssl/cert.pem'),
};

// ✅ Start HTTPS server
https.createServer(options, app).listen(PORT, () => {
  console.log(`🚀 Server running at https://localhost:${PORT}`);
});
