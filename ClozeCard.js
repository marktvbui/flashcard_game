function ClozeCard(text, cloze) {
  if (this instanceof ClozeCard) {
    this.cloze = cloze;
    this.text = text;
    if (this.text.toLowerCase().includes(this.cloze.toLowerCase()) === false) {
      console.log("cloze not found");
      return;
    }
    this.partial = this.text.replace(this.cloze, '...');
  } else {
    return new ClozeCard(text, cloze);
  }
};

ClozeCard.prototype.getAnswer = function() {
  return this.text;
};

ClozeCard.prototype.getQuestion = function(){
  return this.partial;
};

ClozeCard.prototype.checkAnswer = function(answer){
  return (this.cloze.toLowerCase() === answer.toLowerCase());
};

module.exports = ClozeCard;