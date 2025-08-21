import { Token } from '../tokens';
import { TokenType } from '../token-types';

const DELETE_PREV_WHITESPACE = '__DELWS__';

export interface FormatOptions {
  processDirectives?: boolean;
}

export function format(
  tokens: Token[],
  { processDirectives = true }: FormatOptions = {}
): string {
  const formatted = tokens.map((token): string => {
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
        return DELETE_PREV_WHITESPACE + '.';
      case TokenType.Read:
        return DELETE_PREV_WHITESPACE + ',';
      case TokenType.Loop:
        return !token.content.length
          ? DELETE_PREV_WHITESPACE + '?!'
          : DELETE_PREV_WHITESPACE
            + '? '
            + format(token.content, { processDirectives: false })
            + '!';
    }
  }).join(' ');

  return processDirectives
    ? formatted.replaceAll(new RegExp(' ?' + DELETE_PREV_WHITESPACE, 'g'), '')
    : formatted;
}

function formatRepeatableWa(
  prefix: string,
  count: number,
  suffix: string
): string {
  return prefix + 'wa'.repeat(count) + suffix;
}

export default format;
