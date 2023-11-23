%lex

%%

(\s|[^aw~.,?!])+ return 'SPACE';

("a") return 'A';
("wa") return 'WA';
<<EOF>> return 'EOF';

/lex

%ebnf

%%

program: operations EOF {return $1.join('').trim();};

operations: /* empty */ {$$ = [];}
          | operation {$$ = [$1];}
          | space_required_operations {$$ = [$1];}
          | space_optional_operations {$$ = [$1];}
          /*| operation (operations) operation {$$ = ($2.unshift($1), $2.push($3), $2);}*/
          ;

space_required_operations: increments SPACE decrements {$$ = $1 + $3;}
                         ;

space_optional_operations: decrements SPACE? increments {$$ = $1 + $3;}
                         ;

operation: decrements {$$ = $1;}
         | increments {$$ = $1;}
         ;

decrements: WA+ {$$ = '-'.repeat($1.length);};

increments: A WA+ {$$ = '+'.repeat($2.length);};
