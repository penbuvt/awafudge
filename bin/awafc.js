#!/usr/bin/env node

const { readFileSync } = require('fs');
const { stdout } = require('process');
const { EOL } = require('os');
const { AwafudgeParser, BrainfuckFormatter } = require('..');

const input = readFileSync(0).toString();
const parser = new AwafudgeParser();
const ast = parser.parse(input);
const formatted = BrainfuckFormatter.format(ast);
stdout.write(formatted + EOL);
