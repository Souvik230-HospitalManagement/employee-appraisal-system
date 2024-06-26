const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const authRoutes = require('./routes/auth');
const employeeRoutes = require('./routes/employee');
const teamLeaderRoutes = require('./routes/teamLeader');
const hrRoutes = require('./routes/hr');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRoutes);
app.use('/employee', employeeRoutes);
app.use('/teamleader', teamLeaderRoutes);
app.use('/hr', hrRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});


// const express = require('express');
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const path = require('path');
// const authRoutes = require('./routes/auth');
// const employeeRoutes = require('./routes/employee');
// const teamLeaderRoutes = require('./routes/teamLeader');
// const hrRoutes = require('./routes/hr');

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());

// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/auth', authRoutes);
// app.use('/employee', employeeRoutes);
// app.use('/teamleader', teamLeaderRoutes);
// app.use('/hr', hrRoutes);

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'register.html'));
// });

// app.listen(PORT, () => {
//   console.log(`Server started on port ${PORT}`);
// });
