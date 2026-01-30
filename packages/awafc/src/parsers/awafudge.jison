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

program: operations SPACE? EOF {return $1;};

operations: /* empty */ {$$ = [];}
          | operations operation {$$ = $1.concat([$2]);}
          | operations SPACE operation {$$ = $1.concat([$3]);}
          ;

operation: decrements {$$ = $1;}
         | increments {$$ = $1;}
         | leftshifts {$$ = $1;}
         | rightshifts {$$ = $1;}
         | ',' {$$ = { type: 'READ' };}
         | '.' {$$ = { type: 'WRITE' };}
         | loop
         ;

loop: '?' operations SPACE? '!' {$$ = { type: 'LOOP', content: $2 };};

decrements: was {$$ = { type: 'DECREMENT', count: $1.length };};

increments: awas {$$ =  { type: 'INCREMENT', count: $1.length };};

leftshifts: was '~' {$$ = { type: 'LEFT_SHIFT', count: $1.length };}
          | '~' {$$ = { type: 'LEFT_SHIFT', count: 0 }};

rightshifts: awas '~' {$$ = { type: 'RIGHT_SHIFT', count: $1.length };};

was: WA+ {$$ = $1;};

awas: A {$$ = '';}
    | A was {$$ = $2;};
