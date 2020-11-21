// Write code to define and export the Employee class
class Employee {
  constructor(name, id, email) {

    this.name = name;
    this.id = id;
    this.email = email;
  }
    // write methods getName(), getID(), getEmail(), and getRole()
    getName() {
        return this.name;
    }
    getId() {
        return this.id;
    }
    getEmail() {
        return this.email;
    }
    getRole() {
        return 'Employee';
    }
}

// export this class
module.exports = Employee;