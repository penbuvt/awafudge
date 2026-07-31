import { Token } from '../tokens';
import { TokenType } from '../token-types';

const CELL_SIZE = 8;

interface State {
  memory: number[];
  pointer: number;
}

export class Interpreter implements State {
  memory: number[];
  pointer: number;

  constructor() {
    this.memory = [0];
    this.pointer = 0;
  }

  *run(program: Token[]) {
    for (let token of program) {
      switch (token.type) {
        case TokenType.Increment:
          for (let count = token.count; count > 0; count--) {
            const size = 2 ** CELL_SIZE;
            this.memory[this.pointer] = (this.memory[this.pointer] + 1) % size;
          }
          break;
        case TokenType.Decrement:
          for (let count = token.count; count > 0; count--) {
            const size = 2 ** CELL_SIZE;
            this.memory[this.pointer] = (this.memory[this.pointer] - 1 + size) % size;
          }
          break;
        case TokenType.RightShift:
          for (let count = token.count; count > 0; count--) {
            this.pointer++;
            if (this.memory[this.pointer] === undefined) {
              this.memory[this.pointer] = 0;
            }
          }
          break;
      }
    }
  }
}

export default Interpreter;
