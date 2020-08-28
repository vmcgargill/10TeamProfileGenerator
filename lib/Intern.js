// Imports the employee class so we can make a intern class extension.
const Employee = require("./Employee");

// Intern class, an employee class extension that adds a school for each intern.
class Intern extends Employee {

    constructor(name, id, email, school) {
        super(name, id, email);
        this.school = school;
    }

    getSchool() {
        return this.school;
    }

    getRole() {
        return 'Intern';
    }
}

// Exports the intern class to the app.js file and to the tests.
module.exports = Intern;
