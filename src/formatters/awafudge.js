const { TokenType } = require('../token-types');

function format(tokens) {
  return tokens.map((token) => {
    switch (token.type) {
      case TokenType.RightShift:
        return 'a' + 'wa'.repeat(token.count) + '~';
      case TokenType.LeftShift:
        return 'wa'.repeat(token.count) + '~';
    }
  }).join('');
}

module.exports = {
  default: format,
  format,
};

