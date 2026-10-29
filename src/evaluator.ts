export type Tree = number | { op: string; left: Tree; right: Tree };

const mathOptions: Partial<Record<string, (x: number, y: number) => number>> = {
    'plus': (x, y) => x + y,
    'minus': (x, y) => x - y,
    'asterisk': (x, y) => x * y,
    'slash': (x, y) => x / y,
    'caret': (x, y) => Math.pow(x, y)
};

export function evaluate(tree: Tree): number {
    if (typeof tree === "number") {
        return tree;
    }
    const operator = tree.op;
    if (!mathOptions[operator]) throw new Error(`Unknown operator "${operator}".`);
    return mathOptions[operator](evaluate(tree.left), evaluate(tree.right));
}