// const express = require('express');
// const validateToken = require('../utils/validateToken');
// const Form = require('../models/Form');

// const router = express.Router();

// router.get('/allRatings', validateToken, (req, res) => {
//   if (req.user.role !== 'hr') {
//     return res.status(403).json({ message: 'Access denied' });
//   }

//   const forms = Form.fetchAll();
//   res.json(forms);
// });

// module.exports = router;



const express = require('express');
const validateToken = require('../utils/validateToken');
const Form = require('../models/Form');

const router = express.Router();

router.get('/allRatings', validateToken, (req, res) => {
  if (req.user.role !== 'hr') {
    return res.status(403).json({ message: 'Access denied' });
  }

  const forms = Form.fetchAll();
  res.json(forms);
});

module.exports = router;
