import * as Enjine from "../Enjine/index.js";
export declare class LoseState extends Enjine.GameState {
    wasKeyDown: boolean;
    drawManager?: Enjine.DrawableManager;
    camera?: Enjine.Camera;
    gameOver?: Enjine.AnimatedSprite;
    font?: Enjine.SpriteFont;
    constructor();
    Enter(): void;
    Exit(): void;
    Update(a: number): void;
    Draw(a: CanvasRenderingContext2D): void;
    CheckForChange(ctx: Enjine.GameStateContext): void;
}
