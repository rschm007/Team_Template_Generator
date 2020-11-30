// Write code to define and export the Engineer class.
const Employee = require("./Employee");

class Engineer extends Employee {
  constructor(name, id, email, github) {
    super(name, id, email)

    this.github = github;
  }
  //   method that returns the value of the github account
  getGithub() {
    return this.github;
  }
  getRole() {
    return 'Engineer';
  }
}

// export this class
module.exports = Engineer
