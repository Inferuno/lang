import { LangError } from "./error.ts";

type SymbolKind = "plus" | "minus" | "asterisk" | "slash" | "lparen" | "rparen" | "caret";
type Token = { kind: "number"; value: number; position: number; text: string } | { kind: SymbolKind; position: number; text: string };

const ops: Partial<Record<string, SymbolKind>> = {
    '+': "plus",
    '-': "minus",
    '*': "asterisk",
    '/': "slash",
    '(': "lparen",
    ')': "rparen",
    '^': "caret"
};

export type { Token, SymbolKind };

/**
The tokenize function turns a text string (of arithmetic) into tokens.

Input: One line of text (math).
Output: A list of tokens representing the arithmetic.

Called by: main.ts (once per line).

Errors: 
- If you give it just a "." it will error with "Error: Unknown number "." at position 1."
- If you give it a number like "5.2.3" it will error with "Error: Unknown number "5.2." at position 4."
- If give it a number like "5x" it will error with "Error: Unknown character "x" at position 2."
Caveats:
- Passing multiple lines into tokenize will always throw an error. For example:
` 5+
2`
will just give an error "Unknown character "
" at position 3."
*/

export function tokenize(text: string): Token[] {
    const tokens: Token[] = [];

    let i = 0;

    while (i < text.length) {
        const char = text[i];

        if (char === " " || char === "\t") {
            i++;
            continue;
        }

        if (ops[char]) {
            tokens.push({ kind: ops[char], position: i + 1, text: char });
            i++;
            continue;
        }

        if (!"1234567890.".includes(char)) {
            throw new LangError(`Unknown character "${char}".`, i + 1);
        }
        const start: number = i;
        let seenDot: boolean = false;
        while (i < text.length && "1234567890.".includes(text[i])) {
            if (text[i] === "." && !seenDot) seenDot = true;
            else if (text[i] === ".") {
                throw new LangError(`Unknown number "${text.slice(start, i + 1)}".`, i + 1);
            }
            i++;
        }

        const numberText: string = text.slice(start, i);
        if (numberText === ".") throw new LangError(`Unknown number "${numberText}".`, start + 1);
        tokens.push({ kind: "number", value: Number(numberText), position: start + 1, text: numberText });

    }

    return tokens;
}