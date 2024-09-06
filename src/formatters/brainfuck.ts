const { TokenType } = require('../token-types');

export function format(tokens) {
  return tokens.map((token) => {
    switch (token.type) {
      case TokenType.RightShift:
      case TokenType.LeftShift:
      case TokenType.Increment:
      case TokenType.Decrement:
        return {
          [TokenType.RightShift]: '>',
          [TokenType.LeftShift]: '<',
          [TokenType.Increment]: '+',
          [TokenType.Decrement]: '-',
        }[token.type].repeat(token.count);
      case TokenType.Write:
        return '.';
      case TokenType.Read:
        return ',';
      case TokenType.Loop:
        return '[' + format(token.content) + ']';
    }
  }).join('');
}

export default format;
