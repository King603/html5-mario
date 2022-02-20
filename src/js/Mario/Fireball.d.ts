import { LevelState } from "./LevelState.js";
import { NotchSprite } from "./NotchSprite.js";
export declare class Fireball extends NotchSprite {
    World: LevelState;
    X: number;
    Y: number;
    Facing: number;
    AirInertia: number;
    GroundInertia: number;
    Height: number;
    Width: number;
    Dead: boolean;
    Anim: number;
    DeadTime: number;
    OnGround: boolean;
    FlipX?: boolean;
    constructor(World: LevelState, X: number, Y: number, Facing: number);
    Move(): void;
    SubMove(a: number, b: number): boolean;
    IsBlocking(a: number, b: number, c: number): number | false | undefined;
    Die(): void;
}
