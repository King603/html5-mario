import { Drawable } from "./Drawable.js";
export declare class Sprite extends Drawable {
    Y: number;
    X: number;
    Image?: HTMLImageElement;
    constructor();
    Draw(ctx: CanvasRenderingContext2D, block: {
        X: number;
        Y: number;
    }): void;
}
