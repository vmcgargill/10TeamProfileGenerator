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

const init = () => {
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
                GenerateEmployee(EmployeeArray);
            })
        } else if (role === 'Engineer') {
            inquirer.prompt(EngineerQuestions).then((response) => {
                github = response.github;
                let employee = new Engineer(name, id, email, github);
                EmployeeArray.push(employee);
                GenerateEmployee(EmployeeArray);
            })
        } else if (role === 'Intern') {
            inquirer.prompt(InternQuestions).then((response) => {
                school = response.school;
                let employee = new Intern(name, id, email, school);
                EmployeeArray.push(employee);
                GenerateEmployee(EmployeeArray);
            })
        }
    });
}

const GenerateEmployee = (array) => {
    inquirer.prompt([
        {
            type: "list",
            message: "Would you like to create another employee?",
            name: "CreateEmployee",
            choices: [
                "Yes",
                "No"
            ]
        }
    ]).then((response) => {
        var CreateAnotherEmployee = response.CreateEmployee;

        if (CreateAnotherEmployee === 'Yes') {
            init();
        } else if (CreateAnotherEmployee === 'No') {
            fs.writeFile(outputPath, render(array), (err) => {
        
                if (err) {
                    return console.log(err);
                }
            
                console.log("Your team.html file has been created in the output folder.");
            });
        }
    })
}

init()

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.

// TODO:
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.