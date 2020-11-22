// teamemployee libs
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

// define an empty array to hold employees
const employeesArr = [];

// define questions that will be used throughout
const questions = [
  {
    type: "input",
    message: "What is the employee's name?",
    name: "name",
  },
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

function buildEmployee() {
  return inquirer
    .prompt([
      // ask the admin if they'd like to an employee. If yes, go through inquirer prompt. If no, render HTML
      {
        type: "confirm",
        message: "Are you sure you'd like to add an employee?",
        name: "employeeConfirm",
      },
    ])
    .then((answer) => {
      // if yes to employeeConfirm, go on to employee build logic
      // ask what type of employee they'd like to add
      if (answer.employeeConfirm === true) {
        return inquirer
          .prompt([
            {
              type: "list",
              message: "What type of employee do you want to add?",
              name: "role",
              choices: ["Engineer", "Intern"],
            },
          ])
          .then((answer) => {
            //logic that catches answer and translates it into role data
            if (answer.role === "Engineer") {
              // engineer role logic
              return inquirer
                .prompt([
                  questions[0],
                  questions[1],
                  questions[2],
                  questions[3],
                ])
                .then((answers) => {
                  let engineer = new Engineer(
                    answers.name,
                    answers.id,
                    answers.email,
                    answers.github
                  ); //create a new Engineer class with the engineer constructor
                  employeesArr.push(engineer); // push that new employee object into the employeesArr for later concatenation
                  console.log(
                    `Success! Engineer ${answers.name} information saved.`
                  )
                  buildEmployee(); // call the buildEmployee function again
                });
            }
            if (answer.role === "Intern") {
              //intern role logic
              return inquirer
                .prompt([
                  questions[0],
                  questions[1],
                  questions[2],
                  questions[4],
                ])
                .then((answers) => {
                  let intern = new Intern(
                    answers.name,
                    answers.id,
                    answers.email,
                    answers.school
                  ); // create a new Intern class with the Intern constructor
                  employeesArr.push(intern); // push that new employee object into the employeesArr for later concatenation
                  console.log(
                    `Success! Intern ${answers.name} information saved.`
                  )
                  buildEmployee(); // call the buildEmployee function again
                });
            }
          });
      } else {
        // ****************************
        // RENDER HTML
        // ****************************
        renderFile();
        console.log("HTML page rendered.")
      }
    });
}

// define a function that takes the pre-provided functions in htmlRenderer.js and writes the output to the outputPath
function renderFile() {
  fs.writeFileSync(outputPath, render(employeesArr), "utf-8");
}

// ****************************
// START OF APP FUNCTIONS
// ****************************
initialize().then((answers) => {
  // build a new manager object with answers
  manager = new Manager(
    answers.name,
    answers.id,
    answers.email,
    answers.officeNumber
  );
  employeesArr.push(manager); // push that new employee object into the employeesArr for later concatenation
  console.log(`Success! Manager ${answers.name} information saved.`);
  console.log(`Beginning employee data entry...`);
  buildEmployee();
});
