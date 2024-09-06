import { format } from '../../src/formatters/awafudge';
import { strict as assert } from 'node:assert';

import { Token } from '../../src/tokens';
import { TokenType } from '../../src/token-types';

describe('awafudge formatter', () => {
  it('formats an empty token list', () => {
    const input: Token[] = [];
    const expected = '';

    const actual = format(input);

    assert.strictEqual(actual, expected);
  });

  it('formats an empty right shift instruction', () => {
    const input: Token[] = [{ type: TokenType.RightShift, count: 0 }];
    const expected = 'a~';

    const actual = format(input);

    assert.strictEqual(actual, expected);
  });

  it('formats a single right shift instruction', () => {
    const input: Token[] = [{ type: TokenType.RightShift, count: 1 }];
    const expected = 'awa~';

    const actual = format(input);

    assert.strictEqual(actual, expected);
  });

  it('formats multiple right shift instructions', () => {
    const input: Token[] = [{ type: TokenType.RightShift, count: 3 }];
    const expected = 'awawawa~';

    const actual = format(input);

    assert.strictEqual(actual, expected);
  });

  it('formats an empty left shift instruction', () => {
    const input: Token[] = [{ type: TokenType.LeftShift, count: 0 }];
    const expected = '~';

    const actual = format(input);

    assert.strictEqual(actual, expected);
  });

  it('formats a single left shift instruction', () => {
    const input: Token[] = [{ type: TokenType.LeftShift, count: 1 }];
    const expected = 'wa~';

    const actual = format(input);

    assert.strictEqual(actual, expected);
  });

  it('formats multiple left shift instructions', () => {
    const input: Token[] = [{ type: TokenType.LeftShift, count: 3 }];
    const expected = 'wawawa~';

    const actual = format(input);

    assert.strictEqual(actual, expected);
  });

  it('formats an empty increment instruction', () => {
    const input: Token[] = [{ type: TokenType.Increment, count: 0 }];
    const expected = 'a';

    const actual = format(input);

    assert.strictEqual(actual, expected);
  });

  it('formats a single increment instruction', () => {
    const input: Token[] = [{ type: TokenType.Increment, count: 1 }];
    const expected = 'awa';

    const actual = format(input);

    assert.strictEqual(actual, expected);
  });

  it('formats multiple increment instructions', () => {
    const input: Token[] = [{ type: TokenType.Increment, count: 3 }];
    const expected = 'awawawa';

    const actual = format(input);

    assert.strictEqual(actual, expected);
  });

  it('formats an empty decrement instruction', () => {
    const input: Token[] = [{ type: TokenType.Decrement, count: 0 }];
    const expected = '';

    const actual = format(input);

    assert.strictEqual(actual, expected);
  });

  it('formats a single decrement instruction', () => {
    const input: Token[] = [{ type: TokenType.Decrement, count: 1 }];
    const expected = 'wa';

    const actual = format(input);

    assert.strictEqual(actual, expected);
  });

  it('formats multiple decrement instructions', () => {
    const input: Token[] = [{ type: TokenType.Decrement, count: 3 }];
    const expected = 'wawawa';

    const actual = format(input);

    assert.strictEqual(actual, expected);
  });

  it('formats write instructions', () => {
    const input: Token[] = [{ type: TokenType.Write }];
    const expected = '.';

    const actual = format(input);

    assert.strictEqual(actual, expected);
  });

  it('formats read instructions', () => {
    const input: Token[] = [{ type: TokenType.Read }];
    const expected = ',';

    const actual = format(input);

    assert.strictEqual(actual, expected);
  });

  it('formats adjacent instructions', () => {
    const input: Token[] = [
      { type: TokenType.RightShift, count: 1 },
      { type: TokenType.Increment, count: 1 },
    ];
    const expected = 'awa~ awa';

    const actual = format(input);

    assert.strictEqual(actual, expected);
  });

  it('formats potentially ambiguous Increment+Decrement with interceding whitespace', () => {
    const input: Token[] = [
      { type: TokenType.Increment, count: 1 },
      { type: TokenType.Decrement, count: 1 },
    ];
    const expected = 'awa wa';

    const actual = format(input);

    assert.strictEqual(actual, expected);
  });

  it('formats potentially ambiguous Increment+LeftShift with interceding whitespace', () => {
    const input: Token[] = [
      { type: TokenType.Increment, count: 1 },
      { type: TokenType.LeftShift, count: 1 },
    ];
    const expected = 'awa wa~';

    const actual = format(input);

    assert.strictEqual(actual, expected);
  });

  it('formats potentially ambiguous Decrement+LeftShift with interceding whitespace', () => {
    const input: Token[] = [
      { type: TokenType.Decrement, count: 1 },
      { type: TokenType.LeftShift, count: 1 },
    ];
    const expected = 'wa wa~';

    const actual = format(input);

    assert.strictEqual(actual, expected);
  });

  it('formats empty loops', () => {
    const input: Token[] = [{ type: TokenType.Loop, content: [] }];
    const expected = '?!';

    const actual = format(input);

    assert.strictEqual(actual, expected);
  });

  it('formats loops with content', () => {
    const input: Token[] = [{ type: TokenType.Loop, content: [
      { type: TokenType.RightShift, count: 1 },
      { type: TokenType.Increment, count: 1 },
    ] }];
    const expected = '? awa~ awa!';

    const actual = format(input);

    assert.strictEqual(actual, expected);
  });

  it('formats nested loops with content', () => {
    const input: Token[] = [{ type: TokenType.Loop, content: [
      { type: TokenType.RightShift, count: 1 },
      { type: TokenType.Loop, content: [
        { type: TokenType.RightShift, count: 1 },
        { type: TokenType.Increment, count: 1 },
      ] },
      { type: TokenType.Increment, count: 1 },
    ] }];
    const expected = '? awa~? awa~ awa! awa!';

    const actual = format(input);

    assert.strictEqual(actual, expected);
  });

  it('formats immediate nested loops with content', () => {
    const input: Token[] = [{ type: TokenType.Loop, content: [
      { type: TokenType.Loop, content: [
        { type: TokenType.RightShift, count: 1 },
        { type: TokenType.Increment, count: 1 },
      ] },
      { type: TokenType.RightShift, count: 1 },
      { type: TokenType.Loop, content: [
        { type: TokenType.Loop, content: [] },
        { type: TokenType.RightShift, count: 1 },
        { type: TokenType.Increment, count: 1 },
      ] },
      { type: TokenType.Increment, count: 1 },
      { type: TokenType.Loop, content: [
        { type: TokenType.RightShift, count: 1 },
        { type: TokenType.Increment, count: 1 },
      ] },
    ] }];
    const expected = '?? awa~ awa! awa~??! awa~ awa! awa? awa~ awa!!';

    const actual = format(input);

    assert.strictEqual(actual, expected);
  });
});