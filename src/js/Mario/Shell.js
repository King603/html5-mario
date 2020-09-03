import { Enjine } from "../Enjine/index.js";
import { NotchSprite } from "./NotchSprite.js";
import { Mario } from "./index.js";

/**
 * 炮弹
 * @extends NotchSprite
 */
export class Shell extends NotchSprite {
  /**
   * @param {LevelState} world
   * @param {Number} x
   * @param {Number} y
   * @param {Number} Ypic
   * @param {Number} [Xpic = 4]
   */
  constructor(world, x, y, Ypic, Xpic = 4) {
    super();
    this.World = world;
    this.X = x;
    this.Y = y;
    this.YPic = Ypic;
    this.Image = Enjine.Resources.Images.enemies;
    this.XPicO = 8;
    this.YPicO = 31;
    this.Width = 4;
    this.Height = 12;
    this.Facing = 0;
    this.PicWidth = 16;
    this.XPic = Xpic;
    this.Ya = -5;
    this.Dead = !1;
    this.DeadTime = 0;
    this.Carried = !1;
    this.AirInertia = this.GroundInertia = .89;
    this.OnGround = !1;
    this.Anim = 0;
  }
  /**
   * 火球碰撞检查
   * @param {Fireball} fireball
   */
  FireballCollideCheck(fireball) {
    if (this.DeadTime !== 0)
      return !1;
    let x = fireball.X - this.X, y = fireball.Y - this.Y;
    if (x > -16 && x < 16 && y > -this.Height && y < fireball.Height) {
      if (this.Facing !== 0)
        return !0;
      Enjine.Resources.PlaySound("kick");
      this.Xa = fireball.Facing * 2;
      this.Ya = -5;
      if (this.SpriteTemplate !== null)
        this.SpriteTemplate.IsDead = !0;
      this.DeadTime = 100;
      return this.YFlip = !0;
    } return !1;
  }
  /** 碰撞检查 */
  CollideCheck() {
    if (!this.Carried && !(this.Dead || this.DeadTime > 0)) {
      let a = Mario.Character.X - this.X, b = Mario.Character.Y - this.Y;
      if (a > -16 && a < 16 && b > -this.Height && b < Mario.Character.Height) {
        if (Mario.Character.Ya > 0 && b <= 0 && (!Mario.Character.OnGround || !Mario.Character.WasOnGround)) {
          Mario.Character.Stomp(this);
          if (this.Facing = this.Facing !== 0)
            this.Xa = 0;
          else
            Mario.Character.Facing;
        }
        else if (this.Facing !== 0) {
          Mario.Character.GetHurt();
        }
        else {
          Mario.Character.Kick(this);
          this.Facing = Mario.Character.Facing;
        }
      }
    }
  }
  Move() {
    if (this.Carried)
      this.World.CheckShellCollide(this);
    else if (this.DeadTime > 0) {
      if (--this.DeadTime === 0) {
        this.DeadTime = 1;
        for (let n = 0; n < 8; n++)
          this.World.AddSprite(new Mario.Sparkle((this.X + Math.random() * 16 - 8 | 0) + 4, (this.Y + Math.random() * 8 | 0) + 4, Math.random() * 2 - 1, Math.random() * -1, 0, 1, 5));
        this.World.RemoveSprite(this);
      }
      this.X += this.Xa;
      this.Y += this.Ya;
      this.Ya *= .95;
      this.Ya += 1;
    }
    else {
      this.Facing !== 0 && this.Anim++;
      if (this.Xa > 2)
        this.Facing = 1;
      if (this.Xa < -2)
        this.Facing = -1;
      this.Xa = this.Facing * 11;
      this.Facing !== 0 && this.World.CheckShellCollide(this);
      this.XFlip = this.Facing === -1;
      this.XPic = (this.Anim / 2 | 0) % 4 + 3;
      if (!this.SubMove(this.Xa, 0)) {
        Enjine.Resources.PlaySound("bump");
        this.Facing = -this.Facing;
      }
      this.OnGround = !1;
      this.SubMove(0, this.Ya);
      this.Ya *= .85;
      this.Xa *= this.OnGround ? this.GroundInertia : this.AirInertia;
      this.OnGround || (this.Ya += 2);
    }
  }
  /**
   * 部件移动
   * @param {Number} X
   * @param {Number} Y
   * @returns {Boolean}
   */
  SubMove(X, Y) {
    let IsBlocking = !1;
    while (X > 8) {
      if (!this.SubMove(8, 0))
        return !1;
      X -= 8;
    }
    while (X < -8) {
      if (!this.SubMove(-8, 0))
        return !1;
      X += 8;
    }
    while (Y > 8) {
      if (!this.SubMove(0, 8))
        return !1;
      Y -= 8;
    }
    while (Y < -8) {
      if (!this.SubMove(0, -8))
        return !1;
      Y += 8;
    }
    let x = this.X + X;
    let y = this.Y + Y;
    let { Width: w, Height: h } = this;
    if (Y > 0 && (
      this.IsBlocking(x - w, y + Y + 0, X, 0) ||
      this.IsBlocking(x + w, y + Y + 0, X, 0) ||
      this.IsBlocking(x - w, y + Y + 1, X, Y) ||
      this.IsBlocking(x + w, y + Y + 1, X, Y)
    ))
      IsBlocking = !0;
    if (Y < 0 && (
      this.IsBlocking(x + 0, y + Y - h, X, Y) || IsBlocking ||
      this.IsBlocking(x - w, y + Y - h, X, Y) || IsBlocking ||
      this.IsBlocking(x + w, y + Y - h, X, Y)
    ))
      IsBlocking = !0;
    if (X > 0 && (
      this.IsBlocking(x + w, y + Y - h, X, Y) ||
      this.IsBlocking(x + w, y + Y - (h / 2 | 0), X, Y) ||
      this.IsBlocking(x + w, y + Y + 0, X, Y)
    ))
      IsBlocking = !0;
    if (X < 0 && (
      this.IsBlocking(x - w, y + Y - h, X, Y) ||
      this.IsBlocking(x - w, y + Y - (h / 2 | 0), X, Y) ||
      this.IsBlocking(x - w, y + Y + 0, X, Y)
    ))
      IsBlocking = !0;
    if (IsBlocking) {
      if (X < 0) {
        this.X = ((this.X - w) / 16 + 0 | 0) * 16 + w + 0;
        this.Xa = 0;
      }
      else if (X > 0) {
        this.X = ((this.X + w) / 16 + 1 | 0) * 16 - w - 1;
        this.Xa = 0;
      }
      if (Y < 0) {
        this.Y = ((this.Y - h) / 16 + 0 | 0) * 16 + h + 0;
        this.Ya = 0;
      }
      else if (Y > 0) {
        this.Y = ((this.Y - 1) / 16 + 1 | 0) * 16 - 1 + 0;
        this.OnGround = !0;
      }
      return !1;
    }
    else {
      this.X += X;
      this.Y += Y;
      return !0;
    }
  }
  /**
   * 阻塞
   * @param {Number} w
   * @param {Number} h
   * @param {Number} x
   * @param {Number} y
   */
  IsBlocking(w, h, x, y) {
    w = w / 16 | 0;
    h = h / 16 | 0;
    if (w === (this.X / 16 | 0) && h === (this.Y / 16 | 0))
      return !1;
    let d = this.World.Level.IsBlocking(w, h, x, y);
    if (d && y === 0 && x !== 0)
      this.World.Bump(w, h, !0);
    return d;
  }
  /**
   *
   * @param {Number} w
   * @param {Number} h
   */
  BumpCheck(w, h) {
    if (this.X + this.Width > w * 16 && this.X - this.Width < w * 16 + 16 && h === ((this.Y - 1) / 16 | 0)) {
      this.Facing = -Mario.Character.Facing;
      this.Ya = -10;
    }
  }
  Die() {
    this.Dead = !0;
    this.Carried = !1;
    this.Xa = -this.Facing * 2;
    this.Ya = -5;
    this.DeadTime = 100;
  }
  /**
   *
   * @param {Shell} shell
   */
  ShellCollideCheck(shell) {
    if (this.DeadTime !== 0)
      return !1;
    let x = shell.X - this.X, y = shell.Y - this.Y;
    if (x > -16 && x < 16 && y > -this.Height && y < shell.Height) {
      Enjine.Resources.PlaySound("kick");
      if (Mario.Character.Carried === shell || Mario.Character.Carried === this)
        Mario.Character.Carried = null;
      this.Die();
      shell.Die();
      return !0;
    } return !1;
  }
  Release() {
    this.Carried = !1;
    this.Facing = Mario.Character.Facing;
    this.X += this.Facing * 8;
  }
}
