const { TokenType } = require('../token-types');

function format(tokens) {
  return tokens.map((token) => {
    switch (token.type) {
      case TokenType.RightShift:
      case TokenType.LeftShift:
      case TokenType.Increment:
        return {
          [TokenType.RightShift]: '>',
          [TokenType.LeftShift]: '<',
          [TokenType.Increment]: '+',
        }[token.type].repeat(token.count);
      case TokenType.Write:
        return '.';
      case TokenType.Loop:
        return '[]';
    }
  }).join('');
}

module.exports = {
  default: format,
  format,
};
