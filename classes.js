export class Inputs {
  constructor(player, answer, category) {
    this.player = player;
    this.answer = answer;
    this.category = category
    this.votes = []
  }
}

export class Category {
  constructor(name,custom = false) {
    this.name = name;
    this.link = 'www.google.com/' + name
    this.answers = {}
    this.custom = custom
  }
}

export class Player {
  constructor(name, score = 0, answers = []) {
    this.name = name;
    this.score = score;
    this.answers = answers
  }
}