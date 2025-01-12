const mongoose = require('mongoose');
const User = require('../models/userModel');
const bcrypt = require('../utils/bcryptUtils');
const jwt = require('../utils/jwtUtils');

exports.register =  async (req, res) => {
  try {
    const user = req.body;
    const { email } = req.body;
    const isuser = await User.findOne({ email });
    if (email == isuser.email) {
        return res.status(400).json({ message: 'User already registered.' });
    }
    user.password = await bcrypt.hashPassword(user.password, 10);
    const dbuser = await User.create(user);
    res.status(201).json({ dbuser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid user credentials. Please try again!' });
    }
    const isMatch = await bcrypt.comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid user credentials. Please try again!' });
    }
    const token = jwt.generateToken(user);
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

exports.preferences = async (req, res) => {
  userEmail = req.user.email;
  const user = await User.findOne({ email });
  userPreferences = user.preferences;
  if (!userPreferences) {
      userPreferences = {};
  }
  res.status(200).json({ preferences: userPreferences });
};

exports.updatePreferences = async (req, res) => {
  userEmail = req.user.email;
  const user = await User.findOne({ email });
  userPreferences = user.preferences;
  if (!userPreferences) {
      userPreferences = {};
  }
  user.preferences = req.body.preferences;
  res.status(200).json({ message: 'Updated Preferences Successfully.' });
};