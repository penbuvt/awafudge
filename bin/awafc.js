#!/usr/bin/env node

const { readFileSync, writeFileSync } = require('fs');
const { stdout } = require('process');
const { EOL } = require('os');
const path = require('path');
const nopt = require('nopt');
const {
  AwafudgeParser,
  AwafudgeFormatter,
  BrainfuckParser,
  BrainfuckFormatter,
} = require('..');

const options = nopt({
  'output': path,
  'to': ['awafudge', 'brainfuck'],
  'from': ['awafudge', 'brainfuck'],
}, {
  'o': ['--output'],
});


const inFile = options.argv.remain[0] || 0; // default to stdin if not given
const outFile = options.output || 1; // default to stdout if not given

const swap = {
  awafudge: 'brainfuck',
  brainfuck: 'awafudge',
};
const fromLang = options.from ?? swap[options.to] ?? 'awafudge';
const toLang = options.to ?? swap[options.from] ?? 'brainfuck';

const parsers = {
  awafudge: AwafudgeParser,
  brainfuck: BrainfuckParser,
};

const formatters = {
  awafudge: AwafudgeFormatter,
  brainfuck: BrainfuckFormatter,
};

const input = readFileSync(inFile).toString();
const parser = new (parsers[fromLang])();
const ast = parser.parse(input);
const formatted = (formatters[toLang]).format(ast);
writeFileSync(outFile, formatted + EOL);
