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

// define an empty array to hold employees
let employeesArr = [];

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
                  );
                  buildEmployee(); // call the buildEmployee array again
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
                  );
                  buildEmployee(); // call the buildEmployee array again
                });
            }
          });
      } else if (answer.employeeConfirm === false) {
        // ****************************
        // RENDER HTML
        // ****************************
        // capture the main.html path
        let main = fs.readFileSync("./html/main.html");

        // create a function that will replace information in cards
        let managerCard = fs.readFileSync("./html/manager.html");
        managerCard
          .replace("{{ name }}", manager.getName())
          .replace("{{ role }}", manager.getRole())
          .replace("{{ id }}", manager.getId())
          .replace("{{ email }}", manager.getEmail())
          .replace("{{ officeNumber }}", manager.getOfficeNumber());

        // append page with teammember info
        let teamCards = managerCard;
        // make a loop that will go through all contents of employeesArr and append info into relevant cards
        employeesArr.forEach(function (member, index) {
          teamCards += renderMember(member[index]);
        });

        // add cards to main.html
        main = main.replace("{{ cards }}", teamCards);

        console.log("Success! HTML has been created.");
      }
    });
}

// define a renderMember function that will insert each employee's info into cards
function renderMember(member) {
  if (member.getRole() === "Intern") {
    let internCard = fs.readFileSync("./html/intern.html");
    internCard = internCard
      .replace("{{ name }}", member.getName())
      .replace("{{ role }}", member.getRole())
      .replace("{{ id }}", member.getId())
      .replace("{{ email }}", member.getEmail())
      .replace("{{ school }}", member.getSchool());
    return internCard;
  } else {
    let engiCard = fs.readFileSync("./html/engineer.html");
    engiCard = engiCard
      .replace("{{ name }}", member.getName())
      .replace("{{ role }}", member.getRole())
      .replace("{{ id }}", member.getId())
      .replace("{{ email }}", member.getEmail())
      .replace("{{ github }}", member.getGithub());
    return engiCard;
  }
}
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
  let manager = new Manager(
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
