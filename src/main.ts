import { tokenize } from "./tokenizer.ts";
import { evaluate } from "./evaluator.ts";
import { parse } from "./parser.ts";

console.log(evaluate(parse(tokenize("-4^2"))));