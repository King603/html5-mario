import * as Enjine from "../Enjine/index.js";
declare type Name = "background" | "endScene" | "enemies" | "fireMario" | "font" | "gameOverGhost" | "items" | "logo" | "map" | "mario" | "particles" | "racoonMario" | "smallMario" | "title" | "worldMap";
export declare class LoadingState extends Enjine.GameState {
    Images?: {
        name: Name;
        src: string;
    }[];
    ImagesLoaded: boolean;
    ScreenColor: number;
    ColorDirection: number;
    SoundIndex: number;
    ImageIndex: number;
    constructor();
    Enter(): void;
    Exit(): void;
    Update(a: number): void;
    Draw(ctx: CanvasRenderingContext2D): void;
    CheckForChange(title: Enjine.GameStateContext): void;
}
export {};
