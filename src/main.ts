import { tokenize } from "./tokenizer.ts";
import { evaluate } from "./evaluator.ts";
import { parse } from "./parser.ts";

console.log(evaluate(parse(tokenize("((2 + 3) * 4) - 1"))));