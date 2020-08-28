// Imports the employee class so we can make a manager class extension.
const Employee = require("./Employee");

// Manager class, an employee class extension that adds a office number for each manager.
class Manager extends Employee {

    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber;
    }

    getOfficeNumber() {
        return this.officeNumber;
    }

    getRole() {
        return 'Manager';
    }
}

// Exports the manager class to the app.js file and to the tests.
module.exports = Manager;