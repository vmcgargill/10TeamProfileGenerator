[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)
 
# 10TeamProfileGenerator
 
## Description 
A command line app that generated HTML pages of team profiles.

You may view the example YouTube video here:
[YouTube video](https://www.youtube.com/watch?v=l9qgnFdjuBo)

#### app.js
The app.js is the main file that runs the application See [Usage](#usage) on how to use. At the top, the file imports everything. Then there are 4 arrays defined that contain inquirer prompt questions: EmployeeQuestions, ManagerQuestions, EngineerQuestions, and InternQuestions which provide questions according to the respective class. 

Then the app initializes with the init() function which first checks if there is already a team.html file in the output directory. If there is a file, then it asks if the user is ok with overwriting it. If the use answers yes then it initializes the inquirEmployee() function. If the user answers no then it kills the app, preventing the file from being over written. If there is no a file then it initilizes the inquirEmployee() function without asking. 

The inquirEmployee() function prompts the user a series of inquieries such as the employee name, ID, email, and lets the user select a role/position within the company. Based of which role is selected for the employee by the user, another inquirie prompt is created specifically for that employee role. For example, if it's a manager the inquirer asks for the employee office number. It it's a intern then inquirer asks for the student's school. Then an employee object is created based of the selected role and is pushed to an array called EmployeeArray. After that, the GenerateEmployee(EmployeeArray) is initialized while passing through the updated employee array containing all the employee objects.

The GenerateEmployee(array) takes in a array for the function. First, the function checks if the user would like to create another emplyee by using inquirer again. If the user answers yes then it runs the inquirEmployee() function again, which creates another employee object and adds it to the EmployeeArray, repeating the cycle. If the user eventually answers No after the first time or after several times, depending on how many emplyees the user wants to add, the GenerateEmployee function checks if the output director exists. If the output directory exists then it moves on and creates the file in it. If the output directory does not exist then it creates the directory so that the file may be written in it. The EmployeeArray is then passed into the render() function which generates the needed HTML. It is defined in the lib/htmlRender.js file and is imported at the top.

#### Employee.js
The Employee.js file defines the employee class using a name, email, and ID as a construction. Then it returns 3 functions: getName(), getId(), getEmail(), and getRole() which will all return their respective attributes. After that, the class is exported on module.exports to be used on other files and other classes.

#### Engineer.js, Manager.js, & Intern.js
The three extension classes of Employee, Engineer, Manager, and Intern, are defined and exported in their respective files. They all take in the super constructor of name, email, and Id which are already defined in the primary Employee class along with the functions that get this info. Each class then takes in 1 extra constructor. For Engineer, it is their GitHub account. For Manager, it is their office number. For intern, it is their school name. Then a function is created to get that unique constructor. For example, the intern class has a function called getSchool() that returns the objects's school name. The getRole() function is also redefined in these 3 subclasses to their respective roles.

#### htmlRender.js
The htmlRender.js file defines the render() function that becomes very important in regards to the functionality of the app. The render(array) function passes through an array with all of the defined employee objects. It then filers through the array to get all of the employees by their roles, and then maps those filtered employees to be used in their own render functions. For example, all of the engineers are filered in the array, then they are mapped to run in the renderEngineer() function which utlizes the replacePlaceholders() function and creates an HTML template to be used later. The render() function stores all of those HTML elements into an array, and then they are passed through into the renderMain() function which will return a whole HTML file that is then created in the app.js file.

# Table of Contents 
- [Installation](#installation) 
- [Usage](#usage)
- [Contribution](#contribution) 
- [Tests](#tests) 
- [License](#license) 
- [Questions](#questions) 
 
## Installation 
```
npm i
```
 
## Usage 
Use it to generate team profile html file. To use, clone the git repository, then cd into the file directory:

```
cd 10TeamProfileGenerator
```

Install NPM requirements:

```
npm i
```

and then run the app.js file using node:

```
node app.js
```
 
## License 
This application is covered by: Unlicensed
 
## Contribution 
Use contact info in questions section if you would like to contribute. This is a class homework assignment.
 
## Tests 
To run tests, simply run the following command:

```
npm test
```
 
## Questions 
If you have any questions feel free to contact: 
 
[GitHub](https://github.com/vmcgargill) 
 
Email: [vincentmcgargill@gmail.com](mailto:vincentmcgargill@gmail.com)