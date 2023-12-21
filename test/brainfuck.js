const { parse } = require('../src/parsers/brainfuck');
const assert = require('node:assert').strict;

describe('brainfuck parser', () => {
  it('parses the empty string', () => {
    const input = '';
    const expected = '';

    const actual = parse(input);

    assert.strictEqual(actual, expected);
  });

  it('parses a single increment instruction', () => {
    const input = '+';
    const expected = 'awa';

    const actual = parse(input);

    assert.strictEqual(actual, expected);
  });
});
