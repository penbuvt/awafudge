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

%ebnf

%%

program: operations EOF {return $1.join('');};

operations: /* empty */ {$$ = [];}
          | operations operation {$$ = ($1.push($2), $1);}
          ;

operation: LEFTSHIFT+ {$$ = $1.join('') + '~';}
         | RIGHTSHIFT+ {$$ = 'a' + $1.join('') + '~';}
         | INCREMENT+ {$$ = 'a' + $1.join('');}
         | DECREMENT+ {$$ = $1.join('');}
         | INPUT+ {$$ = $1.join('');}
         | OUTPUT+ {$$ = $1.join('');}
         | loop
         ;

loop: '[' operations ']' {$$ = '?' + $2.join('') + '!';};

LEFTSHIFT: '<' {$$ = 'wa';};

RIGHTSHIFT: '>' {$$ = 'wa';};

INCREMENT: '+' {$$ = 'wa';};

DECREMENT: '-' {$$ = 'wa';};

INPUT: ',';

OUTPUT: '.';
