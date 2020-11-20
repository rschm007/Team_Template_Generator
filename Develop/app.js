// teammember libs
const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
// dependencies
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { Input } = require("postcss");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// define an empty array to hold employees
let employeesArr = [];

// define questions that will be used throughout
const questions = [
  {
    type: "input",
    message: "What is the employee's ID number?",
    name: "id",
  },
  {
    type: "input",
    message: "What is the employee's email address?",
    name: "email",
  },
  {
    type: "input",
    message: "What is the employee's GitHub account?",
    name: "github",
  },
  {
    type: "input",
    message: "What is the intern's school?",
    name: "school",
  },
];

// ADMIN QUESTIONS AND INIT
function initialize() {
  // return a prompt to ask relevant admin questions
  return inquirer.prompt([
    {
      type: "input",
      message: "Welcome Admin. Please enter your name.",
      name: "name",
    },
    {
      type: "input",
      message: "What is your ID?",
      name: "id",
    },
    {
      type: "input",
      message: "What is your email?",
      name: "email",
    },
    {
      type: "input",
      message: "What is your office number?",
      name: "officeNumber",
    },
  ]);
}

// ask if the manager would like to add an employee or just create the HTML page
function adminQ() {
  inquirer.prompt([
    {
      type: "list",
      message: "Would you like to:",
      name: "adminResp",
      choices: ["Add an employee to your team?", "Create the team page?"],
    },
  ]);
}

function buildEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the employee's name?",
        name: "name",
      },
      {
        type: "list",
        message: "What is the employee's role?",
        name: "role",
        choices: [
          "Engineer",
          "Intern",
          "Employee",
          "I am done adding team members",
        ],
      },
    ])
    .then((answer) => {
      //logic that catches answer and translates it into role data
      if (answer.role === "Engineer") {
        // engineer role logic
        inquirer
          .prompt([questions["id"], questions["email"], questions["github"]])
          .then((answers) => {
            let engineer = new Engineer(
              answers.name,
              answers.id,
              answers.email,
              answers.github
            ); //create a new Engineer class with the engineer constructor
            employeesArr.push(engineer); // push that new employee object into the employeesArr for later concatenation
            buildEmployee(); // call the buildEmployee array again
          });
      }
      if (answer.role === "Engineer") {
        //intern role logic
        inquirer
          .prompt([questions["id"], questions["email"], questions["school"]])
          .then((answers) => {
            let intern = new Intern(
              answers.name,
              answers.id,
              answers.email,
              answers.school
            ); //create a new Intern class with the Intern constructor
            employeesArr.push(intern); // push that new employee object into the employeesArr for later concatenation
            buildEmployee(); // call the buildEmployee array again
          });
      }
    });
}

// call the initialize function to begin questions for admin
initialize();

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

// ****************************
// START OF APP FUNCTIONS
// ****************************
initialize().then((answers) => {
  // build a new manager object with answers
  const manager = new Manager(
    answers.name,
    answers.id,
    answers.email,
    answers.officeNumber
  );
  employeesArr.push(manager); // push that new employee object into the employeesArr for later concatenation
  adminQ().then((answers) => { // ask if they'd like to build a new employee or render the HTML
    if (answers === 'Add an employee to your team?') {
      buildEmployee();
    }
      render();
  });  
});
