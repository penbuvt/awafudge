%lex

%%

("a") return 'A';
("wa") return 'WA';
"~" return '~';

(\s|[^aw~.,?!])+ return 'SPACE';

<<EOF>> return 'EOF';

/lex

%ebnf

%%

program: operations EOF {return $1.join('').trim();};

operations: /* empty */ {$$ = [];}
          | operations SPACE {$$ = $1;}
          | operations operation {$$ = $1.concat([$2]);}
          ;

operation: decrements {$$ = $1;}
         | increments {$$ = $1;}
         | leftshifts {$$ = $1;}
         | rightshifts {$$ = $1;}
         ;

decrements: was {$$ = '-'.repeat($1.length);};

increments: awas {$$ = '+'.repeat($1.length);};

leftshifts: was '~' {$$ = '<'.repeat($1.length);};

rightshifts: awas '~' {$$ = '>'.repeat($1.length);};

was: WA+ {$$ = $1;};

awas: A was {$$ = $2;};
