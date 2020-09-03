import { Sprite } from "./Sprite.js";
import { Camera } from "./Camera.js";
/**
 * 精灵图帧数设置
 * @extends Sprite
 */

export class FrameSprite extends Sprite {
  constructor() {
    super();
    this.FrameHeight = this.FrameWidth = this.FrameY = this.FrameX = 0;
  }
  /**
   * 布局
   * @param {CanvasRenderingContext2D} ctx
   * @param {Camera} camera
   */
  Draw(ctx, camera) {
    ctx.drawImage(
      this.Image,
      this.FrameX,
      this.FrameY,
      this.FrameWidth,
      this.FrameHeight,
      this.X - camera.X,
      this.Y - camera.Y,
      this.FrameWidth,
      this.FrameHeight
    );
  }
}
