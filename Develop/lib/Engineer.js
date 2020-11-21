// Write code to define and export the Engineer class.
const Employee = require("./Employee");

class Engineer extends Employee {
  constructor(name, id, email, github) {
    super(name, id, email, github)
    if (!github) {
      throw new Error("You are missing the GitHub address.");
    }
    this.github = github;
  }
  //   method that returns the value of the github account
  getGithub() {
    console.log(`GitHub: ${this.github}`);
  }
  getRole() {
    console.log(`Role: Engineer`);
  }
}

// export this class
module.exports = Engineer
