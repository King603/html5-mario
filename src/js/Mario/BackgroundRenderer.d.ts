import * as Enjine from "../Enjine/index.js";
import { Level } from "./Level.js";
import { Sheet } from "./SpriteCuts.js";
export declare class BackgroundRenderer extends Enjine.Drawable {
    Level: Level;
    Width: number;
    Distance: number;
    TilesY: number;
    Background: Sheet[][];
    constructor(Level: Level, Width: number, y: number, Distance: number);
    Draw(ctx: CanvasRenderingContext2D, block: {
        X: number;
    }): void;
}
