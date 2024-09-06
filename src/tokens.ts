import { TokenType } from './token-types';

export interface CountableToken {
  type: 
    | TokenType.RightShift
    | TokenType.LeftShift
    | TokenType.Increment
    | TokenType.Decrement
    ;
  count: number;
}

export interface IOToken {
  type:
    | TokenType.Write
    | TokenType.Read
    ;
}

export interface LoopToken {
  type:
    | TokenType.Loop
    ;
  content: Token[];
}

export type Token = CountableToken | IOToken | LoopToken;
