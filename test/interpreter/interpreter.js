const { Interpreter } = require('../../src/interpreter/interpreter');
const { TokenType } = require('../../src/token-types');
const assert = require('node:assert').strict;

describe('interpreter', () => {
  describe('run', () => {
    let interpreter;

    beforeEach(() => {
      interpreter = new Interpreter();
    });

    it('runs the empty program', () => {
      const input = [];

      const runner = interpreter.run(input);
      const result = runner.next();

      assert.strictEqual(result.done, true);
    });

    it('runs an empty right shift instruction', () => {
      const input = [
        { type: TokenType.RightShift, count: 0 },
      ];

      const runner = interpreter.run(input);
      const result = runner.next();

      assert.strictEqual(result.done, true);
      assert.strictEqual(interpreter.pointer, 0);
      assert.strictEqual(interpreter.state[0], 0);
    });

    it('runs a single right shift instruction', () => {
      const input = [
        { type: TokenType.RightShift, count: 1 },
      ];

      const runner = interpreter.run(input);
      const result = runner.next();

      assert.strictEqual(result.done, true);
      assert.strictEqual(interpreter.pointer, 1);
      assert.strictEqual(interpreter.state[1], 0);
    });

    it('runs multiple right shift instructions', () => {
      const input = [
        { type: TokenType.RightShift, count: 3 },
      ];

      const runner = interpreter.run(input);
      const result = runner.next();

      assert.strictEqual(result.done, true);
      assert.strictEqual(interpreter.pointer, 3);
      assert.strictEqual(interpreter.state[3], 0);
    });

    it('runs an empty increment instruction', () => {
      const input = [
        { type: TokenType.Increment, count: 0 },
      ];

      const runner = interpreter.run(input);
      const result = runner.next();

      assert.strictEqual(result.done, true);
      assert.strictEqual(interpreter.state[0], 0);
    });
    it('runs a single increment instruction', () => {
      const input = [
        { type: TokenType.Increment, count: 1 },
      ];

      const runner = interpreter.run(input);
      const result = runner.next();

      assert.strictEqual(result.done, true);
      assert.strictEqual(interpreter.state[0], 1);
    });

    it('runs multiple increment instructions', () => {
      const input = [
        { type: TokenType.Increment, count: 3 },
      ];

      const runner = interpreter.run(input);
      const result = runner.next();

      assert.strictEqual(result.done, true);
      assert.strictEqual(interpreter.state[0], 3);
    });

    it('runs an empty decrement instruction', () => {
      const input = [
        { type: TokenType.Decrement, count: 0 },
      ];
      interpreter.state[0] = 50;

      const runner = interpreter.run(input);
      const result = runner.next();

      assert.strictEqual(result.done, true);
      assert.strictEqual(interpreter.state[0], 50);
    });

    it('runs a single decrement instruction', () => {
      const input = [
        { type: TokenType.Decrement, count: 1 },
      ];
      interpreter.state[0] = 50;

      const runner = interpreter.run(input);
      const result = runner.next();

      assert.strictEqual(result.done, true);
      assert.strictEqual(interpreter.state[0], 49);
    });

    it('runs multiple decrement instructions', () => {
      const input = [
        { type: TokenType.Decrement, count: 3 },
      ];
      interpreter.state[0] = 50;

      const runner = interpreter.run(input);
      const result = runner.next();

      assert.strictEqual(result.done, true);
      assert.strictEqual(interpreter.state[0], 47);
    });
  });
});
