import { ELE } from "../Enjine/DrawableManager.js";
import * as Enjine from "../Enjine/index.js";
import { BackgroundRenderer } from "./BackgroundRenderer.js";
import { Fireball } from "./Fireball.js";
import { Level } from "./Level.js";
import { LevelRenderer } from "./LevelRenderer.js";
import { Shell } from "./Shell.js";
export declare class LevelState extends Enjine.GameState {
    LevelDifficulty: number;
    LevelType: number;
    Layer?: LevelRenderer;
    Level?: Level;
    BgLayer?: BackgroundRenderer[];
    Paused: boolean;
    Font?: Enjine.SpriteFont;
    FontShadow?: Enjine.SpriteFont;
    FireballsToCheck?: Fireball[];
    ShellsToCheck?: Shell[];
    Camera?: Enjine.Camera;
    SpritesToRemove: any[];
    SpritesToAdd: any[];
    Sprites?: Enjine.DrawableManager;
    Delta: number;
    Tick: number;
    FireballsOnScreen: number;
    StartTime: number;
    TimeLeft: number;
    GotoLoseState: boolean;
    GotoMapState: boolean;
    Mario: any;
    constructor(LevelDifficulty: number, LevelType: number);
    Enter(): void;
    Exit(): void;
    CheckShellCollide(a: Shell): void;
    CheckFireballCollide(a: Fireball): void;
    Update(Delta: number): void;
    Draw(a: CanvasRenderingContext2D): void;
    DrawStringShadow(a: CanvasRenderingContext2D, b: string, c: number, e: number): void;
    RenderBlackout(a: CanvasRenderingContext2D, b: number, c: number, e: number): void;
    AddSprite(a: ELE): void;
    RemoveSprite(a: ELE): void;
    Bump(a: number, b: number, c: boolean): void;
    BumpInto(a: number, b: number): void;
    CheckForChange(a: Enjine.GameStateContext): void;
}