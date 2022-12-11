class Inputs {
    constructor(player, answer, category) {
      this.player = player
      this.answer = answer
      this.category = category
      this.votes = []
    }
  }
  
  class Category {
    constructor(name) {
      this.name = name
      this.answers = {}
    }
  }
  
  class Player {
    constructor(name, score = 0, answers = []) {
      this.name = name
      this.score = score
      this.answers = answers
    }
  }