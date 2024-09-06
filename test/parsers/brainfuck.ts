import { parse } from '../../src/parsers/brainfuck';
import { Token } from '../../src/tokens';
import { TokenType } from '../../src/token-types';
import { strict as assert } from 'node:assert';

describe('brainfuck parser', () => {
  it('parses the empty string', () => {
    const input = '';
    const expected: Token[] = [];

    const actual = parse(input);

    assert.deepStrictEqual(actual, expected);
  });

  it('parses a single right shift instruction', () => {
    const input = '>';
    const expected: Token[] = [
      { type: TokenType.RightShift, count: 1 },
    ];

    const actual = parse(input);

    assert.deepStrictEqual(actual, expected);
  });

  it('parses multiple right shift instructions', () => {
    const input = '>>>';
    const expected: Token[] = [
      { type: TokenType.RightShift, count: 3 },
    ];

    const actual = parse(input);

    assert.deepStrictEqual(actual, expected);
  });

  it('parses a single left shift instruction', () => {
    const input = '<';
    const expected: Token[] = [
      { type: TokenType.LeftShift, count: 1 },
    ];

    const actual = parse(input);

    assert.deepStrictEqual(actual, expected);
  });

  it('parses multiple left shift instructions', () => {
    const input = '<<<';
    const expected: Token[] = [
      { type: TokenType.LeftShift, count: 3 },
    ];

    const actual = parse(input);

    assert.deepStrictEqual(actual, expected);
  });

  it('parses a single increment instruction', () => {
    const input = '+';
    const expected: Token[] = [
      { type: TokenType.Increment, count: 1 },
    ];

    const actual = parse(input);

    assert.deepStrictEqual(actual, expected);
  });

  it('parses multiple increment instructions', () => {
    const input = '+++';
    const expected: Token[] = [
      { type: TokenType.Increment, count: 3 },
    ];

    const actual = parse(input);

    assert.deepStrictEqual(actual, expected);
  });

  it('parses a single decrement instruction', () => {
    const input = '-';
    const expected: Token[] = [
      { type: TokenType.Decrement, count: 1 },
    ];

    const actual = parse(input);

    assert.deepStrictEqual(actual, expected);
  });

  it('parses multiple decrement instructions', () => {
    const input = '---';
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
    const input = '[]';
    const expected: Token[] = [
      { type: TokenType.Loop, content: [] },
    ];

    const actual = parse(input);

    assert.deepStrictEqual(actual, expected);
  });

  it('parses nested loop instructions', () => {
    const input = '[[[]]]';
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
    const input = '[><+-.,[]]';
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
    const input = '[';

    const actual = () => parse(input);

    assert.throws(actual, Error);
  });

  it('throws on stray loop end', () => {
    const input = ']';

    const actual = () => parse(input);

    assert.throws(actual, Error);
  });

  it('parses adjacent word instructions of the same type as separate tokens', () => {
    const input = '++ ++';
    const expected: Token[] = [
      { type: TokenType.Increment, count: 2 },
      { type: TokenType.Increment, count: 2 },
    ];

    const actual = parse(input);

    assert.deepStrictEqual(actual, expected);
  });

  describe('potential ambiguous cases', () => {
    // These cases require separating the tokens with a space on output
    // to avoid ambiguous tokens.

    it('parses +-', () => {
      const input = '+-';
      const expected: Token[] = [
        { type: TokenType.Increment, count: 1 },
        { type: TokenType.Decrement, count: 1 },
      ];

      const actual = parse(input);

      assert.deepStrictEqual(actual, expected);
    });

    it('parses +<', () => {
      const input = '+<';
      const expected: Token[] = [
        { type: TokenType.Increment, count: 1 },
        { type: TokenType.LeftShift, count: 1 },
      ];

      const actual = parse(input);

      assert.deepStrictEqual(actual, expected);
    });

    it('parses -<', () => {
      const input = '-<';
      const expected: Token[] = [
        { type: TokenType.Decrement, count: 1 },
        { type: TokenType.LeftShift, count: 1 },
      ];

      const actual = parse(input);

      assert.deepStrictEqual(actual, expected);
    });
  })

  it('ignores non-instruction characters', () => {
    const input = '`1234567890=qwertyuiop\\asdfghjkl;\'zxcvbnm/ \n~!@#$%^&*()_QWERTYUIOP{}|ASDFGHJKL:"ZXCVBNM?';
    const expected: Token[] = [];

    const actual = parse(input);

    assert.deepStrictEqual(actual, expected);
  });

  it('parses a hello world program', () => {
    // https://esolangs.org/wiki/Brainfuck#Hello,_World!
    const input = `
 1 +++++ +++               Set Cell #0 to 8
 2 [
 3     >++++               Add 4 to Cell #1; this will always set Cell #1 to 4
 4     [                   as the cell will be cleared by the loop
 5         >++             Add 4*2 to Cell #2
 6         >+++            Add 4*3 to Cell #3
 7         >+++            Add 4*3 to Cell #4
 8         >+              Add 4 to Cell #5
 9         <<<<-           Decrement the loop counter in Cell #1
10     ]                   Loop till Cell #1 is zero
11     >+                  Add 1 to Cell #2
12     >+                  Add 1 to Cell #3
13     >-                  Subtract 1 from Cell #4
14     >>+                 Add 1 to Cell #6
15     [<]                 Move back to the first zero cell you find; this will
16                         be Cell #1 which was cleared by the previous loop
17     <-                  Decrement the loop Counter in Cell #0
18 ]                       Loop till Cell #0 is zero
19
20 The result of this is:
21 Cell No :   0   1   2   3   4   5   6
22 Contents:   0   0  72 104  88  32   8
23 Pointer :   ^
24
25 >>.                     Cell #2 has value 72 which is 'H'
26 >---.                   Subtract 3 from Cell #3 to get 101 which is 'e'
27 +++++ ++..+++.          Likewise for 'llo' from Cell #3
28 >>.                     Cell #5 is 32 for the space
29 <-.                     Subtract 1 from Cell #4 for 87 to give a 'W'
30 <.                      Cell #3 was set to 'o' from the end of 'Hello'
31 +++.----- -.----- ---.  Cell #3 for 'rl' and 'd'
32 >>+.                    Add 1 to Cell #5 gives us an exclamation point
33 >++.                    And finally a newline from Cell #6
`;
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
