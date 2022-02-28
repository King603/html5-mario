import { Drawable } from "../Enjine/Drawable.js";

/**
 * 裁剪精灵图
 * @extends Drawable
 */
export class NotchSprite extends Drawable {
  /** @param {HTMLElement} img  */
  constructor(img) {
    super();
    this.YPicO = 0;
    this.XPicO = 0;
    this.YPic = 0;
    this.XPic = 0;
    this.Ya = 0;
    this.Xa = 0;
    this.Y = 0;
    this.X = 0;
    this.YOld = 0;
    this.XOld = 0;
    this.PicHeight = this.PicWidth = 32;
    this.YFlip = this.XFlip = !1;
    this.Visible = !0;
    this.Image = img;
    this.Delta = 0;
    this.SpriteTemplate = null;
    this.Layer = 1;
  }
  /**
   * 布局
   * @param {CanvasRenderingContext2D} ctx
   */
  Draw(ctx) {
    if (this.Visible) {
      let x = (this.XOld + (this.X - this.XOld) * this.Delta | 0) - this.XPicO;
      let y = (this.YOld + (this.Y - this.YOld) * this.Delta | 0) - this.YPicO;
      ctx.save();
      ctx.scale(
        this.XFlip ? -1 : 1,
        this.YFlip ? -1 : 1
      );
      ctx.translate(
        this.XFlip ? -320 : 0,
        this.YFlip ? -240 : 0
      );
      ctx.drawImage(
        this.Image,
        this.XPic * this.PicWidth,
        this.YPic * this.PicHeight,
        this.PicWidth,
        this.PicHeight,
        this.XFlip ? 320 - x - this.PicWidth : x,
        this.YFlip ? 240 - y - this.PicHeight : y,
        this.PicWidth,
        this.PicHeight
      );
      ctx.restore();
    }
  }
  /**
   * 更新
   * @param {Number} delta 差值
   */
  Update(delta) {
    this.XOld = this.X;
    this.YOld = this.Y;
    this.Move();
    this.Delta = delta;
  }
  /** 更新没有移动 */
  UpdateNoMove() {
    this.XOld = this.X;
    this.YOld = this.Y;
    this.Delta = 0;
  }
  /** 移动 */
  Move() {
    this.X += this.Xa;
    this.Y += this.Ya;
  }
  /**
   * 获取水平位置
   * @param {Number} size 单位尺寸
   * @returns {Number}
   */
  GetX(size) {
    return (this.XOld + (this.X - this.XOld) * size | 0) - this.XPicO;
  }
  /**
   * 获取垂直位置
   * @param {Number} size 单位尺寸
   * @returns {Number}
   */
  GetY(size) {
    return (this.YOld + (this.Y - this.YOld) * size | 0) - this.YPicO;
  }
  /** 碰撞检查 */
  CollideCheck() { }
  /** 碰撞检测 */
  BumpCheck() { }
  /** 释放 */
  Release() { }
  /**
   * 炮弹碰撞检验
   * @returns {Boolean}
   */
  ShellCollideCheck() {
    return !1;
  }
  /**
   * 火球碰撞检查
   * @returns {Boolean}
   */
  FireballCollideCheck() {
    return !1;
  }
}
