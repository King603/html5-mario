export default class {
	constructor() {
		this.FramesPerSecond = 1e3 / 30;
		this.LastTime = 0;
		this.UpdateObject = this.IntervalFunc = undefined;
	}
	Start() {
		this.LastTime = new Date().getTime();
		this.IntervalFunc = setInterval(() => this.Tick(), this.FramesPerSecond);
	}
	Tick() {
		if (this.UpdateObject != undefined) {
			let now = new Date().getTime(), time = (now - this.LastTime) / 1e3;
			this.LastTime = now;
			this.UpdateObject.Update(time);
		}
	}
	Stop() {
		clearInterval(this.IntervalFunc);
	}
}
