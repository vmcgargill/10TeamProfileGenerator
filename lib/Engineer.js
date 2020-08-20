const EmployeeClass = require("./Employee");

class Engineer extends EmployeeClass.Employee {

    constructor(name, ID, email, github) {
        super(name, ID, email);
        this.github = github;
    }

    getGithub() {
        return this.github;
    }

    getRole() {
        return 'Engineer';
    }
}

// Test Create New Engineer
// var vinny = new Engineer("vinny", 123, "example@gmail.com", "vmcgargill")
// console.log(vinny)
// console.log(vinny.getRole())
