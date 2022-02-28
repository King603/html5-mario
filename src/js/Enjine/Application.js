import { GameCanvas } from "./GameCanvas.js";
import { GameStateContext } from "./GameStateContext.js";
import { GameTimer } from "./GameTimer.js";
import { Enjine } from "./index.js";
import { GameState } from "./GameState.js";

export class Application {
  /**
   * 应用程序
   * @param {GameState} element
   */
  Update(element) {
    this.stateContext.Update(element);
    this.canvas.BeginDraw();
    this.stateContext.Draw(this.canvas.BackBufferContext2D);
    this.canvas.EndDraw();
  }
  /**
   * 初始化
   * @param {CanvasRenderingContext2D} ctx
   * @param {Number} width
   * @param {Number} height
   */
  Initialize(ctx, width, height) {
    this.canvas = new GameCanvas;
    this.timer = new GameTimer;
    Enjine.KeyboardInput.Initialize();
    this.canvas.Initialize("canvas", width, height);
    this.timer.UpdateObject = this;
    this.stateContext = new GameStateContext(ctx);
    this.timer.Start();
  }
}
