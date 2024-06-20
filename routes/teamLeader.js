const express = require('express');
const validateToken = require('../utils/validateToken');
const Form = require('../models/Form');
const User = require('../models/User');

const router = express.Router();

router.get('/team', validateToken, (req, res) => {
  if (req.user.role !== 'team_leader') {
    return res.status(403).json({ message: 'Access denied' });
  }

  const teamMembers = User.findByTeamLeader(req.user.username);
  res.json(teamMembers);
});

router.post('/rateEmployee', validateToken, (req, res) => {
  if (req.user.role !== 'team_leader') {
    return res.status(403).json({ message: 'Access denied' });
  }

  const { username, teamLeaderRating } = req.body;
  const form = Form.findByUsername(username);

  if (form) {
    form.teamLeaderRating = teamLeaderRating;
    form.save();
  }

  res.redirect('/teamleader.html');
});

module.exports = router;


// const express = require('express');
// const validateToken = require('../utils/validateToken');
// const Form = require('../models/Form');
// const User = require('../models/User');
// const router = express.Router();

// router.get('/ratings', validateToken, (req, res) => {
//   if (req.user.role !== 'team_leader') {
//     return res.status(403).json({ message: 'Access denied' });
//   }

//   const users = User.getAllUsers();
//   const teamMembers = users.filter(user => user.teamLeader === req.user.username);
//   const ratings = Form.getAllRatings().filter(rating => 
//     teamMembers.some(member => member.username === rating.username)
//   );

//   res.json(ratings);
// });

// router.post('/rateEmployee', validateToken, (req, res) => {
//   if (req.user.role !== 'team_leader') {
//     return res.status(403).json({ message: 'Access denied' });
//   }

//   const { username, rating } = req.body;
//   const users = User.getAllUsers();
//   const teamMember = users.find(user => user.username === username && user.teamLeader === req.user.username);

//   if (!teamMember) {
//     return res.status(400).json({ message: 'Employee not found or not part of your team' });
//   }

//   const newRating = new Form(username, teamMember.email, teamMember.role, rating);
//   Form.saveRating(newRating);

//   res.send('Rating submitted successfully');
// });

// module.exports = router;
