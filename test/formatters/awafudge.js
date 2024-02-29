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

  it('formats an empty right shift instruction');

  it('formats a single right shift instruction');

  it('formats multiple right shift instructions');

  it('formats an empty left shift instruction');

  it('formats a single left shift instruction');

  it('formats multiple left shift instructions');

  it('formats an empty increment instruction');

  it('formats a single increment instruction');

  it('formats multiple increment instructions');

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
