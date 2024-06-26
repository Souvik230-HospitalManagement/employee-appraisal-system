// // models/Form.js
// const fs = require('fs');
// const path = require('path');

// const dataPath = path.join(__dirname, '..', 'data', 'forms.json');

// class Form {
//   constructor(username, email, department, selfRating, teamLeaderRating = null, hrRating = null) {
//     this.username = username;
//     this.email = email;
//     this.department = department;
//     this.selfRating = selfRating;
//     this.teamLeaderRating = teamLeaderRating;
//     this.hrRating = hrRating;
//   }

//   static fetchAll() {
//     return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
//   }

//   static findByUsername(username) {
//     const forms = Form.fetchAll();
//     return forms.find(form => form.username === username);
//   }

//   save() {
//     const forms = Form.fetchAll();
//     const existingFormIndex = forms.findIndex(form => form.username === this.username);

//     if (existingFormIndex !== -1) {
//       forms[existingFormIndex] = this;
//     } else {
//       forms.push(this);
//     }

//     fs.writeFileSync(dataPath, JSON.stringify(forms, null, 2));
//   }
// }

// module.exports = Form;




// models/Form.js
const fs = require('fs');
const path = require('path');
const formsPath = path.join(__dirname, '../data/forms.json');
let forms = require(formsPath);

class Form {
  constructor(username, email, department, selfRating, teamLeaderRating = null, hrRating = null) {
    this.username = username;
    this.email = email;
    this.department = department;
    this.selfRating = selfRating;
    this.teamLeaderRating = teamLeaderRating;
    this.hrRating = hrRating;
  }

  static fetchAll() {
    return forms;
  }

  static findByUsername(username) {
    return forms.find(form => form.username === username);
  }

  save() {
    const existingIndex = forms.findIndex(form => form.username === this.username);
    if (existingIndex >= 0) {
      forms[existingIndex] = this;
    } else {
      forms.push(this);
    }
    fs.writeFileSync(formsPath, JSON.stringify(forms, null, 2));
  }
}

module.exports = Form;
