%lex

%%

("a") return 'A';
("wa") return 'WA';

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
         ;

decrements: WA+ {$$ = '-'.repeat($1.length);};

increments: A WA+ {$$ = '+'.repeat($2.length);};
