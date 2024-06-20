// // utils/validateToken.js
// const jwt = require('jsonwebtoken');
// const { jwtSecret } = require('../config/config'); // Import JWT secret from config/config.js

// function generateAccessToken(user) {
//   return jwt.sign(user, jwtSecret, { expiresIn: '1h' });
// }

// module.exports = { generateAccessToken };
// utils/validateToken.js
// utils/validateToken.js
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config');

module.exports = function(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ message: 'Token is not valid' });
  }
};
