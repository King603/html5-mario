import * as Enjine from "../Enjine/index.js";
import { SpriteCuts } from "./SpriteCuts.js";
import { TitleState } from "./TitleState.js";
export class LoseState extends Enjine.GameState {
    wasKeyDown;
    drawManager;
    camera;
    gameOver;
    font;
    constructor() {
        super();
        this.wasKeyDown = !1;
    }
    Enter() {
        this.drawManager = new Enjine.DrawableManager();
        this.camera = new Enjine.Camera();
        this.gameOver = new Enjine.AnimatedSprite();
        this.gameOver.Image = Enjine.Resources.Images?.gameOverGhost;
        this.gameOver.SetColumnCount(9);
        this.gameOver.SetRowCount(1);
        this.gameOver.AddNewSequence("turnLoop", 0, 0, 0, 8);
        this.gameOver.PlaySequence("turnLoop", !0);
        this.gameOver.FramesPerSecond = 1 / 15;
        this.gameOver.X = 112;
        this.gameOver.Y = 68;
        this.font = SpriteCuts.CreateBlackFont();
        this.font.Strings[0] = { String: "Game over!", X: 116, Y: 160 };
        this.drawManager.Add(this.font);
        this.drawManager.Add(this.gameOver);
    }
    Exit() {
        this.drawManager?.Clear();
        delete this.drawManager;
        delete this.camera;
        delete this.gameOver;
        delete this.font;
    }
    Update(a) {
        this.drawManager?.Update(a);
        if (Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.S))
            this.wasKeyDown = !0;
    }
    Draw(a) {
        this.drawManager?.Draw(a, this.camera);
    }
    CheckForChange(ctx) {
        if (this.wasKeyDown && !Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.S))
            ctx.ChangeState(new TitleState());
    }
}
//# sourceMappingURL=LoseState.js.map