var inquirer = require("inquirer");
var fs = require("fs");

var Flashcards = function(callback) {
  this.myCallback = callback;
  var self = this;

  this.createBasic = function() {
    inquirer.prompt([
    {
    name: "front",
    message: "Enter a Question: "
    }, {
    name: "back",
    message: "Enter the Answer: "
    }
    ]).then(function(answers) {
      logFlashCards("Basic"+","+answers.front+","+answers.back+"\n");
      self.anotherCard('basic');

    });
  };
  this.createCloze = function() {
    inquirer.prompt([
    {
    name: "text",
    message: "Enter the full text: "
    }, {
    name: "cloze",
    message: "Enter the portion of the text to be cloze-deleted: "
    }
    ]).then(function(answers) {
      logFlashCards("Cloze"+","+answers.text+","+answers.cloze+"\n");
      self.anotherCard('cloze');
    });
  };

  this.anotherCard = function(cardtype) {

    inquirer.prompt([
    {
    type: "confirm",
    message: "Create another flashcard?",
    name: "anotherCard",
    default: true
    }
    ]).then(function(answers) {
      if (answers.anotherCard) {
        if (cardtype === 'cloze') {
         self.createCloze();
        } else {
          self.createBasic();
        }
      } else {
        self.myCallback();
      }
    });
  };
};


logFlashCards = function(card) {
  fs.appendFile("quiz.txt",card, function(err) {
    if (err) {
      return console.log(err);
      }
    });
};

module.exports = Flashcards;