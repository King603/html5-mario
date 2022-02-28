import { Drawable } from "./Drawable.js";
import { Camera } from "./Camera.js";

/**
 * 利用精灵图设计各个部件元素
 * @extends Drawable
 */
export class Sprite extends Drawable {
  constructor() {
    super();
    this.Y = this.X = 0;
    this.Image = null;
  }
  /**
   * 布局
   * @param {CanvasRenderingContext2D} ctx
   * @param {Camera} camera
   */
  Draw(ctx, camera) {
    ctx.drawImage(this.Image, this.X - camera.X, this.Y - camera.Y);
  }
}
