// const express = require('express');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const { jwtSecret } = require('../config/config');
// const validateToken = require('../utils/validateToken');

// const router = express.Router();

// router.post('/register', async (req, res) => {
//   const { username, password, role, teamLeader } = req.body;
  
//   if (!username || !password || !role || (role === 'employee' && !teamLeader)) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   const existingUser = User.findByUsername(username);
//   if (existingUser) {
//     return res.status(400).json({ message: 'User already exists' });
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);
//   const newUser = new User(username, hashedPassword, role, teamLeader);
//   newUser.save();

//   res.redirect('/login.html'); // Redirect to login page upon successful registration
// });

// router.post('/login', async (req, res) => {
//   const { username, password } = req.body;
//   const user = User.findByUsername(username);
  
//   if (!user || !(await bcrypt.compare(password, user.password))) {
//     return res.status(400).json({ message: 'Invalid credentials' });
//   }

//   const token = jwt.sign({ username, role: user.role }, jwtSecret, { expiresIn: '1h' });
//   res.cookie('token', token, { httpOnly: true });

//   if (user.role === 'employee') {
//     res.redirect('/employee.html');
//   } else if (user.role === 'team_leader') {
//     res.redirect('/teamleader.html');
//   } else if (user.role === 'hr') {
//     res.redirect('/hr.html');
//   }
// });

// router.get('/user', validateToken, (req, res) => {
//   const user = User.findByUsername(req.user.username);
//   res.json(user);
// });

// module.exports = router;







const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { jwtSecret } = require('../config/config');
const validateToken = require('../utils/validateToken');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password, role, teamLeader } = req.body;
  
  if (!username || !password || !role || (role === 'employee' && !teamLeader)) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const existingUser = User.findByUsername(username);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User(username, hashedPassword, role, teamLeader);
  newUser.save();

  res.redirect('/login.html'); // Redirect to login page upon successful registration
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = User.findByUsername(username);
  
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ username, role: user.role }, jwtSecret, { expiresIn: '1h' });
  res.cookie('token', token, { httpOnly: true });

  if (user.role === 'employee') {
    res.redirect('/employee.html');
  } else if (user.role === 'team_leader') {
    res.redirect('/teamleader.html');
  } else if (user.role === 'hr') {
    res.redirect('/hr.html');
  }
});

router.get('/user', validateToken, (req, res) => {
  const user = User.findByUsername(req.user.username);
  res.json(user);
});

module.exports = router;
