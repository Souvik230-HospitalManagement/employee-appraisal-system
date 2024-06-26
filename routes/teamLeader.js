// // routes/teamLeader.js
// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const Form = require('../models/Form');
// const authenticateToken = require('../utils/authMiddleware');

// router.get('/team', authenticateToken, (req, res) => {
//   const teamLeader = req.user.username;
//   const teamMembers = User.findByTeamLeader(teamLeader);
//   res.json(teamMembers);
// });

// router.post('/rateEmployee', authenticateToken, (req, res) => {
//   const { username, teamLeaderRating } = req.body;
//   const form = Form.findByUsername(username);

//   if (form) {
//     if (!form.selfRating) {
//       return res.status(400).json({ message: 'Employee has not submitted self-rating' });
//     }

//     form.teamLeaderRating = teamLeaderRating;
//     form.save();
//     res.status(201).send('Team leader rating submitted successfully');
//   } else {
//     res.status(404).json({ message: 'Form not found for the user' });
//   }
// });

// module.exports = router;



// routes/teamLeader.js
// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const Form = require('../models/Form');
// const authenticateToken = require('../utils/authMiddleware');

// router.get('/team', authenticateToken, (req, res) => {
//   const teamLeader = req.user.username;
//   const teamMembers = User.findByTeamLeader(teamLeader);
//   res.json(teamMembers);
// });

// router.post('/rateEmployee', authenticateToken, (req, res) => {
//   const { username, teamLeaderRating } = req.body;
//   const form = Form.findByUsername(username);

//   if (form) {
//     if (!form.selfRating) {
//       return res.status(400).json({ message: 'Employee has not submitted self-rating' });
//     }

//     form.teamLeaderRating = teamLeaderRating;
//     form.save();
//     res.status(201).send('Team leader rating submitted successfully');
//   } else {
//     res.status(404).json({ message: 'Form not found for the user' });
//   }
// });

// module.exports = router;




// routes/teamLeader.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Form = require('../models/Form');
const authenticateToken = require('../utils/authMiddleware');

router.get('/team', authenticateToken, (req, res) => {
  const teamLeader = req.user.username;
  const teamMembers = User.findByTeamLeader(teamLeader);
  res.json(teamMembers);
});

router.post('/rateEmployee', authenticateToken, (req, res) => {
  const { username, teamLeaderRating } = req.body;
  const form = Form.findByUsername(username);

  if (form) {
    if (!form.selfRating) {
      return res.status(400).json({ message: 'Employee has not submitted self-rating' });
    }

    form.teamLeaderRating = teamLeaderRating;
    form.save();
    res.status(201).send('Team leader rating submitted successfully');
  } else {
    res.status(404).json({ message: 'Form not found for the user' });
  }
});

module.exports = router;
