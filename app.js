/// Import necessary modules
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const seeder = require('./seeder');
require('dotenv').config();
console.log('MONGODB_URI:', process.env.MONGODB_URI);

// Import your models
const Album = require('./models/Albums');
const User = require('./models/Users');
const Review = require('./models/Reviews');
const seeder = require('./seeder');

// Import your routers
const albumsRouter = require('./routes/albumsRoutes');
const usersRouter = require('./routes/usersRoutes');
const reviewsRouter = require('./routes/reviewsRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Connect to the MongoDB database
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log('Connected to MongoDB');

    // Seed the database
    await seeder.seedData();
    console.log('Database seeded successfully!');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  });

// Set EJS as the template engine
app.set('view engine', 'ejs');

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