import { SpriteTemplate } from "./SpriteTemplate.js";
export declare class Level {
    Width: number;
    Height: number;
    ExitY: number;
    ExitX: number;
    Map: number[][];
    Data: number[][];
    SpriteTemplates: (number | SpriteTemplate)[][];
    constructor(Width: number, Height: number);
    Update(): void;
    GetBlockCapped(x: number, y: number): number;
    GetBlock(x: number, y: number): number;
    SetBlock(x: number, y: number, ele: number): void;
    SetBlockData(x: number, y: number, ele: number): void;
    IsBlocking(x: number, y: number, ele: number): number;
    GetSpriteTemplate(x: number, y: number): number | SpriteTemplate | null;
    SetSpriteTemplate(x: number, y: number, ele: SpriteTemplate): void;
}
