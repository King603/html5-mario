import { Application } from "./Application.js";

export class GameTimer {
	FramesPerSecond: number = 1E3 / 30;
	LastTime: number = 0;
	UpdateObject: Application;
	IntervalFunc?: number;
	constructor() {
		this.UpdateObject = null as unknown as Application;
	}
	Start() {
		this.LastTime = new Date().getTime();
		this.IntervalFunc = setInterval(() => this.Tick(), this.FramesPerSecond);
	}
	Tick() {
		if (this.UpdateObject != null) {
			let date = new Date().getTime();
			this.LastTime = date;
			this.UpdateObject.Update((date - this.LastTime) / 1E3);
		}
	}
	Stop() {
		clearInterval(this.IntervalFunc);
	}
}
