%lex

%%
"-" return '-';
"+" return '+';
"<" return '<';
">" return '>';
"[" return '[';
"]" return ']';
"." return '.';
"," return ',';
<<EOF>> return 'EOF';

/lex

%%

program: operations EOF {return $1;};

operations: /* empty */ {$$ = [];}
          | operations operation {$$ = (($1).push($2), $1);}
          ;

operation: LEFTSHIFT
         | RIGHTSHIFT
         | INCREMENT
         | DECREMENT
         | INPUT
         | OUTPUT
         | loop
         ;

loop: '[' operations ']' {$$ = $2;};

LEFTSHIFT: '<' {$$ = '<';};

RIGHTSHIFT: '>' {$$ = '>';};

INCREMENT: '+' {$$ = '+';};

DECREMENT: '-' {$$ = '-';};

INPUT: ',' {$$ = ',';};

OUTPUT: '.' {$$ = '.';};
