import { Interpreter } from '../../src/interpreter/interpreter';
import { Token } from '../../src/tokens';
import { TokenType } from '../../src/token-types';
import { strict as assert } from 'node:assert';

describe('interpreter', () => {
  describe('run', () => {
    let interpreter: Interpreter;

    beforeEach(() => {
      interpreter = new Interpreter();
    });

    it('runs the empty program', () => {
      const input: Token[] = [];

      const runner = interpreter.run(input);
      const result = runner.next();

      assert.strictEqual(result.done, true);
    });

    it('runs an empty right shift instruction', () => {
      const input: Token[] = [
        { type: TokenType.RightShift, count: 0 },
      ];

      const runner = interpreter.run(input);
      const result = runner.next();

      assert.strictEqual(result.done, true);
      assert.strictEqual(interpreter.pointer, 0);
      assert.strictEqual(interpreter.state[0], 0);
    });

    it('runs a single right shift instruction', () => {
      const input: Token[] = [
        { type: TokenType.RightShift, count: 1 },
      ];

      const runner = interpreter.run(input);
      const result = runner.next();

      assert.strictEqual(result.done, true);
      assert.strictEqual(interpreter.pointer, 1);
      assert.strictEqual(interpreter.state[1], 0);
    });

    it('runs multiple right shift instructions', () => {
      const input: Token[] = [
        { type: TokenType.RightShift, count: 3 },
      ];

      const runner = interpreter.run(input);
      const result = runner.next();

      assert.strictEqual(result.done, true);
      assert.strictEqual(interpreter.pointer, 3);
      assert.strictEqual(interpreter.state[3], 0);
    });

    it('runs an empty increment instruction', () => {
      const input: Token[] = [
        { type: TokenType.Increment, count: 0 },
      ];

      const runner = interpreter.run(input);
      const result = runner.next();

      assert.strictEqual(result.done, true);
      assert.strictEqual(interpreter.state[0], 0);
    });
    it('runs a single increment instruction', () => {
      const input: Token[] = [
        { type: TokenType.Increment, count: 1 },
      ];

      const runner = interpreter.run(input);
      const result = runner.next();

      assert.strictEqual(result.done, true);
      assert.strictEqual(interpreter.state[0], 1);
    });

    it('runs multiple increment instructions', () => {
      const input: Token[] = [
        { type: TokenType.Increment, count: 3 },
      ];

      const runner = interpreter.run(input);
      const result = runner.next();

      assert.strictEqual(result.done, true);
      assert.strictEqual(interpreter.state[0], 3);
    });

    it('overflows the cell when incrementing past the max', () => {
      const input: Token[] = [
        { type: TokenType.Increment, count: 1 },
      ];
      interpreter.state[0] = 255;

      const runner = interpreter.run(input);
      const result = runner.next();

      assert.strictEqual(result.done, true);
      assert.strictEqual(interpreter.state[0], 0);
    });

    it('runs an empty decrement instruction', () => {
      const input: Token[] = [
        { type: TokenType.Decrement, count: 0 },
      ];
      interpreter.state[0] = 50;

      const runner = interpreter.run(input);
      const result = runner.next();

      assert.strictEqual(result.done, true);
      assert.strictEqual(interpreter.state[0], 50);
    });

    it('runs a single decrement instruction', () => {
      const input: Token[] = [
        { type: TokenType.Decrement, count: 1 },
      ];
      interpreter.state[0] = 50;

      const runner = interpreter.run(input);
      const result = runner.next();

      assert.strictEqual(result.done, true);
      assert.strictEqual(interpreter.state[0], 49);
    });

    it('runs multiple decrement instructions', () => {
      const input: Token[] = [
        { type: TokenType.Decrement, count: 3 },
      ];
      interpreter.state[0] = 50;

      const runner = interpreter.run(input);
      const result = runner.next();

      assert.strictEqual(result.done, true);
      assert.strictEqual(interpreter.state[0], 47);
    });

    it('underflows the cell when decrementing from 0', () => {
      const input: Token[] = [
        { type: TokenType.Decrement, count: 1 },
      ];
      interpreter.state[0] = 0;

      const runner = interpreter.run(input);
      const result = runner.next();

      assert.strictEqual(result.done, true);
      assert.strictEqual(interpreter.state[0], 255);
    });
  });
});
