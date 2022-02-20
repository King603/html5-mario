import { NotchSprite } from "./NotchSprite";
import { LevelState } from "./LevelState.js";
export declare class Mushroom extends NotchSprite {
    World: LevelState;
    X: number;
    Y: number;
    RunTime: number;
    AirInertia: number;
    GroundInertia: number;
    OnGround: boolean;
    Width: number;
    Height: number;
    Facing: number;
    Life: number;
    JumpTime: number;
    constructor(World: LevelState, X: number, Y: number);
    CollideCheck(): void;
    Move(): void;
    SubMove(a: number, b: number): boolean;
    IsBlocking(a: number, b: number, c: any, e: number): number | false | undefined;
    BumpCheck(a: number, b: number): void;
}
