const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const SALT_ROUNDS = 10;

// Async wrapper to avoid try/catch blocks
const wrapAsync = (fn) => (req, res, next) => 
  Promise.resolve(fn(req, res, next)).catch(next);
  
// Signup routes
router.get('/signup', (req, res) => {
  res.render('signup', { signupSuccess: false });
});

router.post('/signup', wrapAsync(async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const newUser = new User({
    username: username, // Use the 'username' value from the form to populate the 'user_name' field in the database
    email,
    password: hashedPassword
  });

  await newUser.save();
  res.render('signup', { signupSuccess: true });
}));

router.post('/login', wrapAsync(async (req, res) => {
  console.log(req.body); 
  const { email, password } = req.body;
  console.log(`Attempting to log in with email: ${email}, password: ${password}`); // Debug statement

  const user = await User.findOne({ email });
  console.log(user);

  if (!user) {
    console.log(`User not found with email: ${email}`); // Debug statement
    return res.status(401).send('Invalid credentials');
  }

  console.log(`Found user: ${JSON.stringify(user)}`); // Debug statement

  bcrypt.compare(password, user.password, function(err, result) {
    if(err) {
      console.error(`Error comparing passwords: ${err}`); // Debug statement
      return res.status(500).send('Internal Server Error');
    }
    
    if(result) {
      console.log('Password comparison successful, login successful'); // Debug statement
      res.send('Login successful');
    } else {
      console.log('Password comparison failed, login failed'); // Debug statement
      res.status(401).send('Invalid credentials');
    }
  });
}));



// CRUD routes
router.post('/create', wrapAsync(async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
}));

router.get('/', wrapAsync(async (req, res) => {
  const users = await User.find();
  res.render('users', { users }); // Pass the users to the 'users.ejs' view
}));

router.get('/:id', (req, res) => {
    const userId = req.params.id;
  
    User.findById(userId)
      .then(user => {
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        
        console.log(user); // Log the user object to the console
        res.json(user); // Send the user object as the response
      })
      .catch(error => {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Failed to fetch user' });
      });
  });

router.put('/:id', wrapAsync(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json(user);
}));

router.delete('/:id', wrapAsync(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json({ message: 'User deleted successfully' });
}));

// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Server Error');
});

module.exports = router;
