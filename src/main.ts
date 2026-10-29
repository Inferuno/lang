import { tokenize } from "./tokenizer.ts";
import { evaluate } from "./evaluator.ts";

console.log(tokenize(`2 + (3 * 4)`));
console.log(evaluate({ op: "plus", left: 2, right: { op: "asterisk", left: 3, right: 4 } }));