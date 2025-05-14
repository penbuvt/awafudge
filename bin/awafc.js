#!/usr/bin/env node

const { readFileSync, writeFileSync } = require('fs');
const { stdout } = require('process');
const { EOL } = require('os');
const path = require('path');
const nopt = require('nopt');
const { AwafudgeParser, BrainfuckFormatter } = require('..');

const options = nopt({
  'output': path,
}, {
  'o': ['--output'],
});


const inFile = options.argv.remain[0] || 0; // default to stdin if not given
const outFile = options.output || 1; // default to stdout if not given

const input = readFileSync(inFile).toString();
const parser = new AwafudgeParser();
const ast = parser.parse(input);
const formatted = BrainfuckFormatter.format(ast);
writeFileSync(outFile, formatted + EOL);
