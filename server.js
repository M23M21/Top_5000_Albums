const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

// Import necessary modules
const albumsRouter = require('./routes/albums');

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

// Use the routers for routes starting with /albums
app.use('/albums', albumsRouter);

// Root route
app.get('/', async (req, res) => {
  res.render('index'); // render the index.ejs file when the base URL is accessed
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
