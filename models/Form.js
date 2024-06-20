// const fs = require('fs');
// const path = require('path');

// const formsFilePath = path.join(__dirname, '../data/forms.json');

// class Form {
//   constructor(username, rating, teamLeaderRating = null) {
//     this.username = username;
//     this.rating = rating;
//     this.teamLeaderRating = teamLeaderRating;
//   }

//   save() {
//     const forms = Form.fetchAll();
//     const index = forms.findIndex(form => form.username === this.username);
//     if (index > -1) {
//       forms[index] = this;
//     } else {
//       forms.push(this);
//     }
//     fs.writeFileSync(formsFilePath, JSON.stringify(forms, null, 2));
//   }

//   static fetchAll() {
//     if (!fs.existsSync(formsFilePath)) {
//       return [];
//     }
//     const data = fs.readFileSync(formsFilePath);
//     return JSON.parse(data);
//   }

//   static findByUsername(username) {
//     const forms = Form.fetchAll();
//     return forms.find(form => form.username === username);
//   }

//   static findByTeamLeader(teamLeader) {
//     const users = User.fetchAll().filter(user => user.teamLeader === teamLeader);
//     return users.map(user => Form.findByUsername(user.username)).filter(Boolean);
//   }
// }

// module.exports = Form;

  
const fs = require('fs');
const path = require('path');

const formsFilePath = path.join(__dirname, '../data/forms.json');

class Form {
  constructor(username, rating, teamLeaderRating = null) {
    this.username = username;
    this.rating = rating;
    this.teamLeaderRating = teamLeaderRating;
  }

  save() {
    const forms = Form.fetchAll();
    const index = forms.findIndex(form => form.username === this.username);
    if (index > -1) {
      forms[index] = this;
    } else {
      forms.push(this);
    }
    fs.writeFileSync(formsFilePath, JSON.stringify(forms, null, 2));
  }

  static fetchAll() {
    if (!fs.existsSync(formsFilePath)) {
      return [];
    }
    const data = fs.readFileSync(formsFilePath);
    return JSON.parse(data);
  }

  static findByUsername(username) {
    const forms = Form.fetchAll();
    return forms.find(form => form.username === username);
  }

  static findByTeamLeader(teamLeader) {
    const users = User.fetchAll().filter(user => user.teamLeader === teamLeader);
    return users.map(user => Form.findByUsername(user.username)).filter(Boolean);
  }
}

module.exports = Form;
