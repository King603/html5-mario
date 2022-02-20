import { NotchSprite } from "./NotchSprite";
import { LevelState } from "./LevelState.js";
export declare class BulletBill extends NotchSprite {
    World: LevelState;
    X: number;
    Y: number;
    Facing: number;
    XPicO: number;
    YPicO: number;
    Height: number;
    Width: number;
    PicWidth: number;
    YPic: number;
    XPic: number;
    Xa: number;
    Ya: number;
    DeadTime: number;
    Dead: boolean;
    Anim: number;
    XFlip: boolean;
    constructor(World: LevelState, X: number, Y: number, Facing: number);
    CollideCheck(): void;
    Move(): void;
    SubMove(a: any): boolean;
    FireballCollideCheck(a: {
        X: number;
        Y: number;
        Height: number;
    }): boolean;
    ShellCollideCheck(a: {
        X: number;
        Y: number;
        Height: number;
    }): boolean;
}
