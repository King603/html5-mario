import * as Enjine from "../Enjine/index.js";
import { Level } from "./Level.js";
interface SIZE {
    X: number;
    Y: number;
}
export declare class LevelRenderer extends Enjine.Drawable {
    Level: Level;
    Width: number;
    Height: number;
    AnimTime: number;
    Bounce: number;
    Tick: number;
    Delta: number;
    Background: import("./SpriteCuts.js").Sheet[][];
    TilesY: number;
    constructor(Level: Level, Width: number, Height: number);
    Update(time: number): void;
    Draw(a: any, b: any): void;
    DrawStatic(ctx: CanvasRenderingContext2D, size: SIZE): void;
    DrawDynamic(ctx: CanvasRenderingContext2D, size: SIZE): void;
    DrawExit0(ctx: CanvasRenderingContext2D, size: SIZE, bool: boolean): void;
    DrawExit1(ctx: CanvasRenderingContext2D, size: SIZE): void;
}
export {};
