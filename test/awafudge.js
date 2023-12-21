const { parse } = require('../src/parsers/awafudge');
const assert = require('node:assert').strict;

describe('awafudge parser', () => {
  it('parses the empty string', () => {
    const input = '';
    const expected = '';

    const actual = parse(input);

    assert.strictEqual(actual, expected);
  });

  it('parses a single right shift instruction', () => {
    const input = 'awa~';
    const expected = '>';

    const actual = parse(input);

    assert.strictEqual(actual, expected);
  });

  it('parses multiple right shift instructions', () => {
    const input = 'awawawa~';
    const expected = '>>>';

    const actual = parse(input);

    assert.strictEqual(actual, expected);
  });

  it('parses a single left shift instruction', () => {
    const input = 'wa~';
    const expected = '<';

    const actual = parse(input);

    assert.strictEqual(actual, expected);
  });

  it('parses multiple left shift instructions', () => {
    const input = 'wawawa~';
    const expected = '<<<';

    const actual = parse(input);

    assert.strictEqual(actual, expected);
  });

  it('parses a single increment instruction', () => {
    const input = 'awa';
    const expected = '+';

    const actual = parse(input);

    assert.strictEqual(actual, expected);
  });

  it('parses multiple increment instructions', () => {
    const input = 'awawawa';
    const expected = '+++';

    const actual = parse(input);

    assert.strictEqual(actual, expected);
  });

  it('parses a single decrement instruction', () => {
    const input = 'wa';
    const expected = '-';

    const actual = parse(input);

    assert.strictEqual(actual, expected);
  });

  it('parses multiple decrement instructions', () => {
    const input = 'wawawa';
    const expected = '---';

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
    const input = '?!';
    const expected = '[]';

    const actual = parse(input);

    assert.strictEqual(actual, expected);
  });

  it('parses nested loop instructions', () => {
    const input = '???!!!';
    const expected = '[[[]]]';

    const actual = parse(input);

    assert.strictEqual(actual, expected);
  });

  it('parses loop instructions with content', () => {
    const input = '? awa~ wa~ awa wa.,?!!';
    const expected = '[><+-.,[]]';

    const actual = parse(input);

    assert.strictEqual(actual, expected);
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
    const expected = '++++';

    const actual = parse(input);

    assert.strictEqual(actual, expected);
  });

  it('ignores non-instruction characters', () => {
    const input = '`1234567890=qertyuiop\\sdfghjkl;\'zxcvbnm/ \n@#$%^&*()_QWERTYUIOP{}|ASDFGHJKL:"ZXCVBNM';
    const expected = '';

    const actual = parse(input);

    assert.strictEqual(actual, expected);
  });

  it('parses a hello world program', () => {
    const input = 'awawawawawa awawawa? awa~ awawawawa? awa~ awawa awa~ awawawa awa~ awawawa awa~ awa wawawawa~ wa! awa~ awa awa~ awa awa~ wa awawa~ awa? wa~! wa~ wa! awawa~. awa~ wawawa. awawawawawa awawa.. awawawa. awawa~. wa~ wa. wa~. awawawa. wawawawawa wa. wawawawawa wawawa. awawa~ awa. awa~ awawa.';
    // https://esolangs.org/wiki/Brainfuck#Hello,_World!
    const expected = '++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.';

    const actual = parse(input);

    assert.strictEqual(actual, expected);
  });
});

