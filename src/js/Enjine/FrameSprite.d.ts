import { Sprite } from "./Sprite.js";
export declare class FrameSprite extends Sprite {
    FrameHeight: number;
    FrameWidth: number;
    FrameY: number;
    FrameX: number;
    constructor();
    Draw(ctx: CanvasRenderingContext2D, str: {
        X: number;
        Y: number;
    }): void;
}
