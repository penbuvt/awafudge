%lex

%%

(\s|[^aw~.,?!])+ return 'SPACE';

("wa") return 'WA';
<<EOF>> return 'EOF';

/lex

%ebnf

%%

program: operations EOF {return $1.join('').trim();};

operations: /* empty */ {$$ = [];}
          | operations operation {$$ = ($1.push($2), $1);}
          ;

operation: decrements {$$ = $1;}
         ;

decrements: WA+ {$$ = '-'.repeat($1.length)};
