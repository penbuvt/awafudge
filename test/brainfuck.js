const { parse } = require('../src/parsers/brainfuck');
const assert = require('node:assert').strict;

describe('brainfuck parser', () => {
  it('parses the empty string', () => {
    const input = '';
    const expected = '';

    const actual = parse(input);

    assert.strictEqual(actual, expected);
  });

  it('parses a single right shift instruction', () => {
    const input = '>';
    const expected = 'awa~';

    const actual = parse(input);

    assert.strictEqual(actual, expected);
  });

  it('parses a single left shift instruction', () => {
    const input = '<';
    const expected = 'wa~';

    const actual = parse(input);

    assert.strictEqual(actual, expected);
  });

  it('parses a single increment instruction', () => {
    const input = '+';
    const expected = 'awa';

    const actual = parse(input);

    assert.strictEqual(actual, expected);
  });

  it('parses a single decrement instruction', () => {
    const input = '-';
    const expected = 'wa';

    const actual = parse(input);

    assert.strictEqual(actual, expected);
  });

  it('parses a single write instruction', () => {
    const input = '.';
    const expected = '.';

    const actual = parse(input);

    assert.strictEqual(actual, expected);
  });

  it('parses a single read instruction', () => {
    const input = ',';
    const expected = ',';

    const actual = parse(input);

    assert.strictEqual(actual, expected);
  });

  it('parses a single empty loop instruction', () => {
    const input = '[]';
    const expected = '?!';

    const actual = parse(input);

    assert.strictEqual(actual, expected);
  });

  it('ignores non-instruction characters', () => {
    const input = '`1234567890=qwertyuiop\\asdfghjkl;\'zxcvbnm/ \n~!@#$%^&*()_QWERTYUIOP{}|ASDFGHJKL:"ZXCVBNM?';
    const expected = '';

    const actual = parse(input);

    assert.strictEqual(actual, expected);
  });
});
