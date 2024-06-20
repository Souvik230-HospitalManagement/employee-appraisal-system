const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');

class User {
  constructor(username, password, role, teamLeader) {
    this.username = username;
    this.password = password;
    this.role = role;
    this.teamLeader = teamLeader || null;
  }

  save() {
    const users = User.fetchAll();
    users.push(this);
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
  }

  static fetchAll() {
    if (!fs.existsSync(usersFilePath)) {
      return [];
    }
    const data = fs.readFileSync(usersFilePath);
    return JSON.parse(data);
  }

  static findByUsername(username) {
    const users = User.fetchAll();
    return users.find(user => user.username === username);
  }

  static findByTeamLeader(teamLeader) {
    const users = User.fetchAll();
    return users.filter(user => user.teamLeader === teamLeader);
  }
}

module.exports = User;


// const fs = require('fs');
// const path = require('path');

// const usersFilePath = path.join(__dirname, '../data/users.json');

// class User {
//   constructor(username, password, role, teamLeader = null) {
//     this.username = username;
//     this.password = password;
//     this.role = role;
//     this.teamLeader = teamLeader;
//   }

//   save() {
//     const users = User.getAllUsers();
//     users.push(this);
//     fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
//   }

//   static findByUsername(username) {
//     const users = User.getAllUsers();
//     return users.find(user => user.username === username);
//   }

//   static getAllUsers() {
//     if (fs.existsSync(usersFilePath)) {
//       const data = fs.readFileSync(usersFilePath);
//       return JSON.parse(data);
//     }
//     return [];
//   }
// }

// module.exports = User;
