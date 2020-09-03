import { Enjine } from "../Enjine/index.js";
import { NotchSprite } from "./NotchSprite.js";
import { Mario } from "./index.js";

/**
 * 火球类
 * @extends NotchSprite
 */
export class Fireball extends NotchSprite {
  /**
   * @param {LevelState} world
   * @param {Number} x
   * @param {Number} y
   * @param {Number} facing
   */
  constructor(world, x, y, facing) {
    super();
    this.AirInertia = this.GroundInertia = .89;
    this.Image = Enjine.Resources.Images.particles;
    this.World = world;
    this.X = x;
    this.Y = y;
    this.Facing = facing;
    this.YPicO = this.XPicO = 4;
    this.YPic = 3;
    this.XPic = 4;
    this.Height = 8;
    this.Width = 4;
    this.PicWidth = this.PicHeight = 8;
    this.Ya = 4;
    this.Dead = !1;
    this.Anim = this.DeadTime = 0;
    this.OnGround = !1;
  }
  Move() {
    if (this.DeadTime > 0) {
      for (let i = 0; i < 8; i++)
        this.World.AddSprite(new Mario.Sparkle(this.World, (
          this.X + Math.random() * 8 - 4 | 0) + 4,
          (this.Y + Math.random() * 8 - 4 | 0) + 2,
          Math.random() * 2 - 1 * this.Facing,
          Math.random() * 2 - 1, 0, 1, 5
        ));
      this.World.RemoveSprite(this);
    }
    else {
      if (this.Facing != 0)
        this.Anim++;
      if (this.Xa > 2)
        this.Facing = 1;
      if (this.Xa < -2)
        this.Facing = -1;
      this.Xa = this.Facing * 8;
      this.World.CheckFireballCollide(this);
      this.FlipX = this.Facing === -1;
      this.XPic = this.Anim % 4;
      this.SubMove(this.Xa, 0) || this.Die();
      this.OnGround = !1;
      this.SubMove(0, this.Ya);
      if (this.OnGround)
        this.Ya = -10;
      this.Ya *= .95;
      this.Xa *= this.OnGround ? this.GroundInertia : this.AirInertia;
      if (!this.OnGround)
        this.Ya += 1.5;
    }
  }
  /**
   *
   * @param {Number} x
   * @param {Number} y
   * @returns {Boolean}
   */
  SubMove(x, y) {
    let bool = !1;
    while (x > 8) {
      if (!this.SubMove(8, 0))
        return !1;
      x -= 8;
    }
    while (x < -8) {
      if (!this.SubMove(-8, 0))
        return !1;
      x += 8;
    }
    while (y > 8) {
      if (!this.SubMove(0, 8))
        return !1;
      y -= 8;
    }
    while (y < -8) {
      if (!this.SubMove(0, -8))
        return !1;
      y += 8;
    }
    let X = this.X + x;
    let Y = this.Y + y;
    let { Width: w, Height: h } = this;
    if (y > 0 && (
      this.IsBlocking(X - w, Y + 0, x, 0) ||
      this.IsBlocking(X + w, Y + 0, x, 0) ||
      this.IsBlocking(X - w, Y + 1, x, y) ||
      this.IsBlocking(X + w, Y + 1, x, y)
    ))
      bool = !0;
    if (y < 0 && (
      this.IsBlocking(X + 0, Y - h, x, y) || bool ||
      this.IsBlocking(X - w, Y - h, x, y) || bool ||
      this.IsBlocking(X + w, Y - h, x, y)
    ))
      bool = !0;
    if (x > 0 && (
      this.IsBlocking(X + w, Y - h, x, y) ||
      this.IsBlocking(X + w, Y - (h / 2 | 0), x, y) ||
      this.IsBlocking(X + w, Y + 0, x, y)
    ))
      bool = !0;
    if (x < 0 && (
      this.IsBlocking(X - w, Y - h, x, y) ||
      this.IsBlocking(X - w, Y - (h / 2 | 0), x, y) ||
      this.IsBlocking(X - w, Y + 0, x, y)
    ))
      bool = !0;
    if (bool) {
      if (x < 0) {
        this.X = ((this.X - w) / 16 + 0 | 0) * 16 + w + 0;
        this.Xa = 0;
      }
      else if (x > 0) {
        this.X = ((this.X + w) / 16 + 1 | 0) * 16 - w - 1;
        this.Xa = 0;
      }
      if (y < 0) {
        this.Y = ((this.Y - h) / 16 + 0 | 0) * 16 + h + 0;
        this.Ya = 0;
      }
      else if (y > 0) {
        this.Y = ((this.Y - 1) / 16 + 1 | 0) * 16 + 0 - 1;
        this.OnGround = !0;
      }
      return !1;
    }
    else {
      this.X += x;
      this.Y += y;
      return !0;
    }
  }
  /**
   *
   * @param {Number} X
   * @param {Number} Y
   * @param {Number} x
   * @param {Number} y
   * @returns {number | boolean}
   */
  IsBlocking(X, Y, x, y) {
    X = X / 16 | 0;
    Y = Y / 16 | 0;
    if (X === this.X / 16 | 0 && Y === this.Y / 16 | 0)
      return !1;
    return this.World.Level.IsBlocking(X, Y, x, y);
  }
  Die() {
    this.Dead = !0;
    this.Xa = -this.Facing * 2;
    this.Ya = -5;
    this.DeadTime = 100;
  }
}
