import { NotchSprite } from "./NotchSprite.js";
import { LevelState } from "./LevelState.js";
export declare class Enemy extends NotchSprite {
    World: LevelState;
    X: number;
    Y: number;
    Facing: number;
    Type: number;
    Winged: boolean;
    AirInertia: number;
    GroundInertia: number;
    RunTime: number;
    MayJump: boolean;
    OnGround: boolean;
    YJumpSpeed: number;
    XJumpSpeed: number;
    JumpTime: number;
    Width: number;
    Height: number;
    DeadTime: number;
    FlyDeath: boolean;
    WingTime: number;
    NoFireballDeath: boolean;
    AvoidCliffs: boolean;
    constructor(World: LevelState, X: number, Y: number, Facing: number, Type: number, Winged: boolean);
    CollideCheck(): void;
    Move(): void;
    SubMove(a: number, b: number): boolean;
    IsBlocking(a: number, b: number, c: number): number | false | undefined;
    ShellCollideCheck(a: {
        X: number;
        Y: number;
        Height: number;
        Facing: number;
    }): boolean;
    FireballCollideCheck(a: {
        X: number;
        Y: number;
        Height: number;
        Facing: number;
    }): boolean | undefined;
    BumpCheck(x: number, y: number): void;
    SubDraw: (ctx: CanvasRenderingContext2D) => void;
    Draw(ctx: CanvasRenderingContext2D): void;
    static RedKoopa: number;
    static GreenKoopa: number;
    static Goomba: number;
    static Spiky: number;
    static Flower: number;
}