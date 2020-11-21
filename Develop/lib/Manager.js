// TODO: Write code to define and export the Manager class.
const Employee = require("./Employee");

class Manager extends Employee {
  constructor(name, id, email, officeNumber) {
    super(name, id, email, officeNumber);
    if (!officeNumber) {
      throw new Error("You are missing the Office Number.");
    }
    this.officeNumber = officeNumber;
  }
  //   method that returns the value of the github account
  getGithub() {
    console.log(`Office Number: ${this.officeNumber}`);
  }
  getRole() {
    console.log(`Role: Manager`);
  }
}

// export this class
module.exports = Manager;
