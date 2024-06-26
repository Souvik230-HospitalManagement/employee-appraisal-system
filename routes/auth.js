const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { jwtSecret } = require('../config/config');
const validateToken = require('../utils/validateToken');

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  const { username, password, role, teamLeader, hr, ceo } = req.body;
  
  // Validate input fields
  if (!username || !password || !role || 
      (role === 'employee' && !teamLeader) ||
      (role === 'team_leader' && !hr) ||
      (role === 'hr' && !ceo)) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Check if user already exists
  const existingUser = await User.findByUsername(username); // Note: `await` added for async function
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash password and create new user
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User(username, hashedPassword, role, 
                            role === 'employee' ? teamLeader : null,
                            role === 'team_leader' ? hr : null,
                            role === 'hr' ? ceo : null);
  await newUser.save();

  res.redirect('/login.html'); // Redirect to login page upon successful registration
});

// User login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findByUsername(username); // Note: `await` added for async function
  
  // Validate username and password
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Generate JWT token
  const token = jwt.sign({ username, role: user.role }, jwtSecret, { expiresIn: '1h' });
  res.cookie('token', token, { httpOnly: true });

  // Redirect based on user role
  if (user.role === 'employee') {
    res.redirect('/employee.html'); // Redirect to employee page upon successful login
  } else if (user.role === 'team_leader') {
    res.redirect('/teamleader.html'); // Redirect to team leader page upon successful login
  } else if (user.role === 'hr') {
    res.redirect('/hr.html'); // Redirect to HR page upon successful login
  }
});

// Get current user information
router.get('/user', validateToken, async (req, res) => {
  const user = await User.findByUsername(req.user.username); // Note: `await` added for async function
  res.json(user);
});

module.exports = router;
