// routes/employee.js
const express = require('express');
const router = express.Router();
const { forms } = require('../data/forms.json');
const authenticateToken = require('../utils/authMiddleware');
const Form = require('../models/Form');

router.post('/submit', authenticateToken, (req, res) => {
  const { selfRating } = req.body;
  const employeeId = req.user.id; // Assuming user object has id
  const newForm = new Form(employeeId, selfRating, null, null);
  forms.push(newForm);
  // Save to JSON file (simplified, in real app use fs.writeFile)
  res.status(201).send('Form submitted successfully');
});

router.get('/self-ratings', authenticateToken, (req, res) => {
  const employeeId = req.user.id; // Assuming user object has id
  const selfRatings = forms.filter(form => form.employeeId === employeeId)
                           .map(form => ({ selfRating: form.selfRating }));
  res.json(selfRatings);
});

module.exports = router;


// const express = require('express');
// const validateToken = require('../utils/validateToken');
// const Form = require('../models/Form');
// const User = require('../models/User');
// const router = express.Router();

// router.post('/submitRating', validateToken, (req, res) => {
//   const { username, email, role, rating } = req.body;
//   if (!username || !email || !role || !rating) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   const newRating = new Form(username, email, role, rating);
//   Form.saveRating(newRating);

//   res.send('Rating submitted successfully');
// });

// module.exports = router;
