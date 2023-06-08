// Import necessary modules
const express = require('express');
const User = require('./models/Users');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const bcrypt = require('bcrypt');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
require('dotenv').config();
const jwt = require('jsonwebtoken');

// Import necessary routes
const albumsRouter = require('./routes/albums');
const reviewsRouter = require('./routes/reviews');
const usersRouter = require('./routes/users');

app.use(express.static('public'));

// MongoDB connection
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error.message));

// Set up EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

// Routes
app.use('/albums', albumsRouter);
app.use('/reviews', reviewsRouter);
app.use('/users', usersRouter);

// Root route
app.get('/', (req, res) => res.render('index', { loginSuccess: req.query.loginSuccess === 'true' }));



// Signup form route
app.get('/signup', (req, res) => res.render('signup', { signupSuccess: false }));

// Signup route
app.post('/users/signup', (req, res) => {
  const { username, email, password } = req.body;
  // Perform signup logic here
  res.render('signup', { signupSuccess: true });
});

// Login form route
app.get('/login', (req, res) => {
  const { signupSuccess, failedAttempt } = req.query;
  res.render('login', {
    signupSuccess: signupSuccess === 'true',
    failedAttempt: failedAttempt === 'true'
  });
});


// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email }); // find the user with given email

    if (!user) {
      return res.redirect('/login?failedAttempt=true');
    }

    const isValidPassword = await bcrypt.compare(password, user.password); // compare the given password with the hashed password from the database

    if (!isValidPassword) {
      return res.redirect('/login?failedAttempt=true');
    }

    // Authentication successful, redirect to index page without any query parameter
    return res.redirect('/?loginSuccess=true');
  } catch (err) {
    console.error(err);
    res.redirect('/login?failedAttempt=true');
  }
});



// Start the server
app.listen(port, () => console.log(`Server started on http://localhost:${port}`));
