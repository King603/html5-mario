import { GameCanvas } from "./GameCanvas.js";
import { GameStateContext } from "./GameStateContext.js";
import { GameTimer } from "./GameTimer.js";
import { KeyboardInput } from "./KeyboardInput.js";
export class Application {
    stateContext;
    canvas;
    timer;
    constructor(ctx, width, height) {
        this.canvas = new GameCanvas("canvas", width, height);
        this.timer = new GameTimer();
        KeyboardInput.Initialize();
        this.timer.UpdateObject = this;
        this.stateContext = new GameStateContext(ctx);
        this.timer.Start();
    }
    Update(element) {
        this.stateContext.Update(element);
        this.canvas.BeginDraw();
        this.stateContext.Draw(this.canvas.BackBufferContext2D);
        this.canvas.EndDraw();
    }
}
//# sourceMappingURL=Application.js.map