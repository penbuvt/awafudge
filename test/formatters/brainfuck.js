const { format } = require('../../src/formatters/brainfuck');
const assert = require('node:assert').strict;

describe('brainfuck formatter', () => {
  it('formats an empty token list', () => {
    const input = [];
    const expected = '';

    const actual = format(input);

    assert.strictEqual(actual, expected);
  });

  it('formats an empty right shift instruction', () => {
    const input = [{ type: 'RIGHT_SHIFT', count: 0 }];
    const expected = '';

    const actual = format(input);

    assert.strictEqual(actual, expected);
  });

  it('formats a single right shift instruction', () => {
    const input = [{ type: 'RIGHT_SHIFT', count: 1 }];
    const expected = '>';

    const actual = format(input);

    assert.strictEqual(actual, expected);
  });
});
