import { Token } from '../tokens';
import { TokenType } from '../token-types';

export function format(tokens: Token[]): string {
  return tokens.map((token): string => {
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
