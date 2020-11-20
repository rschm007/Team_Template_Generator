const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { Input } = require("postcss");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// empty arrays to collect info
let managArr = [];
let engiArr = [];
let internArr = [];
let employArr = [];

// ADMIN QUESTIONS
const adminBuild = [
    {
        type: "confirm",
        message: "Hello. Are you a Manager or Admin?",
        name: "role"
        choices: [
            'Yes',
            'No'
        ]
    },
    {
        type: "input",
        message: "Welcome Admin. Please enter your name.",
        name: "name"
        validate: (answer) => {
            if (answer.length < 1) {
              return console.log("A valid name is required.");
            }
            return true;
          },
    },
    {
        type: "input",
        message: "What is your ID?",
        name: "id"
        validate: (answer) => {
            if (answer.length < 1) {
              return console.log("A valid ID is required.");
            }
            return true;
          },
    },
    {
        type: "input",
        message: "What is your email?",
        name: "email"
        validate: (answer) => {
            if (answer.length < 1) {
              return console.log("A valid ID is required.");
            }
            return true;
          },
    }
    {
        type: "input",
        message: "What is your office number?",
        name: "officeNumber"
        validate: (answer) => {
            if (answer.length < 1) {
              return console.log("A valid office number is required.");
            }
            return true;
          },
    }
];

const adminQ = [
  {
    type: "list",
    message: "Would you like to:",
    name: "adminResp",
    choices: [
        "Add an employee to your team?", 
        "Create the team page?"
    ],
  },
];

const questions = [
  {
    type: "input",
    message: "What is the employee's name?",
    name: "name",
    validate: (answer) => {
      if (answer.length < 1 || answer.typeof !== "string") {
        return console.log("A valid name is required.");
      }
      return true;
    },
  },
  {
    type: "input",
    message: "What is the employee's role?",
    name: "role",
    default: "employee",
    validate: (answer) => {
      if (answer.length < 1 || answer.typeof !== "string") {
        return console.log("A valid role is required.");
      }
      return true;
    },
  },
  {
    type: "input",
    message: "What is the employee's ID number?",
    name: "ID",
    validate: (answer) => {
      if (answer.length < 1) {
        return console.log("A valid ID is required.");
      }
      return true;
    },
  },
  {
    type: "input",
    message: "What is the employee's email address?",
    name: "email",
    // validate that the user entered an actual email - WIP
    validate: (answer) => {
      if (answer.length < 1) {
        return console.log("A valid ID is required.");
      }
      return true;
    },
  },
  {
    type: "input",
    message: "What is the employee's GitHub account?",
    name: "github",
    validate: (answer) => {
      if (answer.length < 1) {
        return console.log("A valid GitHub account is required.");
      }
      return true;
    },
  },
  {
    type: "input",
    message: "What is the intern's school?",
    name: "school",
    validate: (answer) => {
      if (answer.length < 1) {
        return console.log("A valid ID is required.");
      }
      return true;
    },
  },
];

// function to initialize program
let init =
async function adminInit() {
    await inquirer.prompt(adminBuild)
    .then(async function (userData) {
        let adminInfo = {
            'name': userData.name,
            'ID': userData.id,
            'email': userData.email,
            'officeNumber': userData.officeNumber,
        }
    })
  };



// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

render();

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


