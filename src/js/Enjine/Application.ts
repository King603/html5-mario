import { LoadingState } from "../Mario/LoadingState.js";
import { GameCanvas } from "./GameCanvas.js";
import { GameStateContext } from "./GameStateContext.js";
import { GameTimer } from "./GameTimer.js";
import { KeyboardInput } from "./KeyboardInput.js";

export class Application {
	stateContext!: GameStateContext;
	canvas!: GameCanvas;
	timer!: GameTimer;
	constructor(ctx: LoadingState, width: number, height: number) {
		this.canvas = new GameCanvas("canvas", width, height);
		this.timer = new GameTimer();
		KeyboardInput.Initialize();
		this.timer.UpdateObject = this;
		this.stateContext = new GameStateContext(ctx);
		this.timer.Start();
	}
	Update(element: number) {
		this.stateContext.Update(element);
		this.canvas.BeginDraw();
		this.stateContext.Draw(this.canvas.BackBufferContext2D as CanvasRenderingContext2D);
		this.canvas.EndDraw();
	}
}
