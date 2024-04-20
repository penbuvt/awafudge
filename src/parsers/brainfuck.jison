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

program: operations EOF {return $1;};

operations: /* empty */ {$$ = [];}
          | operations operation {$$ = ($1.push($2), $1);}
          ;

operation: LEFTSHIFTS {$$ = { type: 'LEFT_SHIFT', count: yyleng };}
         | RIGHTSHIFTS {$$ = { type: 'RIGHT_SHIFT', count: yyleng };}
         | INCREMENTS {$$ = { type: 'INCREMENT', count: yyleng };}
         | DECREMENTS {$$ = { type: 'DECREMENT', count: yyleng };}
         | INPUT {$$ = { type: 'READ' };}
         | OUTPUT {$$ = { type: 'WRITE' };}
         | loop
         ;

loop: '[' operations ']' {$$ = { type: 'LOOP', content: $2 };};

LEFTSHIFT: '<';

RIGHTSHIFT: '>';

INCREMENT: '+';

DECREMENT: '-';

INPUT: ',';

OUTPUT: '.';
