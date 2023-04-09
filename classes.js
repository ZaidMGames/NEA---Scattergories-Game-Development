export class Inputs {
  constructor(player, answer, category) {
    this.player = player;
    this.answer = answer;
    this.category = category
    this.votes = []
  }
}

export class Category {
  constructor(name, custom = false) {
    this.name = name;
    this.link = 'https://www.google.com/search?q=' + name.replace(" ","+") + '+names';  
    this.answers = {}
    this.custom = custom
  }

  // Method to show a button to click to the category link
  showLinkButton() {
    const linkButton = document.createElement('a');
    linkButton.href = this.Search_link;
    linkButton.target = '_blank';
    linkButton.innerText = `Click here for ${this.Name} search results`;
    document.body.appendChild(linkButton);
  }

  // Method to check if category is custom or not
  isCustomCategory() {
    return this.custom;
  }
}

export class Player {
  constructor(name, score = 0, answers = []) {
    this.name = name;
    this.score = score;
    this.answers = answers
  }
  
  // Method to change the username
  changeUsername(newName) {
    this.name = newName;
  }

  // Method to display the score
  displayScore() {
    console.log(`${this.name}'s score is ${this.score}`);
  }
}