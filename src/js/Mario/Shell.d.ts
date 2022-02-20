import { NotchSprite } from "./NotchSprite.js";
import { LevelState } from "./LevelState.js";
export declare class Shell extends NotchSprite {
    World: LevelState;
    X: number;
    Y: number;
    Ypic: number;
    Xpic: number;
    XPicO: number;
    YPicO: number;
    Width: number;
    Height: number;
    Facing: number;
    PicWidth: number;
    Ya: number;
    Dead: boolean;
    DeadTime: number;
    Carried: boolean;
    AirInertia: number;
    GroundInertia: number;
    OnGround: boolean;
    Anim: number;
    constructor(World: LevelState, X: number, Y: number, Ypic: number, Xpic?: number);
    FireballCollideCheck(a: {
        X: number;
        Y: number;
        Height: number;
        Facing: number;
    }): boolean;
    CollideCheck(): void;
    Move(): void;
    SubMove(a: number, b: number): boolean;
    IsBlocking(a: number, b: number, c: number, e: number): number | false | undefined;
    BumpCheck(a: number, b: number): void;
    Die(): void;
    ShellCollideCheck(a: Shell): boolean;
    Release(): void;
}
