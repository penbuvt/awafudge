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
          for (let count = token.count; count > 0; count--) {
            this.state[this.pointer]++;
          }
          break;
        case TokenType.Decrement:
          for (let count = token.count; count > 0; count--) {
            this.state[this.pointer]--;
          }
          break;
      }
    }
  }
}

module.exports ={
  Interpreter,
};
