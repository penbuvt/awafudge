const { TokenType } = require('../token-types');

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
    }
  }).join(' ');
}

function formatRepeatableWa(prefix, count, suffix) {
  return prefix + 'wa'.repeat(count) + suffix;
}

module.exports = {
  default: format,
  format,
};

