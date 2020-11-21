// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Intern extends Employee {
  constructor(name, id, email, school) {
    super(name, id, email);
    
    this.school = school;
  }
  //   method that returns the value of the github account
  getSchool() {
    return this.school;
  }
  getRole() {
    return 'Intern';
  }
}

// export this class
module.exports = Intern;
