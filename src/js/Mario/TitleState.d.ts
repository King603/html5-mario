import * as Enjine from "../Enjine/index.js";
export declare class TitleState extends Enjine.GameState {
    drawManager?: Enjine.DrawableManager;
    camera?: Enjine.Camera;
    title?: Enjine.Sprite;
    logo?: Enjine.Sprite;
    font?: Enjine.SpriteFont;
    logoY: number;
    bounce: number;
    constructor();
    Enter(): void;
    Exit(): void;
    Update(a: number): void;
    Draw(ctx: CanvasRenderingContext2D): void;
    CheckForChange(a: Enjine.GameStateContext): void;
}
