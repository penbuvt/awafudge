const { format } = require('../../src/formatters/brainfuck');
const assert = require('node:assert').strict;

describe('brainfuck formatter', () => {
  it('formats an empty token list', () => {
    const input = [];
    const expected = '';

    const actual = format(input);

    assert.strictEqual(actual, expected);
  });
});
