import { Drawable } from "./Drawable.js";
interface LETTERS {
    X: number;
    Y: number;
}
interface STRINGS extends LETTERS {
    String: string;
    length?: number;
}
export declare class SpriteFont extends Drawable {
    Strings: STRINGS[];
    Image: HTMLImageElement;
    LetterWidth: number;
    LetterHeight: number;
    Letters: LETTERS[];
    constructor(Strings: STRINGS[], Image: HTMLImageElement, LetterWidth: number, LetterHeight: number, Letters: LETTERS[]);
    Draw(ctx: CanvasRenderingContext2D): void;
}
export {};
