%lex

%%

("a") return 'A';
("wa") return 'WA';
"," return ',';
"." return '.';
"?" return '?';
"!" return '!';
"~" return '~';

(\s|[^aw~.,?!])+ return 'SPACE';

<<EOF>> return 'EOF';

/lex

%ebnf

%%

program: operations SPACE? EOF {return $1.join('').trim();};

operations: /* empty */ {$$ = [];}
          | operations operation {$$ = $1.concat([$2]);}
          | operations SPACE operation {$$ = $1.concat([$3]);}
          ;

operation: decrements {$$ = $1;}
         | increments {$$ = $1;}
         | leftshifts {$$ = $1;}
         | rightshifts {$$ = $1;}
         | ',' {$$ = $1;}
         | '.' {$$ = $1;}
         | loop
         ;

loop: '?' operations '!' {$$ = '[' + $2.join('') + ']';};

decrements: was {$$ = '-'.repeat($1.length);};

increments: awas {$$ = '+'.repeat($1.length);};

leftshifts: was '~' {$$ = '<'.repeat($1.length);}
          | '~' {$$ = ''};

rightshifts: awas '~' {$$ = '>'.repeat($1.length);};

was: WA+ {$$ = $1;};

awas: A {$$ = '';}
    | A was {$$ = $2;};
