const { TokenType } = require('../token-types');

function format(tokens) {
  if (!tokens.length) return '';

  switch (tokens[0].type) {
    case TokenType.RightShift:
    case TokenType.LeftShift:
    case TokenType.Increment:
      return {
        [TokenType.RightShift]: '>',
        [TokenType.LeftShift]: '<',
        [TokenType.Increment]: '+',
      }[tokens[0].type].repeat(tokens[0].count);
    case TokenType.Write:
      return '.';
    case TokenType.Loop:
      return '[]';
  }
}

module.exports = {
  default: format,
  format,
};
