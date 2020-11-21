// Write code to define and export the Employee class
class Employee {
  constructor(name, id, email) {
    // check to make sure that name is a valid string
    if (typeof name !== 'string' || !name.trim().length) {
      throw new Error("Parameter 'name' expected to be a non-empty string");
    }

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