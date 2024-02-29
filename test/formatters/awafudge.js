const { format } = require('../../src/formatters/awafudge');
const assert = require('node:assert').strict;

const { TokenType } = require('../../src/token-types');

describe('awafudge formatter', () => {
  it('formats an empty token list', () => {
    const input = [];
    const expected = '';

    const actual = format(input);

    assert.strictEqual(actual, expected);
  });

  it('formats an empty right shift instruction', () => {
    const input = [{ type: TokenType.RightShift, count: 0 }];
    const expected = 'a~';

    const actual = format(input);

    assert.strictEqual(actual, expected);
  });

  it('formats a single right shift instruction', () => {
    const input = [{ type: TokenType.RightShift, count: 1 }];
    const expected = 'awa~';

    const actual = format(input);

    assert.strictEqual(actual, expected);
  });

  it('formats multiple right shift instructions', () => {
    const input = [{ type: TokenType.RightShift, count: 3 }];
    const expected = 'awawawa~';

    const actual = format(input);

    assert.strictEqual(actual, expected);
  });

  it('formats an empty left shift instruction', () => {
    const input = [{ type: TokenType.LeftShift, count: 0 }];
    const expected = '~';

    const actual = format(input);

    assert.strictEqual(actual, expected);
  });

  it('formats a single left shift instruction', () => {
    const input = [{ type: TokenType.LeftShift, count: 1 }];
    const expected = 'wa~';

    const actual = format(input);

    assert.strictEqual(actual, expected);
  });

  it('formats multiple left shift instructions', () => {
    const input = [{ type: TokenType.LeftShift, count: 3 }];
    const expected = 'wawawa~';

    const actual = format(input);

    assert.strictEqual(actual, expected);
  });

  it('formats an empty increment instruction', () => {
    const input = [{ type: TokenType.Increment, count: 0 }];
    const expected = 'a';

    const actual = format(input);

    assert.strictEqual(actual, expected);
  });

  it('formats a single increment instruction', () => {
    const input = [{ type: TokenType.Increment, count: 1 }];
    const expected = 'awa';

    const actual = format(input);

    assert.strictEqual(actual, expected);
  });

  it('formats multiple increment instructions', () => {
    const input = [{ type: TokenType.Increment, count: 3 }];
    const expected = 'awawawa';

    const actual = format(input);

    assert.strictEqual(actual, expected);
  });

  it('formats an empty decrement instruction');

  it('formats a single decrement instruction');

  it('formats multiple decrement instructions');

  it('formats write instructions');

  it('formats read instructions');

  it('formats adjacent instructions');

  it('formats empty loops');

  it('formats loops with content');

  it('formats nested loops with content');
});
