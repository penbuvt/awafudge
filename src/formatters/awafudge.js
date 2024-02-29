const { TokenType } = require('../token-types');

const DELETE_PREV_WHITESPACE = '__DELWS__';

function format(tokens) {
  return tokens.map((token) => {
    switch (token.type) {
      case TokenType.RightShift:
        return formatRepeatableWa('a', token.count, '~');
      case TokenType.LeftShift:
        return formatRepeatableWa('', token.count, '~');
      case TokenType.Increment:
        return formatRepeatableWa('a', token.count, '');
      case TokenType.Decrement:
        return formatRepeatableWa('', token.count, '');
      case TokenType.Write:
        return '.';
      case TokenType.Read:
        return ',';
      case TokenType.Loop:
        return !token.content.length
          ? DELETE_PREV_WHITESPACE + '?!'
          : DELETE_PREV_WHITESPACE + '? ' + format(token.content) + '!';
    }
  }).join(' ').replaceAll(new RegExp(' ?' + DELETE_PREV_WHITESPACE, 'g'), '');
}

function formatRepeatableWa(prefix, count, suffix) {
  return prefix + 'wa'.repeat(count) + suffix;
}

module.exports = {
  default: format,
  format,
};

