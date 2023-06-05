const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
require('dotenv').config();

// Import necessary modules
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Import your models
const Album = require('./models/Albums');
const User = require('./models/Users');
const Review = require('./models/Reviews');

// Import your routers
const albumsRouter = require('./routes/albums');
const usersRouter = require('./routes/users');
const reviewsRouter = require('./routes/reviews');

// Connect to the MongoDB database
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  });

// Set up EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use the routers for routes starting with /albums, /users, /reviews
app.use('/albums', albumsRouter);
app.use('/users', usersRouter);
app.use('/reviews', reviewsRouter);

// Root route
app.get('/', async (req, res) => {
  try {
    const albums = await Album.find();
    res.render('index', { albums: albums });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve albums' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});