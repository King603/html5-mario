import * as Enjine from "../Enjine/index.js";
export declare class WinState extends Enjine.GameState {
    waitTime: number;
    wasKeyDown: boolean;
    drawManager?: Enjine.DrawableManager;
    camera?: Enjine.Camera;
    font?: Enjine.SpriteFont;
    kissing?: Enjine.AnimatedSprite;
    constructor();
    Enter(): void;
    Exit(): void;
    Update(a: number): void;
    Draw(ctx: CanvasRenderingContext2D): void;
    CheckForChange(ctx: Enjine.GameStateContext): void;
}
