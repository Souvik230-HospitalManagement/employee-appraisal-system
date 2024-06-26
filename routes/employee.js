const express = require('express');
const router = express.Router();
const validateToken = require('../utils/validateToken');
const Form = require('../models/Form');

router.post('/submit', validateToken, (req, res) => {
  const { username, email, department, selfRating } = req.body;
  const newForm = new Form(username, email, department, selfRating);
  newForm.save();

  res.status(201).send('Form submitted successfully');
});

router.get('/self-ratings', validateToken, (req, res) => {
  const username = req.user.username;
  const selfRatings = Form.fetchAll().filter(form => form.username === username)
                                    .map(form => ({ selfRating: form.selfRating }));
  res.json(selfRatings);
});

module.exports = router;
