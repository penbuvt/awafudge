const { Interpreter } = require('../../src/interpreter/interpreter');
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
  });
});
