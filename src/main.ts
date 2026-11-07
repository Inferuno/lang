import { tokenize } from "./tokenizer.ts";
import { evaluate } from "./evaluator.ts";
import { parse } from "./parser.ts";
import { LangError } from "./error.ts";

const code = `12(51+12)
500*(2-1)
(15)
()
2 @ 5
`;


const codeLines: string[] = code.split("\n").map(line => line.trimEnd());

for (let i = 0; i < codeLines.length; i++) {
    const line = codeLines[i];
    try {
        const tokens = tokenize(line);

        if (tokens.length === 0) continue;

        const tree = parse(tokens);
        const answer = evaluate(tree);
        console.log(answer);
    } catch (error) {
        if (error instanceof LangError) {
            console.log(`At line ${i + 1}, character ${error.position}: "${error.message}"`);
        } else {
            throw error;
        }
    }
}