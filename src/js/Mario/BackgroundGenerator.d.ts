import { Level } from "./Level.js";
export declare class BackgroundGenerator {
    Width: number;
    Height: number;
    Distant: boolean;
    Type: number;
    constructor(Width: number, Height: number, Distant: boolean, Type: number);
    SetValues(Width: number, Height: number, Distant: boolean, Type: number): void;
    CreateLevel(): Level;
    GenerateOverground(level: Level): void;
    GenerateUnderground(level: Level): void;
    GenerateCastle(level: Level): void;
}
