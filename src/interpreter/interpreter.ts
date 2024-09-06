const { TokenType } = require('../token-types');

const CELL_SIZE = 8;

export class Interpreter {
  constructor() {
    this.state = [0];
    this.pointer = 0;
  }

  *run(program) {
    for (let token of program) {
      switch (token.type) {
        case TokenType.Increment:
          for (let count = token.count; count > 0; count--) {
            const size = 2 ** CELL_SIZE;
            this.state[this.pointer] = (this.state[this.pointer] + 1) % size;
          }
          break;
        case TokenType.Decrement:
          for (let count = token.count; count > 0; count--) {
            const size = 2 ** CELL_SIZE;
            this.state[this.pointer] = (this.state[this.pointer] - 1 + size) % size;
          }
          break;
        case TokenType.RightShift:
          for (let count = token.count; count > 0; count--) {
            this.pointer++;
            if (this.state[this.pointer] === undefined) {
              this.state[this.pointer] = 0;
            }
          }
          break;
      }
    }
  }
}

export default Interpreter;
