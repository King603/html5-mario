import { Enjine } from "../Enjine/index.js";
import { NotchSprite } from "./NotchSprite.js";
import { Mario } from "./index.js";
import { Shell } from "./Shell.js";

/**
 * 怪物类
 * @extends NotchSprite
 */
export class Enemy extends NotchSprite {
  /**
   * @param {LevelState} world
   * @param {Number} x
   * @param {Number} y
   * @param {Number} facing
   * @param {StyleSheet} type
   * @param {Boolean} winged
   */
  constructor(world, x, y, facing, type, winged) {
    super(Enjine.Resources.Images.enemies);
    this.AirInertia = this.GroundInertia = .89;
    this.RunTime = 0;
    this.MayJump = this.OnGround = !1;
    this.YJumpSpeed = this.XJumpSpeed = this.JumpTime = 0;
    this.Width = 4;
    this.Height = 24;
    this.DeadTime = 0;
    this.FlyDeath = !1;
    this.WingTime = 0;
    this.NoFireballDeath = !1;
    this.X = x;
    this.Y = y;
    this.World = world;
    this.Type = type;
    this.Winged = winged;
    this.XPicO = 8;
    this.YPicO = 31;
    this.AvoidCliffs = this.Type === Mario.Enemy.RedKoopa;
    this.NoFireballDeath = this.Type === Mario.Enemy.Spiky;
    this.YPic = this.Type;
    if (this.YPic > 1)
      this.Height = 12;
    this.Facing = facing;
    if (this.Facing === 0)
      this.Facing = 1;
    this.PicWidth = 16;
    this.RedKoopa = 0;
    this.GreenKoopa = 1;
    this.Goomba = 2;
    this.Spiky = 3;
    this.Flower = 4;
  }
  CollideCheck() {
    if (this.DeadTime === 0) {
      let a = Mario.Character.X - this.X, b = Mario.Character.Y - this.Y;
      if (a > -this.Width * 2 - 4 && a < this.Width * 2 + 4 && b > -this.Height && b < Mario.Character.Height)
        if (this.Type !== Mario.Enemy.Spiky && Mario.Character.Ya > 0 && b <= 0 && (!Mario.Character.OnGround || !Mario.Character.WasOnGround))
          if (Mario.Character.Stomp(this), this.Winged) {
            this.Winged = !1;
            this.Ya = 0;
          }
          else {
            this.YPicO = 7;
            this.PicHeight = 8;
            if (this.SpriteTemplate !== null)
              this.SpriteTemplate.IsDead = !0;
            this.DeadTime = 10;
            this.Winged = !1;
            switch (this.Type) {
              case Mario.Enemy.RedKoopa: this.World.AddSprite(new Shell(this.World, this.X, this.Y, 0)); break;
              case this.Type === Mario.Enemy.GreenKoopa: this.World.AddSprite(new Shell(this.World, this.X, this.Y, 1)); break;
            }
          }
        else
          Mario.Character.GetHurt();
    }
  }
  Move() {
    this.WingTime++;
    if (this.DeadTime > 0) {
      if (--this.DeadTime === 0) {
        this.DeadTime = 1;
        for (let a = 0; a < 8; a++)
          this.World.AddSprite(new Mario.Sparkle(
            this.World,
            (this.X + Math.random() * 16 - 8 | 0) + 4,
            (this.Y - Math.random() * 8 | 0) + 4,
            Math.random() * 2 - 1,
            Math.random() * -1,
            0, 1, 5
          ));
        this.World.RemoveSprite(this);
      }
      if (this.FlyDeath) {
        this.X += this.Xa;
        this.Y += this.Ya;
        this.Ya *= .95;
        this.Ya += 1;
      }
    }
    else {
      if (this.Xa > 2)
        this.Facing = 1;
      if (this.Xa < -2)
        this.Facing = -1;
      this.Xa = this.Facing * 1.75;
      this.MayJump = this.OnGround;
      this.XFlip = this.Facing === -1;
      this.RunTime += Math.abs(this.Xa) + 5;
      let a = (this.RunTime / 20 | 0) % 2;
      this.OnGround || (a = 1);
      if (!this.SubMove(this.Xa, 0))
        this.Facing *= -1;
      this.OnGround = !1;
      this.SubMove(0, this.Ya);
      this.Ya *= this.Winged ? .95 : .85;
      this.Xa *= this.OnGround ? this.GroundInertia : this.AirInertia;
      if (this.OnGround) {
        if (this.Winged)
          this.Ya = -10;
      }
      else
        this.Ya += this.Winged ? .6 : 2;
      this.Winged && (a = (this.WingTime / 4 | 0) % 2);
      this.XPic = a;
    }
  }
  /**
   * 部件的移动
   * @param {Number} X
   * @param {Number} Y
   */
  SubMove(X, Y) {
    let c = !1;
    while (X > +8) {
      if (!this.SubMove(+8, 0))
        return !1; X -= 8;
    }
    while (X < -8) {
      if (!this.SubMove(-8, 0))
        return !1; X += 8;
    }
    while (Y > +8) {
      if (!this.SubMove(0, +8))
        return !1; Y -= 8;
    }
    while (Y < -8) {
      if (!this.SubMove(0, -8))
        return !1; Y += 8;
    }
    let x = this.X + X;
    let y = this.Y + Y;
    let { Width: w, Height: h } = this;
    if (Y > 0 && (
      this.IsBlocking(x - w, y + 0, X, 0) ||
      this.IsBlocking(x + w, y + 0, X, 0) ||
      this.IsBlocking(x - w, y + 1, X, Y) ||
      this.IsBlocking(x + w, y + 1, X, Y)
    ))
      c = !0;
    if (Y < 0 && (
      this.IsBlocking(x + 0, y - h, X, Y) || c ||
      this.IsBlocking(x - w, y - h, X, Y) || c ||
      this.IsBlocking(x + w, y - h, X, Y)
    ))
      c = !0;
    if (X > 0 && (
      this.IsBlocking(x + w, y - h, X, Y) ||
      this.IsBlocking(x + w, y - (h / 2 | 0), X, Y) ||
      this.IsBlocking(x + w, y + 0, X, Y) ||
      (this.AvoidCliffs && this.OnGround && !this.World.Level.IsBlocking((this.X + this.Xa + w) / 16 | 0, this.Y / 16 + 1 | 0, this.Xa, 1))
    ))
      c = !0;
    if (X < 0 && (
      this.IsBlocking(x - w, y - h, X, Y) ||
      this.IsBlocking(x - w, y - (h / 2 | 0), X, Y) ||
      this.IsBlocking(x - w, y + 0, X, Y) ||
      (this.AvoidCliffs && this.OnGround && !this.World.Level.IsBlocking((this.X + this.Xa - w) / 16 | 0, this.Y / 16 + 1 | 0, this.Xa, 1))
    ))
      c = !0;
    if (c) {
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
        this.Ya = this.JumpTime = 0;
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
   * @returns {Number | Boolean}
   */
  IsBlocking(w, h, x, y) {
    w = w / 16 | 0;
    h = h / 16 | 0;
    if (w === this.X / 16 | 0 && h === this.Y / 16 | 0)
      return !1;
    return this.World.Level.IsBlocking(w, h, x, y);
  }
  /**
   * @param {Shell} shell
   * @returns {Boolean}
   */
  ShellCollideCheck(shell) {
    if (this.DeadTime !== 0)
      return !1;
    let b = shell.X - this.X, c = shell.Y - this.Y;
    if (b > -16 && b < 16 && c > -this.Height && c < shell.Height) {
      Enjine.Resources.PlaySound("kick");
      this.Xa = shell.Facing * 2;
      this.Ya = -5;
      this.FlyDeath = !0;
      if (this.SpriteTemplate !== null)
        this.SpriteTemplate.IsDead = !0;
      this.DeadTime = 100;
      this.Winged = !1;
      return this.YFlip = !0;
    }
    return !1;
  }
  /**
   * 火球碰撞检查
   * @param {Fireball} fireball
   * @returns {Boolean}
   */
  FireballCollideCheck(fireball) {
    if (this.DeadTime !== 0)
      return !1;
    let w = fireball.X - this.X, h = fireball.Y - this.Y;
    if (w > -16 && w < 16 && h > -this.Height && h < fireball.Height) {
      if (this.NoFireballDeath)
        return !0;
      Enjine.Resources.PlaySound("kick");
      this.Xa = fireball.Facing * 2;
      this.Ya = -5;
      this.FlyDeath = !0;
      if (this.SpriteTemplate !== null)
        this.SpriteTemplate.IsDead = !0;
      this.DeadTime = 100;
      this.Winged = !1;
      return this.YFlip = !0;
    }
  }
  /**
   * 碰撞检测
   * @param {*} a
   * @param {*} b
   */
  BumpCheck(a, b) {
    if (this.DeadTime === 0 && this.X + this.Width > a * 16 && this.X - this.Width < a * 16 + 16 && b === (this.Y - 1) / 16 | 0) {
      Enjine.Resources.PlaySound("kick");
      this.Xa = -Mario.Character.Facing * 2;
      this.Ya = -5;
      this.FlyDeath = !0;
      if (this.SpriteTemplate !== null)
        this.SpriteTemplate.IsDead = !0;
      this.DeadTime = 100;
      this.Winged = !1;
      this.YFlip = !0;
    }
  }
  SubDraw() {
    super.Draw();
  }
  /**
   * 布局
   * @param {CanvasRenderingContext2D} ctx
   * @param {Camera} camera
   */
  Draw(ctx, camera) {
    if (this.Winged) {
      let x = (this.XOld + (this.X - this.XOld) * this.Delta | 0) - this.XPicO;
      let y = (this.YOld + (this.Y - this.YOld) * this.Delta | 0) - this.YPicO;
      if (this.Type !== Mario.Enemy.RedKoopa && this.Type !== Mario.Enemy.GreenKoopa) {
        this.XFlip = !this.XFlip;
        ctx.save();
        ctx.scale(this.XFlip ? -1 : 1, this.YFlip ? -1 : 1);
        ctx.translate(this.XFlip ? -320 : 0, this.YFlip ? -240 : 0);
        ctx.drawImage(
          this.Image,
          (this.WingTime / 4 | 0) % 2 * 16,
          128,
          16,
          32,
          this.XFlip ? 320 - x - 24 : x - 8,
          this.YFlip ? 240 - y - 32 : y - 8,
          16,
          32
        );
        ctx.restore();
        this.XFlip = !this.XFlip;
      }
    }
    this.SubDraw(ctx, camera);
    if (this.Winged) {
      let x = (this.XOld + (this.X - this.XOld) * this.Delta | 0) - this.XPicO;
      let y = (this.YOld + (this.Y - this.YOld) * this.Delta | 0) - this.YPicO;
      ctx.save();
      ctx.scale(this.XFlip ? -1 : 1, this.YFlip ? -1 : 1);
      ctx.translate(this.XFlip ? -320 : 0, this.YFlip ? -240 : 0);
      ctx.drawImage(
        this.Image,
        (this.WingTime / 4 | 0) % 2 * 16,
        128,
        16,
        32,
        this.XFlip ? 320 - x - 24 : x - 8,
        this.YFlip ? 240 - y - (this.Type === Mario.Enemy.RedKoopa && this.Type === Mario.Enemy.GreenKoopa ? 0 : 32) : y - 8,
        16,
        32
      );
      ctx.restore();
    }
  }

}
