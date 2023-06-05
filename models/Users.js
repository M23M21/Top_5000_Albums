const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user_id: String,
  user_name: String,
  email: String,
  password: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;