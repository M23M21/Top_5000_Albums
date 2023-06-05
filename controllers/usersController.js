const User = require('../models/Users');

// Create a new user
exports.createUser = async (req, res) => {
  const userData = req.body;
  try {
    const user = new User(userData);
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save the user' });
  }
};

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
};

// Get a specific user by ID
exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve the user' });
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const userData = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, userData, { new: true });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update the user' });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ success: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete the user' });
  }
};