export class GameTimer {
    FramesPerSecond = 1E3 / 30;
    LastTime = 0;
    UpdateObject;
    IntervalFunc;
    constructor() {
        this.UpdateObject = null;
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
//# sourceMappingURL=GameTimer.js.map