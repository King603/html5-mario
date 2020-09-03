import { GameState } from "./GameState.js";

/** 游戏状态结构 */
export class GameStateContext {
  /**
   * @param {GameState} state 状态
   */
  constructor(state) {
    if (state != null) {
      this.State = state;
      this.State.Enter();
    }
  }
  /**
   * 改变状态
   * @param {GameState} state 状态
   */
  ChangeState(state) {
    this.State != null && this.State.Exit();
    this.State = state;
    this.State.Enter();
  }
  /**
   * 更新
   * @param {GameState} state 状态
   */
  Update(state) {
    this.State.CheckForChange(this);
    this.State.Update(state);
  }
  /**
   * 画图
   * @param {CanvasRenderingContext2D} state 状态
   */
  Draw(state) {
    this.State.Draw(state);
  }
}
