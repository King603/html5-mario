import { Camera } from "./Camera.js";

/** 碰撞功能 */
export class Collideable {
  /**
   * @param {Camera} base
   * @param {Number} width
   * @param {Number} height
   * @param {() => {}} key
   */
  constructor(base, width, height, key) {
    this.Base = base;
    this.X = base.X;
    this.Y = base.Y;
    this.Width = width;
    this.Height = height;
    this.CollisionEvent = key != null ? key : function () { };
  }
  // 更新
  Update() {
    this.X = this.Base.X;
    this.Y = this.Base.Y;
  }
  /**
   * 检查碰撞
   * @param {Collideable} camera
   */
  CheckCollision(camera) {
    if (!(this.Y + this.Height < camera.Y) && !(this.Y > camera.Y + camera.Height) && !(this.X + this.Width < camera.X) && !(this.X > camera.X + camera.Width)) {
      this.CollisionEvent(camera);
      camera.CollisionEvent(this);
    }
  }
}
