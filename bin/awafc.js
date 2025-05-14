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

const outFile = options.output;

const input = readFileSync(0).toString();
const parser = new AwafudgeParser();
const ast = parser.parse(input);
const formatted = BrainfuckFormatter.format(ast);

if (outFile) {
  writeFileSync(outFile, formatted + EOL);
} else {
  stdout.write(formatted + EOL);
}
