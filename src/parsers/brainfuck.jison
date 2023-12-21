%lex

%%

[^-+<>\[\],.]+ /* ignore all other characters */

\-+ return 'DECREMENTS';
\++ return 'INCREMENTS';
\<+ return 'LEFTSHIFTS';
\>+ return 'RIGHTSHIFTS';
"[" return '[';
"]" return ']';
"." return '.';
"," return ',';
<<EOF>> return 'EOF';

/lex

%ebnf

%%

program: operations EOF {return $1.join('').trim();};

operations: /* empty */ {$$ = [];}
          | operations operation {$$ = ($1.push($2), $1);}
          ;

operation: LEFTSHIFTS {$$ = ' ' + 'wa'.repeat(yyleng) + '~';}
         | RIGHTSHIFTS {$$ = ' a' + 'wa'.repeat(yyleng) + '~';}
         | INCREMENTS {$$ = ' a' + 'wa'.repeat(yyleng);}
         | DECREMENTS {$$ = ' ' + 'wa'.repeat(yyleng);}
         | INPUT {$$ = $1;}
         | OUTPUT {$$ = $1;}
         | loop
         ;

loop: '[' operations ']' {$$ = '?' + $2.join('') + '!';};

LEFTSHIFT: '<' {$$ = 'wa';};

RIGHTSHIFT: '>' {$$ = 'wa';};

INCREMENT: '+' {$$ = 'wa';};

DECREMENT: '-' {$$ = 'wa';};

INPUT: ',';

OUTPUT: '.';
