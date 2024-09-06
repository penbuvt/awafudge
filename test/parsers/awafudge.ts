import { parse } from '../../src/parsers/awafudge';
import { Token } from '../../src/tokens';
import { TokenType } from '../../src/token-types';
import { strict as assert } from 'node:assert';

describe('awafudge parser', () => {
  it('parses the empty string', () => {
    const input = '';
    const expected: Token[] = [];

    const actual = parse(input);

    assert.deepStrictEqual(actual, expected);
  });

  it('parses an empty right shift instruction', () => {
    const input = 'a~';
    const expected: Token[] = [
      { type: TokenType.RightShift, count: 0 },
    ];

    const actual = parse(input);

    assert.deepStrictEqual(actual, expected);
  });

  it('parses a single right shift instruction', () => {
    const input = 'awa~';
    const expected: Token[] = [
      { type: TokenType.RightShift, count: 1 },
    ];

    const actual = parse(input);

    assert.deepStrictEqual(actual, expected);
  });

  it('parses multiple right shift instructions', () => {
    const input = 'awawawa~';
    const expected: Token[] = [
      { type: TokenType.RightShift, count: 3 },
    ];

    const actual = parse(input);

    assert.deepStrictEqual(actual, expected);
  });

  it('parses an empty left shift instruction', () => {
    const input = '~';
    const expected: Token[] = [
      { type: TokenType.LeftShift, count: 0 },
    ];

    const actual = parse(input);

    assert.deepStrictEqual(actual, expected);
  });

  it('parses a single left shift instruction', () => {
    const input = 'wa~';
    const expected: Token[] = [
      { type: TokenType.LeftShift, count: 1 },
    ];

    const actual = parse(input);

    assert.deepStrictEqual(actual, expected);
  });

  it('parses multiple left shift instructions', () => {
    const input = 'wawawa~';
    const expected: Token[] = [
      { type: TokenType.LeftShift, count: 3 },
    ];

    const actual = parse(input);

    assert.deepStrictEqual(actual, expected);
  });

  it('parses an empty increment instruction', () => {
    const input = 'a';
    const expected: Token[] = [
      { type: TokenType.Increment, count: 0 },
    ];

    const actual = parse(input);

    assert.deepStrictEqual(actual, expected);
  });

  it('parses a single increment instruction', () => {
    const input = 'awa';
    const expected: Token[] = [
      { type: TokenType.Increment, count: 1 },
    ];

    const actual = parse(input);

    assert.deepStrictEqual(actual, expected);
  });

  it('parses multiple increment instructions', () => {
    const input = 'awawawa';
    const expected: Token[] = [
      { type: TokenType.Increment, count: 3 },
    ];

    const actual = parse(input);

    assert.deepStrictEqual(actual, expected);
  });

  it('parses a single decrement instruction', () => {
    const input = 'wa';
    const expected: Token[] = [
      { type: TokenType.Decrement, count: 1 },
    ];

    const actual = parse(input);

    assert.deepStrictEqual(actual, expected);
  });

  it('parses multiple decrement instructions', () => {
    const input = 'wawawa';
    const expected: Token[] = [
      { type: TokenType.Decrement, count: 3 },
    ];

    const actual = parse(input);

    assert.deepStrictEqual(actual, expected);
  });

  it('parses a single write instruction', () => {
    const input = '.';
    const expected: Token[] = [
      { type: TokenType.Write },
    ];

    const actual = parse(input);

    assert.deepStrictEqual(actual, expected);
  });

  it('parses multiple write instructions', () => {
    const input = '...';
    const expected: Token[] = [
      { type: TokenType.Write },
      { type: TokenType.Write },
      { type: TokenType.Write },
    ];

    const actual = parse(input);

    assert.deepStrictEqual(actual, expected);
  });

  it('parses a single read instruction', () => {
    const input = ',';
    const expected: Token[] = [
      { type: TokenType.Read },
    ];

    const actual = parse(input);

    assert.deepStrictEqual(actual, expected);
  });

  it('parses multiple read instructions', () => {
    const input = ',,,';
    const expected: Token[] = [
      { type: TokenType.Read },
      { type: TokenType.Read },
      { type: TokenType.Read },
    ];

    const actual = parse(input);

    assert.deepStrictEqual(actual, expected);
  });

  it('parses a single empty loop instruction', () => {
    const input = '?!';
    const expected: Token[] = [
      { type: TokenType.Loop, content: [] },
    ];

    const actual = parse(input);

    assert.deepStrictEqual(actual, expected);
  });

  it('parses nested loop instructions', () => {
    const input = '???!!!';
    const expected: Token[] = [
      { type: TokenType.Loop, content: [
        { type: TokenType.Loop, content: [
          { type: TokenType.Loop, content: [] },
        ] },
      ] },
    ];

    const actual = parse(input);

    assert.deepStrictEqual(actual, expected);
  });

  it('parses loop instructions with content', () => {
    const input = '? awa~ wa~ awa wa.,?!!';
    const expected: Token[] = [
      { type: TokenType.Loop, content: [
        { type: TokenType.RightShift, count: 1 },
        { type: TokenType.LeftShift, count: 1 },
        { type: TokenType.Increment, count: 1 },
        { type: TokenType.Decrement, count: 1 },
        { type: TokenType.Write },
        { type: TokenType.Read },
        { type: TokenType.Loop, content: [] },
      ] },
    ];

    const actual = parse(input);

    assert.deepStrictEqual(actual, expected);
  });

  it('throws on incomplete loop', () => {
    const input = '?';

    const actual = () => parse(input);

    assert.throws(actual, Error);
  });

  it('throws on stray loop end', () => {
    const input = '!';

    const actual = () => parse(input);

    assert.throws(actual, Error);
  });

  it('parses adjacent word instructions of the same type', () => {
    const input = 'awawa awawa';
    const expected: Token[] = [
      { type: TokenType.Increment, count: 2 },
      { type: TokenType.Increment, count: 2 },
    ];

    const actual = parse(input);

    assert.deepStrictEqual(actual, expected);
  });

  it('parses adjacent instructions with non-instruction characters in between', () => {
    const input = 'awa|wa';
    const expected: Token[] = [
      { type: TokenType.Increment, count: 1 },
      { type: TokenType.Decrement, count: 1 },
    ];

    const actual = parse(input);

    assert.deepStrictEqual(actual, expected);
  });

  describe('unambiguous adjacent instructions without whitespace', () => {
    it('parses instructions after tildes', () => {
      const input = 'awawa~awa';
      const expected: Token[] = [
        { type: TokenType.RightShift, count: 2 },
        { type: TokenType.Increment, count: 1 },
      ];

      const actual = parse(input);

      assert.deepStrictEqual(actual, expected);
    });

    it('parses instructions with adacent "a"s', () => {
      const input = 'awaawa~';
      const expected: Token[] = [
        { type: TokenType.Increment, count: 1 },
        { type: TokenType.RightShift, count: 1 },
      ];

      const actual = parse(input);

      assert.deepStrictEqual(actual, expected);
    });

    it('parses instructions around reads and writes', () => {
      const input = 'awa,wa.wa';
      const expected: Token[] = [
        { type: TokenType.Increment, count: 1 },
        { type: TokenType.Read },
        { type: TokenType.Decrement, count: 1 },
        { type: TokenType.Write },
        { type: TokenType.Decrement, count: 1 },
      ];

      const actual = parse(input);

      assert.deepStrictEqual(actual, expected);
    });

    it('parses instructions adjacent to loops', () => {
      const input = 'wa?wa?wa!wa!wa';
      const expected: Token[] = [
        { type: TokenType.Decrement, count: 1 },
        { type: TokenType.Loop, content: [
          { type: TokenType.Decrement, count: 1 },
          { type: TokenType.Loop, content: [
            { type: TokenType.Decrement, count: 1 },
          ] },
          { type: TokenType.Decrement, count: 1 },
        ] },
        { type: TokenType.Decrement, count: 1 },
      ];

      const actual = parse(input);

      assert.deepStrictEqual(actual, expected);
    });
  });

  it('ignores non-instruction characters', () => {
    const input = '`1234567890=qertyuiop\\sdfghjkl;\'zxcvbnm/ \n@#$%^&*()_QWERTYUIOP{}|ASDFGHJKL:"ZXCVBNM';
    const expected: Token[] = [];

    const actual = parse(input);

    assert.deepStrictEqual(actual, expected);
  });

  it('parses a hello world program', () => {
    // https://esolangs.org/wiki/Brainfuck#Hello,_World!
    const input = 'awawawawawa awawawa? awa~ awawawawa? awa~ awawa awa~ awawawa awa~ awawawa awa~ awa wawawawa~ wa! awa~ awa awa~ awa awa~ wa awawa~ awa? wa~! wa~ wa! awawa~. awa~ wawawa. awawawawawa awawa.. awawawa. awawa~. wa~ wa. wa~. awawawa. wawawawawa wa. wawawawawa wawawa. awawa~ awa. awa~ awawa.';
    const expected: Token[] = [
      { type: TokenType.Increment, count: 5 },
      { type: TokenType.Increment, count: 3 },
      { type: TokenType.Loop,
        content: [
          { type: TokenType.RightShift, count: 1 },
          { type: TokenType.Increment, count: 4 },
          { type: TokenType.Loop,
            content: [
              { type: TokenType.RightShift, count: 1 },
              { type: TokenType.Increment, count: 2 },
              { type: TokenType.RightShift, count: 1 },
              { type: TokenType.Increment, count: 3 },
              { type: TokenType.RightShift, count: 1 },
              { type: TokenType.Increment, count: 3 },
              { type: TokenType.RightShift, count: 1 },
              { type: TokenType.Increment, count: 1 },
              { type: TokenType.LeftShift, count: 4 },
              { type: TokenType.Decrement, count: 1 }
            ]
          },
          { type: TokenType.RightShift, count: 1 },
          { type: TokenType.Increment, count: 1 },
          { type: TokenType.RightShift, count: 1 },
          { type: TokenType.Increment, count: 1 },
          { type: TokenType.RightShift, count: 1 },
          { type: TokenType.Decrement, count: 1 },
          { type: TokenType.RightShift, count: 2 },
          { type: TokenType.Increment, count: 1 },
          { type: TokenType.Loop,
            content: [
              { type: TokenType.LeftShift, count: 1 }
            ]
          },
          { type: TokenType.LeftShift, count: 1 },
          { type: TokenType.Decrement, count: 1 }
        ]
      },
      { type: TokenType.RightShift, count: 2 },
      { type: TokenType.Write },
      { type: TokenType.RightShift, count: 1 },
      { type: TokenType.Decrement, count: 3 },
      { type: TokenType.Write },
      { type: TokenType.Increment, count: 5 },
      { type: TokenType.Increment, count: 2 },
      { type: TokenType.Write },
      { type: TokenType.Write },
      { type: TokenType.Increment, count: 3 },
      { type: TokenType.Write },
      { type: TokenType.RightShift, count: 2 },
      { type: TokenType.Write },
      { type: TokenType.LeftShift, count: 1 },
      { type: TokenType.Decrement, count: 1 },
      { type: TokenType.Write },
      { type: TokenType.LeftShift, count: 1 },
      { type: TokenType.Write },
      { type: TokenType.Increment, count: 3 },
      { type: TokenType.Write },
      { type: TokenType.Decrement, count: 5 },
      { type: TokenType.Decrement, count: 1 },
      { type: TokenType.Write },
      { type: TokenType.Decrement, count: 5 },
      { type: TokenType.Decrement, count: 3 },
      { type: TokenType.Write },
      { type: TokenType.RightShift, count: 2 },
      { type: TokenType.Increment, count: 1 },
      { type: TokenType.Write },
      { type: TokenType.RightShift, count: 1 },
      { type: TokenType.Increment, count: 2 },
      { type: TokenType.Write }
    ]

    const actual = parse(input);

    assert.deepStrictEqual(actual, expected);
  });
});
