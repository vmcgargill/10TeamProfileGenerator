const EmployeeClass = require("./Employee");

class Manager extends EmployeeClass.Employee {

    constructor(name, ID, email, officeNumber) {
        super(name, ID, email);
        this.officeNumber = officeNumber;
    }

    getOfficeNumber() {
        return this.officeNumber;
    }

    getRole() {
        return 'Manager';
    }
}

// Test Create New Manager
// var vinny = new Manager("vinny", 123, "example@gmail.com", 100);
// console.log(vinny);
// console.log(vinny.getRole())