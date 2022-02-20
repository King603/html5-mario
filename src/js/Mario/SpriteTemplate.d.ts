import { Enemy } from "./Enemy.js";
import { FlowerEnemy } from "./FlowerEnemy.js";
import { LevelState } from "./LevelState.js";
export declare class SpriteTemplate {
    Type: number;
    Winged: boolean;
    LastVisibleTick: number;
    IsDead: boolean;
    Sprite: FlowerEnemy | Enemy;
    constructor(Type: number, Winged: boolean);
    Spawn(state: LevelState, x: number, y: number, e: number): void;
}
