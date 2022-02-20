import { LevelState } from "./LevelState.js";
import { NotchSprite } from "./NotchSprite.js";
export declare class CoinAnim extends NotchSprite {
    World: LevelState;
    Life: number;
    constructor(World: LevelState, x: number, y: number);
    Move(): void;
}
