var Flashcards = require("./flashcard.js")
var Quiz = require("./quiz.js");
var inquirer = require("inquirer");


function mainMenu() {
  var myQuiz = new Quiz(mainMenu);
  var myFlashcards = new Flashcards(mainMenu);
  inquirer.prompt([
    {
      type: "list",
    message: "What would you like to do? Select one: ",
    name: "list",
    choices: ['Create basic flashcards', 'Create Cloze-Deleted flashcards', 'Take a Quiz', 'Exit']
    }
  ]).then(function(answers) {
    if (answers.list === 'Create Basic Flashcards') {
      myFlashcards.createBasic();
    } else if (answers.list === 'Create Cloze-Deleted Flashcards') {
      myFlashcards.createCloze();
    } else if (answers.list === 'Take a Quiz') {
      myQuiz.runQuiz();
    } else if (answers.list === 'Exit') {
      console.log('Please come again!');
      return;
    }

  });
};

mainMenu();
