// models/User.js

const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '..', 'data', 'User.json');

class User {
  constructor(username, password, role, teamLeader, hr, ceo) {
    this.username = username;
    this.password = password;
    this.role = role;
    this.teamLeader = teamLeader;
    this.hr = hr;
    this.ceo = ceo;
  }

  static findByUsername(username) {
    const users = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    return users.find(user => user.username === username);
  }

  static findByTeamLeader(teamLeader) {
    const users = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    return users.filter(user => user.teamLeader === teamLeader);
  }

  save() {
    const users = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    users.push(this);
    fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));
  }
}

module.exports = User;
