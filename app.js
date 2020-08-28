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

// Array of inquirer questions that are prompted for all employees.
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

// Array of inquirer question specifically for the manager class.
const ManagerQuestions = [
    {
        type: "input",
        message: "Please enter the office number of the manager:",
        name: "officeNumber"
    }
]

// Array of inquirer question specifically for the engineer class.
const EngineerQuestions = [
    {
        type: "input",
        message: "Please enter the GitHub user name of the engineer:",
        name: "github"
    }
]

// Array of inquirer question specifically for the intern class.
const InternQuestions = [
    {
        type: "input",
        message: "Please enter the school that the intern attends:",
        name: "school"
    }
]

// Init function that initializes the app, checks if the team.html file already exists, and checks if the user is ok with overwriting that file if it does exist.
const init = () => {
    if (fs.existsSync(outputPath)) {
        inquirer.prompt({
            type: "list",
            message: "It looks like the team.html file in the output directory already exists. Are you sure you want to overwrite it?",
            name: "overwrite",
            choices: [
                "Yes",
                "No"
            ]
        }).then(async (response) => {

            let overwrite = response.overwrite;
            if (await overwrite === 'Yes') {
                console.log("Welcome to the team profile generator. Please enter your team information below:")
                inquirerEmployee()
            } else if (await overwrite === 'No') {
                console.log("Your current team.html file in the output directory has not been overwritten. Please move the current team.html file somewhere else and try again or copy and paste the text somewhere then try again and overwrite it.")
            }
        })
    } else {
        console.log("Welcome to the team profile generator. Please enter your team information below:")
        inquirerEmployee()
    }
}

// Inquierer Employee function that askes user a series of inquirer questions about the details of the employee, then pushes that employee object to the EmployeeArray.
const inquirerEmployee = async () => {
    await inquirer.prompt(EmployeeQuestions).then((response) => {
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
                CreateHTML(EmployeeArray);
            })
        } else if (role === 'Engineer') {
            inquirer.prompt(EngineerQuestions).then((response) => {
                github = response.github;
                let employee = new Engineer(name, id, email, github);
                EmployeeArray.push(employee);
                CreateHTML(EmployeeArray);
            })
        } else if (role === 'Intern') {
            inquirer.prompt(InternQuestions).then((response) => {
                school = response.school;
                let employee = new Intern(name, id, email, school);
                EmployeeArray.push(employee);
                CreateHTML(EmployeeArray);
            })
        }
    });
}

// The Create HTML function that checks if the user would like to add an additional employee first, then creates an additional employee or creates the team.html file when the user is done adding employees.
const CreateHTML = async (array) => {
    await inquirer.prompt([
        {
            type: "list",
            message: "Would you like to create another employee?",
            name: "CreateEmployee",
            choices: [
                "Yes",
                "No"
            ]
        }
    ]).then(async (response) => {
        var CreateAnotherEmployee = response.CreateEmployee;

        if (await CreateAnotherEmployee === 'Yes') {
            inquirerEmployee();
        } else if (await CreateAnotherEmployee === 'No') {

            // If the output directory does not exist, then it creates the ouput directory for the user before creating the team.html file.
            if (!fs.existsSync(OUTPUT_DIR)) {
                fs.mkdirSync(OUTPUT_DIR)
            }
            
            fs.writeFile(outputPath, render(array), (err) => {
        
                if (err) {
                    return console.log(err);
                }
            
                console.log("Your team.html file has been created in the output folder.");
            });

        }
    })
}

// Run the init function as soon as node runs the app.js file.
init()