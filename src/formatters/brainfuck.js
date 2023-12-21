const { TokenType } = require('../token-types');

function format(tokens) {
  return tokens.length ? {
    [TokenType.RightShift]: '>',
    [TokenType.LeftShift]: '<',
    [TokenType.Increment]: '+',
  }[tokens[0].type].repeat(tokens[0].count) : '';
}

module.exports = {
  default: format,
  format,
};
