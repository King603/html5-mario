import { LevelState } from "./LevelState.js";
import { NotchSprite } from "./NotchSprite.js";
export declare class Sparkle extends NotchSprite {
    World: LevelState;
    X: number;
    Y: number;
    Xa: number;
    Ya: number;
    XPic: number;
    YPic: number;
    Life: number;
    YPicO: number;
    XPicO: number;
    PicHeight: number;
    PicWidth: number;
    XPicStart: number;
    constructor(World: LevelState, X: number, Y: number, Xa: number, Ya: number);
    Move(): void;
}
