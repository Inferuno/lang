type Token = { kind: "number"; value: number } | { kind: "plus" } | { kind: "minus" } | { kind: "slash" } | { kind: "asterisk" } | { kind: "lparen" } | { kind: "rparen" } | { kind: "caret" };
type SymbolKind = "plus" | "minus" | "asterisk" | "slash" | "lparen" | "rparen" | "caret";

const ops: Record<string, SymbolKind> = {
    '+': "plus",
    '-': "minus",
    '*': "asterisk",
    '/': "slash",
    '(': "lparen",
    ')': "rparen",
    '^': "caret"
};

export type { Token };

export function tokenize(text: string): Token[] {
    const tokens: Token[] = [];

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
            continue;
        }

        if (!"1234567890.".includes(char)) {
            throw new Error(`Unknown character "${char}" at position ${i + 1}.`);

        }
        const start: number = i;
        let seenDot: boolean = false;
        while (i < text.length && "1234567890.".includes(text[i])) {
            if (text[i] === "." && seenDot !== true) seenDot = true;
            else if (text[i] === "." && seenDot === true) {
                throw new Error(`Unknown number "${text.slice(start, i + 1)}" at position ${i + 1}.`);
            }
            i++;
        }

        tokens.push({ kind: "number", value: Number(text.slice(start, i)) });
    }

    return tokens;
}