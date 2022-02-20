import { Level } from "./Level.js";
export declare class LevelGenerator {
    Width: number;
    Height: number;
    Odds: number[];
    Type: number;
    Difficulty: number;
    TotalOdds: number;
    constructor(Width: number, Height: number);
    CreateLevel(Type: number, Difficulty: number): Level;
    BuildZone(level: Level, b: number, c: number): number;
    BuildJump(a: Level, b: number): number;
    BuildCannons(a: {
        SetBlock: (arg0: any, arg1: number, arg2: number) => void;
    }, b: number, c: number): number;
    BuildHillStraight(a: Level, b: number, c: number): number;
    AddEnemyLine(a: Level, b: number, c: number, e: number): void;
    BuildTubes(a: Level, b: number, c: number): number;
    BuildStraight(a: Level, b: number, c: number, e: boolean): number;
    Decorate(level: Level, b: number, c: number, e: number): void;
    FixWalls(level: Level): void;
    Blockify(level: Level, b: boolean[][], c: number, e: number): void;
}
