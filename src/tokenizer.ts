type Token = { kind: "number"; value: number } | { kind: "plus" } | { kind: "minus" } | { kind: "slash" } | { kind: "asterisk" } | { kind: "lparen" } | { kind: "rparen" } | { kind: "caret" };
type SymbolKind = "plus" | "minus" | "asterisk" | "slash" | "lparen" | "rparen" | "caret";

export type { Token };

export function tokenize(text: string): Token[] {
    const tokens: Token[] = [];
    let number: string = "";

    const ops: Record<string, SymbolKind> = {
        '+': "plus",
        '-': "minus",
        '*': "asterisk",
        '/': "slash",
        '(': "lparen",
        ')': "rparen",
        '^': "caret"
    };

    let i = 0;

    while (i < text.length) {
        const char = text[i];

        if (char === " ") {
            i++;
            continue;
        }

        if (ops[char]) {
            tokens.push({ kind: ops[char] });
            i++;
            continue
        }

        if ("1234567890.".includes(char)) {
            number += char;
            if (!"1234567890.".includes(text[i + 1])) {
                if (isNaN(Number(number))) {
                    throw new Error(`Invalid number "${number}" at position ${i - (number.length - 1)}.`);
                }
                tokens.push({ kind: "number", value: Number(number) });
                number = "";
            }
        } else {
            throw new Error(`Unknown character "${char}" at position ${i + 1}`);
        }
        i++
    }

    return tokens;
}