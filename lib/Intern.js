const EmployeeClass = require("./Employee");

class Intern extends EmployeeClass.Employee {

    constructor(name, ID, email, school) {
        super(name, ID, email);
        this.school = school;
    }

    getSchool() {
        return this.school;
    }

    getRole() {
        return 'Intern';
    }
}

// Test Create New Intern
// var vinny = new Intern("vinny", 123, "example@gmail.com", "University of Denver")
// console.log(vinny)
// console.log(vinny.getRole())
