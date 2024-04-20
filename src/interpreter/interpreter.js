const { TokenType } = require('../token-types');

class Interpreter {
  constructor() {
    this.state = [0];
    this.pointer = 0;
  }

  *run(program) {
    for (let token of program) {
      switch (token.type) {
        case TokenType.Increment:
          this.state[this.pointer]++;
          break;
      }
    }
  }
}

module.exports ={
  Interpreter,
};
