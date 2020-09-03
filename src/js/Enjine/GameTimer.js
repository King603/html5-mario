import { GameState } from "./GameState.js";

/** 游戏计时器 */
export class GameTimer {
  FramesPerSecond = 1E3 / 30;
  LastTime = 0;
  /** @type {GameState} */
  UpdateObject = null;
  /** 开始 */
  Start() {
    this.LastTime = new Date().getTime();
    this.IntervalFunc = setInterval(() => this.Tick(), this.FramesPerSecond);
  }
  /** 记号 */
  Tick() {
    if (this.UpdateObject != null) {
      let date = new Date().getTime();
      this.LastTime = date;
      this.UpdateObject.Update((date - this.LastTime) / 1E3);
    }
  }
  /** 停止 */
  Stop() {
    clearInterval(this.IntervalFunc);
  }
}
