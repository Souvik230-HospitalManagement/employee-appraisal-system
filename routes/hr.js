// routes/hr.js
const express = require('express');
const router = express.Router();
const Form = require('../models/Form');
const validateToken = require('../utils/validateToken');

// Fetch all ratings
router.get('/allRatings', validateToken, (req, res) => {
  const forms = Form.fetchAll();
  res.json(forms);
});

// HR rating an employee or team leader
router.post('/rateEmployee', validateToken, (req, res) => {
  const { username, hrRating } = req.body;
  const form = Form.findByUsername(username);

  if (form) {
    form.hrRating = hrRating;
    form.save();
    res.status(201).send('HR rating submitted successfully');
  } else {
    res.status(404).json({ message: 'Form not found for the user' });
  }
});

module.exports = router;
