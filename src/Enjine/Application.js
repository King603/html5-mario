import GameCanvas from "./GameCanvas.js";
import GameStateContext from "./GameStateContext.js";
import GameTimer from "./GameTimer.js";
import KeyboardInput from "./KeyboardInput.js";

export default class {
	constructor() {
		this.stateContext = this.timer = this.canvas = undefined;
	}
	Update(a) {
		this.stateContext.Update(a);
		this.canvas.BeginDraw();
		this.stateContext.Draw(this.canvas.BackBufferContext2D);
		this.canvas.EndDraw();
	}
	Initialize(a, b, c) {
		this.canvas = new GameCanvas();
		this.timer = new GameTimer();
		KeyboardInput.Initialize();
		this.canvas.Initialize("canvas", b, c);
		this.timer.UpdateObject = this;
		this.stateContext = new GameStateContext(a);
		this.timer.Start();
	}
}
