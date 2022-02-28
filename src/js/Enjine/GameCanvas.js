/** 游戏画布 */

export class GameCanvas {
  /**
   * 初始化
   * @param {String} elementId 画布ID
   * @param {Number} width 画布宽度
   * @param {Number} height 画布高度
   */
  Initialize(elementId, width, height) {
    this.Context2D = (this.Canvas = document.getElementById(elementId)).getContext("2d");
    this.BackBuffer = document.createElement("canvas");
    this.BackBuffer.width = width;
    this.BackBuffer.height = height;
    this.BackBufferContext2D = this.BackBuffer.getContext("2d");
  }
  /** 布局界面 */
  BeginDraw() {
    this.BackBufferContext2D.clearRect(0, 0, this.BackBuffer.width, this.BackBuffer.height);
    this.Context2D.clearRect(0, 0, this.Canvas.width, this.Canvas.height);
  }
  /** 结束布局 */
  EndDraw() {
    this.Context2D.drawImage(this.BackBuffer, 0, 0, this.BackBuffer.width, this.BackBuffer.height, 0, 0, this.Canvas.width, this.Canvas.height);
  }
}
