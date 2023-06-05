const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// Create a new user
router.post('/', usersController.createUser);

// Get all users
router.get('/', usersController.getUsers);

// Get a specific user by ID
router.get('/:id', usersController.getUserById);

// Update a user
router.put('/:id', usersController.updateUser);

// Delete a user
router.delete('/:id', usersController.deleteUser);

module.exports = router;