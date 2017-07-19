var BasicCard = require("./BasicCard");
var ClozeCard = require("./ClozeCard");
var inquirer = require("inquirer");
var fs = require("fs");

var Quiz = function(callback) {
  this.myCallback = callback;
  var self = this;
  var quizArray = [];
  this.runQuiz = function() {
    fs.readFile("quiz.txt", "utf8", function(error, data) {
      if (error) {
        return console.log(error);
      }
      var cards = data.split('\n');
      for (var i = 0; i < cards.length-1; i++) {
        var fields = cards[i].split(',');
        if (fields[0] === 'Basic') {
          quizArray.push(new BasicCard(fields[1], fields[2]));
        } else if (fields[0] === 'Cloze') {
          quizArray.push(new ClozeCard(fields[1], fields[2]));
        }
      }
      self.flashcard(0);
    });
  };
  this.flashcard = function(index) {
    if (index < quizArray.length) {
      inquirer.prompt([
        {
          name: 'answer',
        message: quizArray[index].getQuestion()
        }

      ]).then(function(answers) {
        var correct = quizArray[index].checkAnswer(answers.answer);
        if (correct) {
          console.log("Correct!");
        } else {
          console.log("Incorrect!");
        }
         console.log(quizArray[index].getAnswer());
         self.flashcard(index+1);
      });
    } else {
      console.log("No more questions!");
      self.myCallback();
    }
  };
};


module.exports = Quiz;