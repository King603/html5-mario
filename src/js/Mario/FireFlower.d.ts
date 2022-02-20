import { NotchSprite } from "./NotchSprite.js";
import { LevelState } from "./LevelState.js";
export declare class FireFlower extends NotchSprite {
    World: LevelState;
    X: number;
    Y: number;
    Width: number;
    Height: number;
    Facing: number;
    Life: number;
    constructor(World: LevelState, X: number, Y: number);
    CollideCheck(): void;
    Move(): void;
}
