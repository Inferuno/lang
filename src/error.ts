export class LangError extends Error {
    position: number;
    line?: number;

    constructor(message: string, position: number) {
        super(message);
        this.position = position;
    }
}