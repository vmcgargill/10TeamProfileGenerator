// Employee class that creates a blueprint for all employees and establishes that they have a assigned name, id, and email.
class Employee {

    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
    }

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
        return 'Employee'
    }
}

// Emports the employee class to app.js, the tests, and all sub-classes that extent the employee class.
module.exports = Employee;
