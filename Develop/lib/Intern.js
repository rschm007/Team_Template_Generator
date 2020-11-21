// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Intern extends Employee {
  constructor(name, id, email, school) {
    super(name, id, email, school);
    if (!school) {
      throw new Error("You are missing the GitHub address.");
    }
    this.school = school;
  }
  //   method that returns the value of the github account
  getGithub() {
    console.log(`School: ${this.school}`);
  }
  getRole() {
    console.log(`Role: Intern`);
  }
}

// export this class
module.exports = Intern;
