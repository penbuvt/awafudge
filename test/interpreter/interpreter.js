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
  });
});
