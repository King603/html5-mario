import { GameCanvas } from "./GameCanvas.js";
import { GameStateContext } from "./GameStateContext.js";
import { GameTimer } from "./GameTimer.js";
import { KeyboardInput } from "./KeyboardInput.js";

export class Application {
	Update(element) {
		this.stateContext.Update(element);
		this.canvas.BeginDraw();
		this.stateContext.Draw(this.canvas.BackBufferContext2D);
		this.canvas.EndDraw();
	}
	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {number} width
	 * @param {number} height
	 */
	Initialize(ctx, width, height) {
		this.canvas = new GameCanvas();
		this.timer = new GameTimer();
		KeyboardInput.Initialize();
		this.canvas.Initialize("canvas", width, height);
		this.timer.UpdateObject = this;
		this.stateContext = new GameStateContext(ctx);
		this.timer.Start();
	}
}
