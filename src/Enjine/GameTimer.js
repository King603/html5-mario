export function GameTimer() {
	this.FramesPerSecond = 1e3 / 30;
	this.LastTime = 0;
	this.UpdateObject = this.IntervalFunc = undefined;
}
GameTimer.prototype = {
	Start: function () {
		this.LastTime = new Date().getTime();
		this.IntervalFunc = setInterval(() => this.Tick(), this.FramesPerSecond);
	},
	Tick: function () {
		if (this.UpdateObject != undefined) {
			let now = new Date().getTime(), time = (now - this.LastTime) / 1e3;
			this.LastTime = now;
			this.UpdateObject.Update(time);
		}
	},
	Stop: function () {
		clearInterval(this.IntervalFunc);
	},
};
