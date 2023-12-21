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

  it('parses multiple right shift instructions', () => {
    const input = '>>>';
    const expected = 'awawawa~';

    const actual = parse(input);

    assert.strictEqual(actual, expected);
  });

  it('parses a single left shift instruction', () => {
    const input = '<';
    const expected = 'wa~';

    const actual = parse(input);

    assert.strictEqual(actual, expected);
  });

  it('parses multiple left shift instructions', () => {
    const input = '<<<';
    const expected = 'wawawa~';

    const actual = parse(input);

    assert.strictEqual(actual, expected);
  });

  it('parses a single increment instruction', () => {
    const input = '+';
    const expected = 'awa';

    const actual = parse(input);

    assert.strictEqual(actual, expected);
  });

  it('parses multiple increment instructions', () => {
    const input = '+++';
    const expected = 'awawawa';

    const actual = parse(input);

    assert.strictEqual(actual, expected);
  });

  it('parses a single decrement instruction', () => {
    const input = '-';
    const expected = 'wa';

    const actual = parse(input);

    assert.strictEqual(actual, expected);
  });

  it('parses multiple decrement instructions', () => {
    const input = '---';
    const expected = 'wawawa';

    const actual = parse(input);

    assert.strictEqual(actual, expected);
  });

  it('parses a single write instruction', () => {
    const input = '.';
    const expected = '.';

    const actual = parse(input);

    assert.strictEqual(actual, expected);
  });

  it('parses multiple write instructions', () => {
    const input = '...';
    const expected = '...';

    const actual = parse(input);

    assert.strictEqual(actual, expected);
  });

  it('parses a single read instruction', () => {
    const input = ',';
    const expected = ',';

    const actual = parse(input);

    assert.strictEqual(actual, expected);
  });

  it('parses multiple read instructions', () => {
    const input = ',,,';
    const expected = ',,,';

    const actual = parse(input);

    assert.strictEqual(actual, expected);
  });

  it('parses a single empty loop instruction', () => {
    const input = '[]';
    const expected = '?!';

    const actual = parse(input);

    assert.strictEqual(actual, expected);
  });

  it('parses nested loop instructions', () => {
    const input = '[[[]]]';
    const expected = '???!!!';

    const actual = parse(input);

    assert.strictEqual(actual, expected);
  });

  describe('potential ambiguous cases', () => {
    // These cases require separating the tokens with a space on output
    // to avoid ambiguous tokens.

    it('parses +-', () => {
      const input = '+-';
      const expected = 'awa wa';

      const actual = parse(input);

      assert.strictEqual(actual, expected);
    });

    it('parses +<', () => {
      const input = '+<';
      const expected = 'awa wa~';

      const actual = parse(input);

      assert.strictEqual(actual, expected);
    });

    it('parses -<', () => {
      const input = '-<';
      const expected = 'wa wa~';

      const actual = parse(input);

      assert.strictEqual(actual, expected);
    });
  })

  it('ignores non-instruction characters', () => {
    const input = '`1234567890=qwertyuiop\\asdfghjkl;\'zxcvbnm/ \n~!@#$%^&*()_QWERTYUIOP{}|ASDFGHJKL:"ZXCVBNM?';
    const expected = '';

    const actual = parse(input);

    assert.strictEqual(actual, expected);
  });
});
