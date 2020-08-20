const fs = require("fs");
const inquirer = require("inquirer");
const path = require("path");

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const render = require("./lib/htmlRenderer");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

let EmployeeArray = new Array();

const EmployeeQuestions = [
    {
        type: "input",
        message: "Please enter the name of the employee:",
        name: "name"
    },
    {
        type: "input",
        message: "Please enter the id of the employee:",
        name: "id"
    },
    {
        type: "input",
        message: "Please enter the work email address of the employee:",
        name: "email"
    },
    {
        type: "list",
        message: "Please select a role/position for this employee:",
        name: "role",
        choices: [
            "Manager",
            "Engineer",
            "Intern"
        ]
    }
]

const ManagerQuestions = [
    {
        type: "input",
        message: "Please enter the office number of the manager:",
        name: "officeNumber"
    }
]

const EngineerQuestions = [
    {
        type: "input",
        message: "Please enter the GitHub user name of the engineer:",
        name: "github"
    }
]

const InternQuestions = [
    {
        type: "input",
        message: "Please enter the school that the intern attends:",
        name: "school"
    }
]

inquirer.prompt(EmployeeQuestions).then((response) => {
    let name = response.name;
    let id = response.id;
    let email = response.email;
    let role = response.role;
    let officeNumber;
    let github;
    let school;

    if (role === 'Manager') {
        inquirer.prompt(ManagerQuestions).then((response) => {
            officeNumber = response.officeNumber;
            let employee = new Manager(name, id, email, officeNumber);
            EmployeeArray.push(employee);
            renderHTML(EmployeeArray);
        })
    } else if (role === 'Engineer') {
        inquirer.prompt(EngineerQuestions).then((response) => {
            github = response.github;
            let employee = new Engineer(name, id, email, github);
            EmployeeArray.push(employee);
            renderHTML(EmployeeArray);
        })
    } else if (role === 'Intern') {
        inquirer.prompt(InternQuestions).then((response) => {
            school = response.school;
            let employee = new Intern(name, id, email, school);
            EmployeeArray.push(employee);
            renderHTML(EmployeeArray);
        })
    }
});

// console.log(render(EmployeeArray));


var renderHTML = (array) => {
    console.log(array)
    fs.writeFile(outputPath, render(array), function(err) {

        if (err) {
            return console.log(err);
        }
    
        console.log("Your team.html file has been created in the output folder.");
    });
}

// init()

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
