import { Enemy } from "./Enemy.js";
import { LevelState } from "./LevelState.js";
export declare class FlowerEnemy extends Enemy {
    YStart: number;
    Tick: number;
    constructor(world: LevelState, x: number, YStart: number);
    Move(): void;
}
