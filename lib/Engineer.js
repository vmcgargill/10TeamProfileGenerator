// Imports the employee class so we can make a engineer class extension.
const Employee = require("./Employee");

// Engineer class, an employee class extension that adds a github for each engineer.
class Engineer extends Employee {

    constructor(name, id, email, github) {
        super(name, id, email);
        this.github = github;
    }

    getGithub() {
        return this.github;
    }

    getRole() {
        return 'Engineer';
    }
}

// Exports the engineer class to the app.js file and to the tests.
module.exports = Engineer;
