require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDb = require('./config/db');

const authRoutes = require('./routes/auth');
const postsRoutes = require('./routes/posts');
const commentsRoutes = require('./routes/comments');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/comments', commentsRoutes);


app.get('/', (req, res) => {
  res.send('Golden-B API is running. Use the /api endpoints.');
});

const PORT = process.env.PORT || 5000;

connectDb(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Failed to connect to DB', err);
    process.exit(1);
  });
