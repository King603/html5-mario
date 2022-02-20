import { LevelState } from "./LevelState.js";
import { NotchSprite } from "./NotchSprite.js";
export declare class Particle extends NotchSprite {
    World: LevelState;
    X: number;
    Y: number;
    Xa: number;
    Ya: number;
    XPic: number;
    YPic: number;
    YPicO: number;
    XPicO: number;
    PicHeight: number;
    PicWidth: number;
    Life: number;
    constructor(World: LevelState, X: number, Y: number, Xa: number, Ya: number);
    Move(): void;
}
