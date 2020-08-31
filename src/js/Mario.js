import { Enjine } from "./Enjine.js";

class Level {
  /**
   * 关卡类
   * @param {Number} width 宽
   * @param {Number} height 高
   */
  constructor(width, height) {
    // 关卡界面大小
    this.Width = width;
    this.Height = height;
    // 出口位置
    this.ExitY = this.ExitX = 10;
    // 界面
    this.Map = [];
    // 数据
    this.Data = [];
    // 精灵图模板
    this.SpriteTemplates = [];
    // 添加界面信息
    for (let x = 0; x < this.Width; x++) {
      this.Map[x] = [];
      this.Data[x] = [];
      this.SpriteTemplates[x] = [];
      for (let y = 0; y < this.Height; y++) {
        this.Map[x][y] = 0;
        this.Data[x][y] = 0;
        this.SpriteTemplates[x][y] = null;
      }
    }
  }
  /** 更新数据 */
  Update() {
    for (let x = 0; x < this.Width; x++)
      for (let y = 0; y < this.Height; y++)
        if (this.Data[x][y] > 0) this.Data[x][y]--;
  }
  /**
   * 获取方块顶部
   * @param {Number} x X坐标
   * @param {Number} y Y坐标
   * @returns {Number}
   */
  GetBlockCapped(x, y) {
    (x = Math.max(x, 0)) >= this.Width && (x = this.Width - 1);
    (y = Math.max(y, 0)) >= this.Height && (y = this.Height - 1);
    return this.Map[x][y];
  }
  /**
   * 获取方块
   * @param {Number} x X坐标
   * @param {Number} y Y坐标
   * @returns {Number}
   */
  GetBlock(x, y) {
    x = Math.max(x, 0);
    if (y < 0) return 0;
    x >= this.Width && (x = this.Width - 1);
    y >= this.Height && (y = this.Height - 1);
    return this.Map[x][y];
  }
  /**
   * 设置方块
   * @param {Number} x X坐标
   * @param {Number} y Y坐标
   * @param {Number} ele 元素
   */
  SetBlock(x, y, ele) {
    x < 0 || y < 0 || x >= this.Width || y >= this.Height || (this.Map[x][y] = ele);
  }
  /**
   * 设置方块数据
   * @param {Number} x X坐标
   * @param {Number} y Y坐标
   * @param {Number} ele 元素 
   */
  SetBlockData(x, y, ele) {
    x < 0 || y < 0 || x >= this.Width || y >= this.Height || (this.Data[x][y] = ele);
  }
  /**
   * 判断阻塞
   * @param {Number} x X坐标
   * @param {Number} y Y坐标
   * @param {Number} ele 元素 
   * @returns {Number}
   */
  IsBlocking(x, y, ele) {
    x = this.GetBlock(x, y);
    y = (Mario.Tile.Behaviors[x & 255] & Mario.Tile.BlockAll) > 0;
    y |= ele > 0 && (Mario.Tile.Behaviors[x & 255] & Mario.Tile.BlockUpper) > 0;
    y |= ele < 0 && (Mario.Tile.Behaviors[x & 255] & Mario.Tile.BlockLower) > 0;
    return y;
  }
  /**
   * 获取Sprite模板
   * @param {Number} x X坐标
   * @param {Number} y Y坐标
   * @returns {Mario["SpriteTemplate"]}
   */
  GetSpriteTemplate(x, y) {
    return x < 0 || y < 0 || x >= this.Width || y >= this.Height ? null : this.SpriteTemplates[x][y];
  }
  /**
   * 设置Sprite模板
   * @param {Number} x X坐标
   * @param {Number} y Y坐标
   * @param {Number} ele 元素
   */
  SetSpriteTemplate(x, y, ele) {
    x < 0 || y < 0 || x >= this.Width || y >= this.Height || (this.SpriteTemplates[x][y] = ele);
  }
}

class NotchSprite extends Enjine.Drawable {
  /**
   * 裁剪精灵图
   * @param {HTMLElement} img 
   */
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

class Enemy extends NotchSprite {
  /**
   * 怪物类
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
    if (this.YPic > 1) this.Height = 12;
    this.Facing = facing;
    if (this.Facing === 0) this.Facing = 1;
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
          } else {
            this.YPicO = 7;
            this.PicHeight = 8;
            if (this.SpriteTemplate !== null)
              this.SpriteTemplate.IsDead = !0;
            this.DeadTime = 10;
            this.Winged = !1;
            switch (this.Type) {
              case Mario.Enemy.RedKoopa: this.World.AddSprite(new Mario.Shell(this.World, this.X, this.Y, 0)); break;
              case this.Type === Mario.Enemy.GreenKoopa: this.World.AddSprite(new Mario.Shell(this.World, this.X, this.Y, 1)); break;
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
    while (X > +8) { if (!this.SubMove(+8, 0)) return !1; X -= 8; }
    while (X < -8) { if (!this.SubMove(-8, 0)) return !1; X += 8; }
    while (Y > +8) { if (!this.SubMove(0, +8)) return !1; Y -= 8; }
    while (Y < -8) { if (!this.SubMove(0, -8)) return !1; Y += 8; }
    let x = this.X + X;
    let y = this.Y + Y;
    let { Width: w, Height: h } = this;
    if (Y > 0 && (
      this.IsBlocking(x - w, y + 0, X, 0) ||
      this.IsBlocking(x + w, y + 0, X, 0) ||
      this.IsBlocking(x - w, y + 1, X, Y) ||
      this.IsBlocking(x + w, y + 1, X, Y)
    )) c = !0;
    if (Y < 0 && (
      this.IsBlocking(x + 0, y - h, X, Y) || c ||
      this.IsBlocking(x - w, y - h, X, Y) || c ||
      this.IsBlocking(x + w, y - h, X, Y)
    )) c = !0;
    if (X > 0 && (
      this.IsBlocking(x + w, y - h, X, Y) ||
      this.IsBlocking(x + w, y - (h / 2 | 0), X, Y) ||
      this.IsBlocking(x + w, y + 0, X, Y) ||
      (this.AvoidCliffs && this.OnGround && !this.World.Level.IsBlocking((this.X + this.Xa + w) / 16 | 0, this.Y / 16 + 1 | 0, this.Xa, 1))
    )) c = !0;
    if (X < 0 && (
      this.IsBlocking(x - w, y - h, X, Y) ||
      this.IsBlocking(x - w, y - (h / 2 | 0), X, Y) ||
      this.IsBlocking(x - w, y + 0, X, Y) ||
      (this.AvoidCliffs && this.OnGround && !this.World.Level.IsBlocking((this.X + this.Xa - w) / 16 | 0, this.Y / 16 + 1 | 0, this.Xa, 1))
    )) c = !0;
    if (c) {
      if (X < 0) {
        this.X = ((this.X - w) / 16 + 0 | 0) * 16 + w + 0;
        this.Xa = 0;
      } else if (X > 0) {
        this.X = ((this.X + w) / 16 + 1 | 0) * 16 - w - 1;
        this.Xa = 0;
      }
      if (Y < 0) {
        this.Y = ((this.Y - h) / 16 + 0 | 0) * 16 + h + 0;
        this.Ya = this.JumpTime = 0;
      } else if (Y > 0) {
        this.Y = ((this.Y - 1) / 16 + 1 | 0) * 16 - 1 + 0;
        this.OnGround = !0;
      }
      return !1;
    } else {
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
   * @param {Enjine["Camera"]} camera 
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

class Shell extends NotchSprite {
  /**
   * 
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
          if (this.Facing = this.Facing !== 0) this.Xa = 0;
          else Mario.Character.Facing;
        } else if (this.Facing !== 0) {
          Mario.Character.GetHurt();
        } else {
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
      if (!this.SubMove(8, 0)) return !1;
      X -= 8;
    }
    while (X < -8) {
      if (!this.SubMove(-8, 0)) return !1;
      X += 8;
    }
    while (Y > 8) {
      if (!this.SubMove(0, 8)) return !1;
      Y -= 8;
    }
    while (Y < -8) {
      if (!this.SubMove(0, -8)) return !1;
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
    )) IsBlocking = !0;
    if (Y < 0 && (
      this.IsBlocking(x + 0, y + Y - h, X, Y) || IsBlocking ||
      this.IsBlocking(x - w, y + Y - h, X, Y) || IsBlocking ||
      this.IsBlocking(x + w, y + Y - h, X, Y)
    )) IsBlocking = !0;
    if (X > 0 && (
      this.IsBlocking(x + w, y + Y - h, X, Y) ||
      this.IsBlocking(x + w, y + Y - (h / 2 | 0), X, Y) ||
      this.IsBlocking(x + w, y + Y + 0, X, Y)
    )) IsBlocking = !0;
    if (X < 0 && (
      this.IsBlocking(x - w, y + Y - h, X, Y) ||
      this.IsBlocking(x - w, y + Y - (h / 2 | 0), X, Y) ||
      this.IsBlocking(x - w, y + Y + 0, X, Y)
    )) IsBlocking = !0;
    if (IsBlocking) {
      if (X < 0) {
        this.X = ((this.X - w) / 16 + 0 | 0) * 16 + w + 0;
        this.Xa = 0;
      } else if (X > 0) {
        this.X = ((this.X + w) / 16 + 1 | 0) * 16 - w - 1;
        this.Xa = 0;
      }
      if (Y < 0) {
        this.Y = ((this.Y - h) / 16 + 0 | 0) * 16 + h + 0;
        this.Ya = 0;
      } else if (Y > 0) {
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
    if (d && y === 0 && x !== 0) this.World.Bump(w, h, !0);
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

class LevelState extends Enjine.GameState {
  /**
   * 
   * @param {Number} difficulty 
   * @param {Number} type 
   */
  constructor(difficulty, type) {
    super();
    this.LevelDifficulty = difficulty;
    this.LevelType = type;
    this.Layer = this.Level = null;
    this.BgLayer = [];
    this.Paused = !1;
    this.Font = this.FontShadow = this.FireballsToCheck = this.ShellsToCheck = this.Camera = this.SpritesToRemove = this.SpritesToAdd = this.Sprites = null;
    this.Delta = this.Tick = this.FireballsOnScreen = this.StartTime = this.TimeLeft = 0;
    this.GotoLoseState = this.GotoMapState = !1;
  }
  Enter() {
    this.Level = (new Mario.LevelGenerator(320, 15)).CreateLevel(this.LevelType, this.LevelDifficulty);
    this.Paused = !1;
    this.Layer = new Mario.LevelRenderer(this.Level, 320, 240);
    this.Sprites = new Enjine.DrawableManager;
    this.Camera = new Enjine.Camera;
    this.Tick = 0;
    this.ShellsToCheck = [];
    this.FireballsToCheck = [];
    this.SpritesToAdd = [];
    this.SpritesToRemove = [];
    this.FontShadow = Mario.SpriteCuts.CreateBlackFont();
    this.Font = Mario.SpriteCuts.CreateWhiteFont();
    for (let i = 0; i < 2; i++) {
      let b = 4 >> i;
      this.BgLayer[i] = new Mario.BackgroundRenderer(new Mario.BackgroundGenerator((((this.Level.Width * 16 - 320) / b | 0) + 320) / 32 + 1, (((this.Level.Height * 16 - 240) / b | 0) + 240) / 32 + 1, i === 0, this.LevelType).CreateLevel(), 320, 240, b);
    }
    Mario.Character.Initialize(this);
    this.Sprites.Add(Mario.Character);
    this.StartTime = 1;
    this.TimeLeft = 200;
    this.GotoLoseState = this.GotoMapState = !1;
  }
  Exit() {
    delete this.Level;
    delete this.Layer;
    delete this.BgLayer;
    delete this.Sprites;
    delete this.Camera;
    delete this.ShellsToCheck;
    delete this.FireballsToCheck;
    delete this.FontShadow;
    delete this.Font;
  }
  CheckShellCollide(a) {
    this.ShellsToCheck.push(a);
  }
  CheckFireballCollide(a) {
    this.FireballsToCheck.push(a);
  }
  /**
   * 
   * @param {Number} time 
   */
  Update(time) {
    this.Delta = time;
    this.TimeLeft -= time;
    (this.TimeLeft | 0) === 0 && Mario.Character.Die();
    this.StartTime > 0 && this.StartTime++;
    this.Camera.X = Mario.Character.X - 160;
    let index;
    if (this.Camera.X < 0)
      this.Camera.X = 0;
    if (this.Camera.X > this.Level.Width * 16 - 320)
      this.Camera.X = this.Level.Width * 16 - 320;
    this.FireballsOnScreen = 0;
    this.Sprites.Objects.forEach((Obj, i) => {
      if (Obj !== Mario.Character) {
        let x = Obj.X - this.Camera.X;
        let y = Obj.Y - this.Camera.Y;
        if (x < -64 || x > 384 || y < -64 || y > 304) this.Sprites.RemoveAt(i);
        else if (Obj instanceof Mario.Fireball) this.FireballsOnScreen++;
      }
    })
    if (this.Paused)
      for (index = 0; index < this.Sprites.Objects.length; index++)
        this.Sprites.Objects[index] === Mario.Character ? this.Sprites.Objects[index].Update(time) : this.Sprites.Objects[index].UpdateNoMove(time);
    else {
      this.Layer.Update(time);
      this.Level.Update();
      this.Tick++;
      for (let i = (this.Camera.X / 16 | 0) - 1; i <= ((this.Camera.X + this.Layer.Width) / 16 | 0) + 1; i++)
        for (let j = (this.Camera.Y / 16 | 0) - 1; j <= ((this.Camera.Y + this.Layer.Height) / 16 | 0) + 1; j++) {
          let d = i * 16 + 8 > Mario.Character.X + 16
            ? -1
            : i * 16 + 8 < Mario.Character.X - 16
              ? 1
              : 0;
          let SpriteTemplate = this.Level.GetSpriteTemplate(i, j);
          if (SpriteTemplate !== null)
            if (SpriteTemplate.LastVisibleTick !== this.Tick - 1 && (SpriteTemplate.Sprite === null || !this.Sprites.Contains(SpriteTemplate.Sprite))) {
              SpriteTemplate.Spawn(this, i, j, d);
              SpriteTemplate.LastVisibleTick = this.Tick;
            }
          if (d !== 0 && (SpriteTemplate = this.Level.GetBlock(i, j), (Mario.Tile.Behaviors[SpriteTemplate & 255] & Mario.Tile.Animated) > 0 && (SpriteTemplate % 16 / 4 | 0) === 3 && (SpriteTemplate / 16 | 0) === 0 && (this.Tick - i * 2) % 100 === 0)) {
            for (let b = 0; b < 8; b++)
              this.AddSprite(new Mario.Sparkle(this, i * 16 + 8, j * 16 + (Math.random() * 16 | 0), Math.random() * d, 0, 0, 1, 5));
            this.AddSprite(new Mario.BulletBill(this, i * 16 + 8 + d * 8, j * 16 + 15, d));
          }
        }
      index && Enjine.Resources.PlaySound("cannon");
      this.Sprites.Objects.forEach(obj => obj.Update(time));
      this.Sprites.Objects.forEach(obj => obj.CollideCheck());
      this.ShellsToCheck.forEach(shellToCheck => this.Sprites.Objects.forEach(obj => {
        if (obj !== shellToCheck && !shellToCheck.Dead && obj.ShellCollideCheck(shellToCheck) && Mario.Character.Carried === shellToCheck && !shellToCheck.Dead) {
          Mario.Character.Carried = null;
          shellToCheck.Die();
        }
      }));
      this.ShellsToCheck.length = 0;
      this.FireballsToCheck.forEach(fireballToCheck => this.Sprites.Objects.forEach(obj => obj !== fireballToCheck && !fireballToCheck.Dead && obj.FireballCollideCheck(fireballToCheck) && fireballToCheck.Die()));
      this.FireballsToCheck.length = 0;
    }
    this.Sprites.AddRange(this.SpritesToAdd);
    this.Sprites.RemoveList(this.SpritesToRemove);
    this.SpritesToAdd.length = 0;
    this.SpritesToRemove.length = 0;
    this.Camera.X = Mario.Character.XOld + (Mario.Character.X - Mario.Character.XOld) * time - 160;
    this.Camera.Y = Mario.Character.YOld + (Mario.Character.Y - Mario.Character.YOld) * time - 120;
  }
  /**
   * 布局
   * @param {CanvasRenderingContext2D} ctx 
   */
  Draw(ctx) {
    this.Camera.X = Math.min(Math.max(this.Camera.X, 0), this.Level.Width * 16 - 320);
    this.Camera.Y = Math.min(Math.max(this.Camera.Y, 0), this.Level.Height * 16 - 240);
    for (let b = 0; b < 2; b++)
      this.BgLayer[b].Draw(ctx, this.Camera);
    ctx.save();
    ctx.translate(-this.Camera.X, -this.Camera.Y);
    for (let Obj of this.Sprites.Objects)
      if (Obj.Layer === 0) Obj.Draw(ctx, this.Camera);
    ctx.restore();
    this.Layer.Draw(ctx, this.Camera);
    this.Layer.DrawExit0(ctx, this.Camera, Mario.Character.WinTime === 0);
    ctx.save();
    ctx.translate(-this.Camera.X, -this.Camera.Y);
    for (let Obj of this.Sprites.Objects)
      Obj.Layer === 1 && Obj.Draw(ctx, this.Camera);
    ctx.restore();
    this.Layer.DrawExit1(ctx, this.Camera);
    this.DrawStringShadow(ctx, "MARIO " + Mario.Character.Lives, 0, 0);
    this.DrawStringShadow(ctx, "00000000", 0, 1);
    this.DrawStringShadow(ctx, "COIN", 14, 0);
    this.DrawStringShadow(ctx, " " + Mario.Character.Coins, 14, 1);
    this.DrawStringShadow(ctx, "WORLD", 24, 0);
    this.DrawStringShadow(ctx, " " + Mario.Character.LevelString, 24, 1);
    this.DrawStringShadow(ctx, "TIME", 34, 0);
    let b = Math.max(this.TimeLeft | 0, 0);
    this.DrawStringShadow(ctx, " " + b, 34, 1);
    this.StartTime > 0 && (b = this.StartTime + this.Delta - 2, this.RenderBlackout(ctx, 160, 120, b * b * .6 | 0));
    if (Mario.Character.WinTime > 0) {
      let time = Mario.Character.WinTime + this.Delta;
      time *= time * .2;
      if (time > 900)
        Mario.GlobalMapState.LevelWon(), this.GotoMapState = !0;
      this.RenderBlackout(ctx, Mario.Character.XDeathPos - this.Camera.X | 0, Mario.Character.YDeathPos - this.Camera.Y | 0, 320 - time | 0);
    }
    if (Mario.Character.DeathTime > 0) {
      let time = Mario.Character.DeathTime + this.Delta;
      time *= time * .1;
      if (time > 900 && (Mario.Character.Lives--, this.GotoMapState = !0, Mario.Character.Lives <= 0))
        this.GotoLoseState = !0;
      this.RenderBlackout(ctx, Mario.Character.XDeathPos - this.Camera.X | 0, Mario.Character.YDeathPos - this.Camera.Y | 0, 320 - time | 0);
    }
  }
  /**
   * 绘制字符阴影
   * @param {CanvasRenderingContext2D} ctx 
   * @param {String} type 
   * @param {Number} x 
   * @param {Number} y 
   */
  DrawStringShadow(ctx, type, x, y) {
    this.Font.Strings[0] = { String: type, X: x * 8 + 4, Y: y * 8 + 4 };
    this.FontShadow.Strings[0] = { String: type, X: x * 8 + 5, Y: y * 8 + 5 };
    this.FontShadow.Draw(ctx);
    this.Font.Draw(ctx);
  }
  /**
   * 
   * @param {CanvasRenderingContext2D} ctx 
   * @param {Number} x 
   * @param {Number} y 
   * @param {Number} time 
   */
  RenderBlackout(ctx, x, y, time) {
    if (!(time > 320)) {
      let x_arr = [], y_arr = [];
      for (let g = 0; g < 16; g++) {
        x_arr[g] = x + Math.cos(g * Math.PI / 15) * time | 0;
        y_arr[g] = y + Math.sin(g * Math.PI / 15) * time | 0;
      }
      x_arr[16] = 0;
      y_arr[16] = y;
      x_arr[17] = 0;
      y_arr[17] = 240;
      x_arr[18] = 320;
      y_arr[18] = 240;
      x_arr[19] = 320;
      y_arr[19] = y;
      ctx.fillStyle = "#000";
      ctx.beginPath();
      ctx.moveTo(x_arr[19], y_arr[19]);
      for (let g = 18; g >= 0; g--)
        ctx.lineTo(x_arr[g], y_arr[g]);
      ctx.closePath();
      ctx.fill();
      for (let g = 0; g < 16; g++) {
        x_arr[g] = x - Math.cos(g * Math.PI / 15) * time | 0;
        y_arr[g] = y - Math.sin(g * Math.PI / 15) * time | 0;
      }
      y_arr[15] += 5;
      x_arr[16] = 320;
      y_arr[16] = y;
      x_arr[17] = 320;
      y_arr[17] = 0;
      x_arr[18] = 0;
      y_arr[18] = 0;
      x_arr[19] = 0;
      y_arr[19] = y;
      ctx.fillStyle = "#000";
      ctx.beginPath();
      ctx.moveTo(x_arr[0], y_arr[0]);
      for (let g = 0; g < x_arr.length; g++)
        ctx.lineTo(x_arr[g], y_arr[g]);
      ctx.closePath();
      ctx.fill();
    }
  }
  /**
   * 添加部件
   * @param {Mario["Shell"] | Mario["BulletBill"] | Mario["Sparkle"] | Mario["FireFlower"] | Mario["Mushroom"] | Mario["CoinAnim"] | Mario["Particle"]} sprite 
   */
  AddSprite(sprite) {
    this.Sprites.Add(sprite);
  }
  /**
   * 移除部件
   * @param {Mario["Shell"] | Mario["BulletBill"] | Mario["Sparkle"] | Mario["FireFlower"] | Mario["Mushroom"] | Mario["CoinAnim"] | Mario["Particle"]} sprite 
   */
  RemoveSprite(sprite) {
    this.Sprites.Remove(sprite);
  }
  /**
   * 撞击
   * @param {Number} x 
   * @param {Number} y 
   * @param {Boolean} bool 
   */
  Bump(x, y, bool) {
    let e = this.Level.GetBlock(x, y);
    if ((Mario.Tile.Behaviors[e & 255] & Mario.Tile.Bumpable) > 0) {
      this.BumpInto(x, y - 1);
      this.Level.SetBlock(x, y, 4);
      this.Level.SetBlockData(x, y, 4);
      if ((Mario.Tile.Behaviors[e & 255] & Mario.Tile.Special) > 0) {
        Enjine.Resources.PlaySound("sprout");
        if (Mario.Character.Large) this.AddSprite(new Mario.FireFlower(this, x * 16 + 8, y * 16 + 8));
        else this.AddSprite(new Mario.Mushroom(this, x * 16 + 8, y * 16 + 8));
      } else {
        Mario.Character.GetCoin();
        Enjine.Resources.PlaySound("coin");
        this.AddSprite(new Mario.CoinAnim(this, x, y));
      }
    }
    if ((Mario.Tile.Behaviors[e & 255] & Mario.Tile.Breakable) > 0 && (this.BumpInto(x, y - 1), bool)) {
      Enjine.Resources.PlaySound("breakblock");
      this.Level.SetBlock(x, y, 0);
      for (let d = 0; d < 2; d++)
        for (let f = 0; f < 2; f++)
          this.AddSprite(new Mario.Particle(this, x * 16 + d * 8 + 4, y * 16 + f * 8 + 4, (d * 2 - 1) * 4, (f * 2 - 1) * 4 - 8));
    }
  }
  /**
   * 撞击进入
   * @param {Number} x 
   * @param {Number} y 
   */
  BumpInto(x, y) {
    if ((Mario.Tile.Behaviors[this.Level.GetBlock(x, y) & 255] & Mario.Tile.PickUpable) > 0) {
      Mario.Character.GetCoin();
      Enjine.Resources.PlaySound("coin");
      this.Level.SetBlock(x, y, 0);
      this.AddSprite(new Mario.CoinAnim(x, y + 1));
    }
    this.Sprites.Objects.forEach(obj => obj.BumpCheck(x, y));
  }
  /**
   * 
   * @param {Enjine["GameStateContext"]} ctx 
   */
  CheckForChange(ctx) {
    if (this.GotoLoseState) ctx.ChangeState(new Mario.LoseState);
    else if (this.GotoMapState) ctx.ChangeState(Mario.GlobalMapState);
  }
}
class Fireball extends NotchSprite {
  /**
   * 火球类
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
      if (this.Facing != 0) this.Anim++;
      if (this.Xa > 2) this.Facing = 1;
      if (this.Xa < -2) this.Facing = -1;
      this.Xa = this.Facing * 8;
      this.World.CheckFireballCollide(this);
      this.FlipX = this.Facing === -1;
      this.XPic = this.Anim % 4;
      this.SubMove(this.Xa, 0) || this.Die();
      this.OnGround = !1;
      this.SubMove(0, this.Ya);
      if (this.OnGround) this.Ya = -10;
      this.Ya *= .95;
      this.Xa *= this.OnGround ? this.GroundInertia : this.AirInertia;
      if (!this.OnGround) this.Ya += 1.5;
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
      if (!this.SubMove(8, 0)) return !1;
      x -= 8;
    }
    while (x < -8) {
      if (!this.SubMove(-8, 0)) return !1;
      x += 8;
    }
    while (y > 8) {
      if (!this.SubMove(0, 8)) return !1;
      y -= 8;
    }
    while (y < -8) {
      if (!this.SubMove(0, -8)) return !1;
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
    )) bool = !0;
    if (y < 0 && (
      this.IsBlocking(X + 0, Y - h, x, y) || bool ||
      this.IsBlocking(X - w, Y - h, x, y) || bool ||
      this.IsBlocking(X + w, Y - h, x, y)
    )) bool = !0;
    if (x > 0 && (
      this.IsBlocking(X + w, Y - h, x, y) ||
      this.IsBlocking(X + w, Y - (h / 2 | 0), x, y) ||
      this.IsBlocking(X + w, Y + 0, x, y)
    )) bool = !0;
    if (x < 0 && (
      this.IsBlocking(X - w, Y - h, x, y) ||
      this.IsBlocking(X - w, Y - (h / 2 | 0), x, y) ||
      this.IsBlocking(X - w, Y + 0, x, y)
    )) bool = !0;
    if (bool) {
      if (x < 0) {
        this.X = ((this.X - w) / 16 + 0 | 0) * 16 + w + 0;
        this.Xa = 0;
      } else if (x > 0) {
        this.X = ((this.X + w) / 16 + 1 | 0) * 16 - w - 1;
        this.Xa = 0;
      }
      if (y < 0) {
        this.Y = ((this.Y - h) / 16 + 0 | 0) * 16 + h + 0;
        this.Ya = 0;
      } else if (y > 0) {
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
export let Mario = {
  /** 裁剪精灵图 */
  SpriteCuts: {
    /** 创建黑色字体 */
    CreateBlackFont() {
      return new Enjine.SpriteFont([], Enjine.Resources.Images.font, 8, 8, this.GetCharArray(0));
    },
    /** 创建红色字体 */
    CreateRedFont() {
      return new Enjine.SpriteFont([], Enjine.Resources.Images.font, 8, 8, this.GetCharArray(8));
    },
    /** 创造绿色字体 */
    CreateGreenFont() {
      return new Enjine.SpriteFont([], Enjine.Resources.Images.font, 8, 8, this.GetCharArray(16));
    },
    /** 创建蓝色字体 */
    CreateBlueFont() {
      return new Enjine.SpriteFont([], Enjine.Resources.Images.font, 8, 8, this.GetCharArray(24));
    },
    /** 创建黄色字体 */
    CreateYellowFont() {
      return new Enjine.SpriteFont([], Enjine.Resources.Images.font, 8, 8, this.GetCharArray(32));
    },
    /** 创建粉红色字体 */
    CreatePinkFont() {
      return new Enjine.SpriteFont([], Enjine.Resources.Images.font, 8, 8, this.GetCharArray(40));
    },
    /** 创建青色字体 */
    CreateCyanFont() {
      return new Enjine.SpriteFont([], Enjine.Resources.Images.font, 8, 8, this.GetCharArray(48));
    },
    /** 创建白色字体 */
    CreateWhiteFont() {
      return new Enjine.SpriteFont([], Enjine.Resources.Images.font, 8, 8, this.GetCharArray(56));
    },
    /** 获取字符数组 */
    GetCharArray(a) {
      let b = [];
      for (let c = 32; c < 127; c++)
        b[c] = { X: (c - 32) * 8, Y: a };
      return b;
    },
    /** 获取背景页 */
    GetBackgroundSheet() {
      let { width, height } = Enjine.Resources.Images.background;
      let a = [];
      for (let b = 0; b < width / 32; b++) {
        a[b] = [];
        for (let c = 0; c < height / 32; c++)
          a[b][c] = { X: b * 32, Y: c * 32, Width: 32, Height: 32 };
      }
      return a;
    },
    /** 获取关卡表 */
    GetLevelSheet() {
      let { width, height } = Enjine.Resources.Images.map;
      let a = [];
      let size = 16;
      for (let b = 0; b < width / size; b++) {
        a[b] = [];
        for (let c = 0; c < height / size; c++)
          a[b][c] = { X: b * size, Y: c * size, Width: size, Height: size };
      } return a;
    }
  },
  /** 瓷砖 */
  Tile: {
    /** 方块上方 */
    BlockUpper: 1,
    /** 所有方块 */
    BlockAll: 2,
    /** 方块下方 */
    BlockLower: 4,
    /** 特殊的 */
    Special: 8,
    /** 可碰撞的 */
    Bumpable: 16,
    /** 可断开的 */
    Breakable: 32,
    /** 拾取能力 */
    PickUpable: 64,
    /** 动画 */
    Animated: 128,
    /** 行为 */
    Behaviors: [],
    /** 负载行为 */
    LoadBehaviors() {
      let map = [0, 20, 28, 0, 130, 130, 130, 130, 2, 2, 2, 2, 2, 0, 138, 0, 162, 146, 154, 162, 146, 146, 154, 146, 2, 0, 2, 2, 2, 0, 2, 0, 192, 192, 192, 192, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2];
      for (let b = 58; b < 128; b++)
        map[b] = 0;
      map[128] = 2;
      map[129] = 2;
      map[130] = 2;
      map[131] = 0;
      map[132] = 1;
      map[133] = 1;
      map[134] = 1;
      map[135] = 0;
      map[136] = 2;
      map[137] = 2;
      map[138] = 2;
      map[139] = 0;
      map[140] = 2;
      map[141] = 2;
      map[142] = 2;
      map[143] = 0;
      map[144] = 2;
      map[145] = 0;
      map[146] = 2;
      map[147] = 0;
      map[148] = 0;
      map[149] = 0;
      map[150] = 0;
      map[151] = 0;
      map[152] = 2;
      map[153] = 2;
      map[154] = 2;
      map[155] = 0;
      map[156] = 2;
      map[157] = 2;
      map[158] = 2;
      map[159] = 0;
      map[160] = 2;
      map[161] = 2;
      map[162] = 2;
      map[163] = 0;
      map[164] = 0;
      map[165] = 0;
      map[166] = 0;
      map[167] = 0;
      map[168] = 2;
      map[169] = 2;
      map[170] = 2;
      map[171] = 0;
      map[172] = 2;
      map[173] = 2;
      map[174] = 2;
      map[175] = 0;
      map[176] = 2;
      map[177] = 2;
      map[178] = 2;
      map[179] = 0;
      map[180] = 1;
      map[181] = 1;
      map[182] = 1;
      for (let b = 183; b < 224; b++)
        map[b] = 0;
      map[224] = 1;
      map[225] = 1;
      map[226] = 1;
      for (let b = 227; b < 256; b++)
        map[b] = 0;
      this.Behaviors = map;
    }
  },
  /** 等级样式 */
  LevelType: {
    /** 在地面 */
    Overground: 0,
    /** 在地下 */
    Underground: 1,
    /** 城堡 */
    Castle: 2
  },
  /** 几率 */
  Odds: {
    /** 直的 */
    Straight: 0,
    /** 直丘 */
    HillStraight: 1,
    /** 管子 */
    Tubes: 2,
    /** 跳跃 */
    Jump: 3,
    /** 大炮 */
    Cannons: 4
  },
  /** 图部件 */
  MapTile: {
    /** 草 */
    Grass: 0,
    /** 水 */
    Water: 1,
    /** 关卡 */
    Level: 2,
    /** 道路 */
    Road: 3,
    /** 装饰 */
    Decoration: 4
  },
  Level,
  BackgroundGenerator: class {
    /**
     * 背景信号发生器
     * @param {Number} width 宽
     * @param {Number} height 高
     * @param {Boolean} distant 
     * @param {ClassDecorator} type 引用类
     */
    constructor(width, height, distant, type) {
      this.Width = width;
      this.Height = height;
      this.Distant = distant;
      this.Type = type;
    }
    /**
     * 属性设置
     * @param {Number} width 宽
     * @param {Number} height 高
     * @param {Boolean} distant 
     * @param {ClassDecorator} type 引用类
     */
    SetValues(width, height, distant, type) {
      this.Width = width;
      this.Height = height;
      this.Distant = distant;
      this.Type = type;
    }
    /**
     * 创建关卡
     * @returns {Level}
     */
    CreateLevel() {
      let level = new Mario.Level(this.Width, this.Height);
      let { Overground, Underground, Castle } = Mario.LevelType;
      switch (this.Type) {
        case Overground: this.GenerateOverground(level); break;
        case Underground: this.GenerateUnderground(level); break;
        case Castle: this.GenerateCastle(level); break;
      }
      return level;
    }
    /**
     * 生成地面
     * @param {Level} level 
     */
    GenerateOverground(level) {
      let b = this.Distant ? 4 : 6,
        c = this.Distant ? 2 : 1,
        e = Math.floor(Math.random() * b) + c,
        d = Math.floor(Math.random() * b) + c;
      for (let x = 0; x < this.Width; x++) {
        for (e = d; e === d; d = Math.floor(Math.random() * b) + c);
        for (let y = 0; y < this.Height; y++) {
          let h = Math.min(e, d);
          let i = Math.max(e, d);
          if (y < h) {
            if (this.Distant) {
              i = Math.min(2, y);
              level.SetBlock(x, y, 4 + i * 8);
            } else level.SetBlock(x, y, 5);
          } else switch (y) {
            case h:
              i = h === d ? 0 : 1;
              i += this.Distant ? 2 : 0;
              level.SetBlock(x, y, i);
              break;
            case i:
              i = h === d ? 0 : 1;
              i += this.Distant ? 2 : 0;
              level.SetBlock(x, y, i + 16);
              break;
            default:
              i = y > i ? 1 : 0;
              if (h === e) i = 1 - i;
              i += this.Distant ? 2 : 0;
              level.SetBlock(x, y, i + 8);
          }
        }
      }
    }
    /**
     * 生成地下
     * @param {Level} level 
     */
    GenerateUnderground(level) {
      if (this.Distant) {
        let f = 0;
        for (let x = 0; x < this.Width; x++) {
          if (Math.random() < .75) f = 1 - f;
          for (let y = 0; y < this.Height; y++) {
            let e = f;
            let d = y - 2;
            if (d < 0 || d > 4) {
              d = 2;
              e = 0;
            }
            level.SetBlock(x, y, 4 + e + (3 + d) * 8);
          }
        }
      } else
        for (let x = 0; x < this.Width; x++)
          for (let y = 0; y < this.Height; y++) {
            let e = x % 2;
            let d = y - 1;
            if (d < 0 || d > 7) {
              d = 7;
              e = 0;
            }
            if (e === 0 && d > 1 && d < 5) {
              e = -1;
              d = 0;
            }
            level.SetBlock(x, y, 6 + e + d * 8);
          }
    }
    /**
     * 生成的城堡
     * @param {Level} level 
     */
    GenerateCastle(level) {
      for (let x = 0; x < this.Width; x++)
        for (let y = 0; y < this.Height; y++)
          if (this.Distant) {
            let e = x % 2;
            let d = y - 1;
            if (d > 2)
              if (d < 5) d = 2;
              else d -= 2;
            if (d < 0) {
              e = 0;
              d = 5;
            } else if (d > 4) {
              e = 1;
              d = 5;
            } else if (e < 1) {
              e = 0;
              if (d === 3) d = 3;
              else if (d > 0 && d < 3) d = 2;
            }
            level.SetBlock(x, y, 1 + e + (d + 4) * 8);
          } else {
            let e = x % 3;
            let d = y - 1;
            if (d > 2)
              if (d < 5) d = 2;
              else d -= 2;
            if (d < 0) {
              e = 1;
              d = 5;
            } else if (d > 4) {
              e = 2;
              d = 5;
            } else if (e < 2) {
              if (d === 4) {
                e = 2;
                d = 4;
              } else if (d > 0 && d < 4) {
                e = 4;
                d = -3;
              }
            }
            level.SetBlock(x, y, 1 + e + (d + 3) * 8);
          }
    }
  },
  BackgroundRenderer: class extends Enjine.Drawable {
    /**
     * 背景渲染器
     * @param {Level} level 等级
     * @param {Number} width 宽
     * @param {Number} tilesY Y坐标
     * @param {Number} distance 距离
     */
    constructor(level, width, tilesY, distance) {
      super();
      this.Level = level;
      this.Width = width;
      this.Distance = distance;
      this.TilesY = (tilesY / 32 | 0) + 1;
      this.Background = Mario.SpriteCuts.GetBackgroundSheet();
    }
    /**
     * 布局
     * @param {CanvasRenderingContext2D} ctx 
     * @param {Camera} camera 
     */
    Draw(ctx, camera) {
      let c = camera.X / this.Distance;
      for (let x = c / 32 | 0; x <= (c + this.Width) / 32 | 0; x++)
        for (let y = 0; y < this.TilesY; y++) {
          let level = this.Level.GetBlock(x, y) & 255;
          let block = this.Background[level % 8][level / 8 | 0];
          ctx.drawImage(Enjine.Resources.Images.background, block.X, block.Y, block.Width, block.Height, (x << 5) - c | 0, y << 5 | 0, block.Width, block.Height);
        }
    }
  },
  ImprovedNoise: class {
    constructor() {
      this.P = [];
      this.Shuffle();
    }
    /** 改组 */
    Shuffle() {
      let amounts = [];
      for (let i = 0; i < 256; i++)
        amounts[i] = i;
      for (let i = 0; i < 256; i++) {
        let random = (Math.random() * 255 | 0) + i;
        let amount = amounts[i];
        amounts[i] = amounts[random];
        amounts[random] = amount;
        this.P[i + 256] = this.P[i] = amounts[i];
      }
    }
    /**
     * 遍历噪音
     * @param {Number} x 
     * @param {Number} y 
     * @returns {Number}
     */
    PerlinNoise(x, y) {
      let sum = 0;
      for (let i = 0; i < 8; i++) {
        let size = 64 / (1 << i);
        sum += this.Noise(x / size, y / size, 128) / (1 << i);
      }
      return sum;
    }
    /**
     * 噪音设置
     * @param {Number} a 
     * @param {Number} b 
     * @param {Number} c 
     */
    Noise(a, b, c) {
      let e = (a | 0) & 255, d = (b | 0) & 255, f = (c | 0) & 255;
      a -= a | 0;
      b -= b | 0;
      c -= c | 0;
      let g = this.Fade(a),
        h = this.Fade(b),
        i = this.Fade(c),
        j = this.P[e] + d,
        k = this.P[j] + f;
      j = this.P[j + 1] + f;
      d = this.P[e + 1] + d;
      e = this.P[d] + f;
      f = this.P[d + 1] + f;
      return this.Lerp(i, this.Lerp(h, this.Lerp(g, this.Grad(this.P[k], a, b, c), this.Grad(this.P[e], a - 1, b, c)), this.Lerp(g, this.Grad(this.P[j], a, b - 1, c), this.Grad(this.P[f], a - 1, b - 1, c))), this.Lerp(h, this.Lerp(g, this.Grad(this.P[k + 1], a, b, c - 1), this.Grad(this.P[e + 1], a - 1, b, c - 1)), this.Lerp(g, this.Grad(this.P[j + 1], a, b - 1, c - 1), this.Grad(this.P[f + 1], a - 1, b - 1, c - 1))));
    }
    /**
     * 淡出
     * @param {Number} a 
     * @returns {Number}
     */
    Fade(a) {
      return a * a * a * (a * (a * 6 - 15) + 10);
    }
    /**
     * 
     * @param {Number} a 
     * @param {Number} b 
     * @param {Number} c 
     * @returns {Number}
     */
    Lerp(a, b, c) {
      return b + a * (c - b);
    }
    /**
     * 
     * @param {Number} a 
     * @param {Number} b 
     * @param {Number} c 
     * @param {Number} e 
     * @returns {Number}
     */
    Grad(a, b, c, e) {
      a &= 15;
      return ((a & 1) === 0 ? 1 : -1) * (a < 8 ? b : c) + ((a & 2) === 0 ? 1 : -1) * (a < 4 ? c : a === 12 || a === 14 ? b : e);
    }
  },
  NotchSprite,
  Character: class extends NotchSprite {
    constructor() {
      super(null);
      this.Fire = !1;
      this.Large = !1;
      this.Coins = 0;
      this.Lives = 3;
      this.LevelString = "none";
      this.AirInertia = this.GroundInertia = .89;
      this.Sliding = this.Ducking = this.MayJump = this.OnGround = this.WasOnGround = !1;
      this.YJumpSpeed = this.XJumpSpeed = this.JumpTime = 0;
      this.CanShoot = !1;
      this.Width = 4;
      this.Height = 24;
      this.NewFire = this.NewLarge = this.LastFire = this.LastLarge = !1;
    }
    /**
     * 初始化
     * @param {LevelState} World 
     */
    Initialize(World) {
      this.World = World;
      this.X = 32;
      this.RunTime = this.PowerUpTime = this.Y = 0;
      this.Sliding = this.Ducking = this.MayJump = this.OnGround = this.WasOnGround = !1;
      this.YJumpSpeed = this.XJumpSpeed = this.JumpTime = 0;
      this.CanShoot = !1;
      this.Width = 4;
      this.Height = 24;
      this.InvulnerableTime = this.WinTime = this.DeathTime = this.YDeathPos = this.XDeathPos = this.Facing = 0;
      this.Carried = null;
      this.SetLarge(this.Large, this.Fire);
    }
    /**
     * 变大
     * @param {Boolean} Large 
     * @param {Boolean} Fire 
     */
    SetLarge(Large, Fire) {
      Fire && (Large = !0);
      Large || (Fire = !1);
      this.LastLarge = this.Large;
      this.LastFire = this.Fire;
      this.Large = Large;
      this.Fire = Fire;
      this.NewLarge = this.Large;
      this.NewFire = this.Fire;
      this.Blink(!0);
    }
    /**
     * 闪光
     * @param {Boolean} isBlink 
     */
    Blink(isBlink) {
      this.Large = isBlink ? this.NewLarge : this.LastLarge;
      this.Fire = isBlink ? this.NewFire : this.LastFire;
      this.Image = this.Large ? this.Fire ? Enjine.Resources.Images.fireMario : Enjine.Resources.Images.mario : Enjine.Resources.Images.smallMario;
      this.XPicO = this.Large ? 16 : 8;
      this.YPicO = this.Large ? 31 : 15;
      this.PicWidth = this.PicHeight = this.Large ? 32 : 16;
    }
    // 移动
    Move() {
      if (this.WinTime > 0) {
        this.WinTime++;
        this.Ya = this.Xa = 0;
      } else if (this.DeathTime > 0) {
        if (++this.DeathTime < 11) this.Ya = this.Xa = 0;
        else if (this.DeathTime === 11) this.Ya = -15;
        else this.Ya += 2;
        this.X += this.Xa;
        this.Y += this.Ya;
      } else if (this.PowerUpTime !== 0) {
        this.PowerUpTime += this.PowerUpTime > 0 ? -1 : 1;
        this.Blink((((this.PowerUpTime > 0 ? 1 : -1) * this.PowerUpTime / 3 | 0) & 1) === 0);
        if (this.PowerUpTime === 0) this.World.Paused = !1;
        this.CalcPic();
      } else {
        this.InvulnerableTime > 0 && this.InvulnerableTime--;
        this.Visible = ((this.InvulerableTime / 2 | 0) & 1) === 0;
        this.WasOnGround = this.OnGround;
        let a = Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.A) ? 1.2 : .6;
        if (this.OnGround)
          this.Ducking = Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.DOWN) && this.Large;
        if (this.Xa > 2) this.Facing = 1;
        if (this.Xa < -2) this.Facing = -1;
        if (Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.S) || this.JumpTime < 0 && !this.OnGround && !this.Sliding) {
          if (this.JumpTime < 0) {
            this.Xa = this.XJumpSpeed;
            this.Ya = -this.JumpTime * this.YJumpSpeed;
            this.JumpTime++;
          } else if (this.OnGround && this.MayJump) {
            Enjine.Resources.PlaySound("jump");
            this.XJumpSpeed = 0;
            this.YJumpSpeed = -1.9;
            this.JumpTime = 7;
            this.Ya = this.JumpTime * this.YJumpSpeed;
            this.Sliding = this.OnGround = !1;
          } else if (this.Sliding && this.MayJump) {
            Enjine.Resources.PlaySound("jump");
            this.XJumpSpeed = -this.Facing * 6;
            this.YJumpSpeed = -2;
            this.JumpTime = -6;
            this.Xa = this.XJumpSpeed;
            this.Ya = -this.JumpTime * this.YJumpSpeed;
            this.Sliding = this.OnGround = !1;
            this.Facing *= -1;
          } else if (this.JumpTime > 0) {
            this.Xa += this.XJumpSpeed;
            this.Ya = this.JumpTime-- * this.YJumpSpeed;
          }
        } else this.JumpTime = 0;
        if (Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.LEFT) && !this.Ducking) {
          if (this.Facing === 1) this.Sliding = !1;
          this.Xa -= a;
          if (this.JumpTime >= 0) this.Facing = -1;
        }
        if (Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.RIGHT) && !this.Ducking) {
          if (this.Facing === -1) this.Sliding = !1;
          this.Xa += a;
          if (this.JumpTime >= 0) this.Facing = 1;
        }
        if (!Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.LEFT) && !Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.RIGHT) || this.Ducking || this.Ya < 0 || this.OnGround) this.Sliding = !1;
        if (Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.A) && this.CanShoot && this.Fire && this.World.FireballsOnScreen < 2) {
          Enjine.Resources.PlaySound("fireball");
          this.World.AddSprite(new Mario.Fireball(this.World, this.X + this.Facing * 6, this.Y - 20, this.Facing));
        }
        this.CanShoot = !Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.A);
        this.MayJump = (this.OnGround || this.Sliding) && !Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.S);
        this.XFlip = this.Facing === -1;
        this.RunTime += Math.abs(this.Xa) + 5;
        if (Math.abs(this.Xa) < .5) this.Xa = this.RunTime = 0;
        this.CalcPic();
        if (this.Sliding) {
          this.World.AddSprite(new Mario.Sparkle(
            this.World,
            (this.X + Math.random() * 4 - 2 | 0) + this.Facing * 8,
            (this.Y + Math.random() * 4 | 0) - 24,
            Math.random() * 2 - 1,
            Math.random(), 0, 1, 5
          ));
          this.Ya *= .5;
        }
        this.OnGround = !1;
        this.SubMove(this.Xa, 0);
        this.SubMove(0, this.Ya);
        if (this.Y > this.World.Level.Height * 16 + 16) this.Die();
        if (this.X < 0) this.Xa = this.X = 0;
        if (this.X > this.World.Level.ExitX * 16) this.Win();
        if (this.X > this.World.Level.Width * 16) {
          this.X = this.World.Level.Width * 16;
          this.Xa = 0;
        }
        this.Ya *= .85;
        this.Xa *= this.OnGround ? this.GroundInertia : this.AirInertia;
        if (!this.OnGround) this.Ya += 3;
        if (this.Carried !== null) {
          this.Carried.X *= this.X + this.Facing * 8;
          this.Carried.Y *= this.Y - 2;
          if (!Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.A)) {
            this.Carried.Release(this);
            this.Carried = null;
          }
        }
      }
    }
    // 计算图片属性
    CalcPic() {
      let a = (this.RunTime / 20 | 0) % (this.Large ? 4 : 2);
      if (this.Large && a === 3) a = 1;
      if (this.Carried === null && Math.abs(this.Xa) > 10) a += this.Large ? 3 : 2;
      if (this.Carried !== null) a += this.Large ? 10 : 8;
      if (!this.OnGround) a = this.Carried !== null ? this.Large ? 12 : 9 : this.Large ? Math.abs(this.Xa) > 10 ? 7 : 6 : Math.abs(this.Xa) > 10 ? 5 : 4;
      if (this.OnGround && (this.Facing === -1 && this.Xa > 0 || this.Facing === 1 && this.Xa < 0)) {
        if (this.Xa > 1 || this.Xa < -1)
          a = this.Large ? 9 : 7;
        if (this.Xa > 3 || this.Xa < -3)
          for (let i = 0; i < 3; i++)
            this.World.AddSprite(new Mario.Sparkle(this.World, this.X + Math.random() * 8 - 4 | 0, this.Y + Math.random() * 4 | 0, Math.random() * 2 - 1, Math.random() * -1, 0, 1, 5));
      }
      if (this.Large) {
        if (this.Ducking) a = 14;
        this.Height = this.Ducking ? 12 : 24;
      } else this.Height = 12;
      this.XPic = a;
    }
    /**
     * 接头移动
     * @param {Number} x1 
     * @param {Number} y1
     * @returns {Boolean} 
     */
    SubMove(x1, y1) {
      let bool = !1;
      while (x1 > 8) {
        if (!this.SubMove(8, 0)) return !1;
        x1 -= 8;
      }
      while (x1 < -8) {
        if (!this.SubMove(-8, 0)) return !1;
        x1 += 8;
      }
      while (y1 > 8) {
        if (!this.SubMove(0, 8)) return !1;
        y1 -= 8;
      }
      while (y1 < -8) {
        if (!this.SubMove(0, -8)) return !1;
        y1 += 8;
      }
      let x = this.X + x1;
      let y = this.Y + y1;
      if (y1 > 0 && (
        this.IsBlocking(x - this.Width, y, x1, 0) ||
        this.IsBlocking(x + this.Width, y, x1, 0) ||
        this.IsBlocking(x - this.Width, y + 1, x1, y1) ||
        this.IsBlocking(x + this.Width, y + 1, x1, y1)
      )) bool = !0;
      if (y1 < 0 && (
        this.IsBlocking(x, y - this.Height, x1, y1) || bool ||
        this.IsBlocking(x - this.Width, y - this.Height, x1, y1) || bool ||
        this.IsBlocking(x + this.Width, y - this.Height, x1, y1)
      )) bool = !0;
      if (x1 > 0) {
        this.Sliding = !0;
        if (
          this.IsBlocking(x + this.Width, y - this.Height, x1, y1) ||
          this.IsBlocking(x + this.Width, y - (this.Height / 2 | 0), x1, y1) ||
          this.IsBlocking(x + this.Width, y, x1, y1)
        ) bool = !0;
        else this.Sliding = !1;
      }
      if (x1 < 0) {
        this.Sliding = !0;
        if (
          this.IsBlocking(x - this.Width, y - this.Height, x1, y1) ||
          this.IsBlocking(x - this.Width, y - (this.Height / 2 | 0), x1, y1) ||
          this.IsBlocking(x - this.Width, y, x1, y1)
        ) bool = !0;
        else this.Sliding = !1;
      }
      if (bool) {
        if (x1 < 0) {
          this.X = ((this.X - this.Width) / 16 | 0) * 16 + this.Width;
          this.Xa = 0;
        } else if (x1 > 0) {
          this.X = ((this.X + this.Width) / 16 + 1 | 0) * 16 - this.Width - 1;
          this.Xa = 0;
        }
        if (y1 < 0) {
          this.Y = ((this.Y - this.Height) / 16 | 0) * 16 + this.Height;
          this.Ya = this.JumpTime = 0;
        } else if (y1 > 0) {
          this.Y = ((this.Y - 1) / 16 + 1 | 0) * 16 - 1;
          this.OnGround = !0;
        }
        return !1;
      } else {
        this.X += x1;
        this.Y += y1;
        return !0;
      }
    }
    /**
     * 判断阻隔
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} x1 
     * @param {Number} y1 
     * @returns {Number}
     */
    IsBlocking(x, y, x1, y1) {
      x = x / 16 | 0;
      y = y / 16 | 0;
      if (x === (this.X / 16 | 0) && y === (this.Y / 16 | 0))
        return !1;
      let d = this.World.Level.GetBlock(x, y);
      if ((Mario.Tile.Behaviors[d & 255] & Mario.Tile.PickUpable) > 0) {
        this.GetCoin();
        Enjine.Resources.PlaySound("coin");
        this.World.Level.SetBlock(x, y, 0);
        for (let i = 0; i < 2; i++)
          for (let j = 0; j < 2; j++)
            this.World.AddSprite(new Mario.Sparkle(
              this.World,
              x * 16 + i * 8 + (Math.random() * 8 | 0),
              y * 16 + j * 8 + (Math.random() * 8 | 0),
              0, 0, 0, 2, 5
            ));
      }
      if ((d = this.World.Level.IsBlocking(x, y, x1, y1)) && y1 < 0) this.World.Bump(x, y, this.Large);
      return d;
    }
    /**
     * 踩踏
     * @param {Shell} shell 
     */
    Stomp(shell) {
      let b = 0;
      if (!(this.DeathTime > 0 || this.World.Paused)) {
        b = shell.Y - shell.Height / 2;
        this.SubMove(0, b - this.Y);
        if (shell instanceof Mario.Enemy || shell instanceof Mario.BulletBill) {
          Enjine.Resources.PlaySound("kick");
          this.XJumpSpeed = 0;
          this.YJumpSpeed = -1.9;
          this.JumpTime = 8;
          this.Ya = this.JumpTime * this.YJumpSpeed;
          this.Sliding = this.OnGround = !1;
          this.InvulnerableTime = 1;
        } else if (shell instanceof Mario.Shell) {
          if (Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.A) && shell.Facing === 0) {
            this.Carried = shell;
            shell.Carried = !0;
          } else {
            Enjine.Resources.PlaySound("kick");
            this.XJumpSpeed = 0;
            this.YJumpSpeed = -1.9;
            this.JumpTime = 8;
            this.Ya = this.JumpTime * this.YJumpSpeed;
            this.Sliding = this.OnGround = !1;
            this.InvulnerableTime = 1;
          }
        }
      }
    }
    /** 获取伤害 */
    GetHurt() {
      if (!(this.DeathTime > 0 || this.World.Paused) && !(this.InvulnerableTime > 0))
        if (this.Large) {
          this.World.Paused = !0;
          this.PowerUpTime = -18;
          Enjine.Resources.PlaySound("powerdown");
          this.SetLarge(!!this.Fire, !1);
          this.InvulnerableTime = 32;
        } else this.Die();
    }
    /** 胜利 */
    Win() {
      this.XDeathPos = this.X | 0;
      this.YDeathPos = this.Y | 0;
      this.World.Paused = !0;
      this.WinTime = 1;
      Enjine.Resources.PlaySound("exit");
    }
    /** 失败 */
    Die() {
      this.XDeathPos = this.X | 0;
      this.YDeathPos = this.Y | 0;
      this.World.Paused = !0;
      this.DeathTime = 1;
      Enjine.Resources.PlaySound("death");
      this.SetLarge(!1, !1);
    }
    /** 获取花朵 */
    GetFlower() {
      this.GetProps(this.Fire, !0);
    }
    /** 获取蘑菇 */
    GetMushroom() {
      this.GetProps(this.Large, !1);
    }
    /**
     * 获取道具
     * @param {Boolean} skills 技能
     * @param {Boolean} isFire 火球术
     */
    GetProps(skills, isFire) {
      if (!(this.DeathTime > 0 && this.World.Paused))
        if (skills) {
          this.GetCoin();
          Enjine.Resources.PlaySound("coin");
        } else {
          this.World.Paused = !0;
          this.PowerUpTime = 18;
          Enjine.Resources.PlaySound("powerup");
          this.SetLarge(!0, isFire);
        }
    }
    /**
     * 踢
     * @param {Shell} shell 
     */
    Kick(shell) {
      if (!(this.DeathTime > 0 && this.World.Paused))
        if (Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.A)) {
          this.Carried = shell;
          shell.Carried = !0;
        } else {
          Enjine.Resources.PlaySound("kick");
          this.InvulnerableTime = 1;
        }
    }
    /** 升级 */
    Get1Up() {
      Enjine.Resources.PlaySound("1up");
      this.Lives = Math.min(++this.Lives, 99);
    }
    /** 获取金币 */
    GetCoin() {
      if (++this.Coins === 100) {
        this.Coins = 0;
        this.Get1Up();
      }
    }
  },
  LevelRenderer: class extends Enjine.Drawable {
    /**
     * 等级渲染器
     * @param {Number} level 
     * @param {Number} width 
     * @param {Number} height 
     */
    constructor(level, width, height) {
      super();
      this.Width = width;
      this.Height = height;
      this.Level = level;
      this.TilesY = (height / 16 | 0) + 1;
      this.AnimTime = 0;
      this.Bounce = 0;
      this.Tick = 0;
      this.Delta = 0;
      this.Background = Mario.SpriteCuts.GetLevelSheet();
    }
    /**
     * 更新
     * @param {Number} time 
     */
    Update(time) {
      this.AnimTime += time;
      this.Tick = this.AnimTime | 0;
      this.Bounce += time * 30;
      this.Delta = time;
    }
    /**
     * 布局
     * @param {CanvasRenderingContext2D} ctx 
     * @param {Shell} shell 
     */
    Draw(ctx, shell) {
      this.DrawStatic(ctx, shell);
      this.DrawDynamic(ctx, shell);
    }
    /**
     * 静态布局
     * @param {CanvasRenderingContext2D} ctx 
     * @param {Shell} shell 
     */
    DrawStatic(ctx, shell) {
      for (let x = shell.X / 16 | 0; x < ((shell.X + this.Width) / 16 | 0) + 1; x++)
        for (let y = 0; y < this.TilesY; y++) {
          let level = this.Level.GetBlock(x, y) & 255;
          if ((Mario.Tile.Behaviors[level] & Mario.Tile.Animated) === 0) {
            level = this.Background[level % 16][level / 16 | 0];
            ctx.drawImage(Enjine.Resources.Images.map, level.X, level.Y, level.Width, level.Height, (x << 4) - shell.X | 0, y << 4 | 0, level.Width, level.Height);
          }
        }
    }
    /**
     * 动态布局
     * @param {CanvasRenderingContext2D} ctx 
     * @param {Shell} shell 
     */
    DrawDynamic(ctx, shell) {
      for (let x = shell.X / 16 | 0; x <= (shell.X + this.Width) / 16 | 0; x++)
        for (let y = shell.Y / 16 | 0; y <= (shell.Y + this.Height) / 16 | 0; y++) {
          let level = this.Level.GetBlock(x, y);
          if ((Mario.Tile.Behaviors[level & 255] & Mario.Tile.Animated) > 0) {
            let bounce = (this.Bounce / 3 | 0) % 4;
            if ((level % 16 / 4 | 0) === 0 && (level / 16 | 0) === 1) {
              bounce = (this.Bounce / 2 + (x + y) / 8 | 0) % 20;
              if (bounce > 3) bounce = 0;
            }
            if ((level % 16 / 4 | 0) === 3 && (level / 16 | 0) === 0) bounce = 2;
            let g = 0;
            if (x >= 0 && y >= 0 && x < this.Level.Width && y < this.Level.Height) g = this.Level.Data[x][y];
            if (g > 0) g = Math.sin((g - this.Delta) / 4 * Math.PI) * 8 | 0;
            level = this.Background[(level % 16 / 4 | 0) * 4 + bounce][level / 16 | 0];
            ctx.drawImage(Enjine.Resources.Images.map, level.X, level.Y, level.Width, level.Height, (x << 4) - shell.X, (y << 4) - shell.Y - g, level.Width, level.Height);
          }
        }
    }
    /**
     * 布局出口0
     * @param {CanvasRenderingContext2D} ctx 
     * @param {Shell} shell 
     * @param {boolean} bool 
     */
    DrawExit0(ctx, shell, bool) {
      for (let y = this.Level.ExitY - 8; y < this.Level.ExitY; y++) {
        let bgc = this.Background[12][y === this.Level.ExitY - 8 ? 4 : 5];
        ctx.drawImage(Enjine.Resources.Images.map, bgc.X, bgc.Y, bgc.Width, bgc.Height, (this.Level.ExitX << 4) - shell.X - 16, (y << 4) - shell.Y, bgc.Width, bgc.Height);
      }
      if (bool) {
        let y = this.Level.ExitY * 16 - 48 - Math.sin(this.AnimTime) * 48 - 8;
        let bgc = this.Background[12][3];
        ctx.drawImage(Enjine.Resources.Images.map, bgc.X, bgc.Y, bgc.Width, bgc.Height, (this.Level.ExitX << 4) - shell.X - 16, y - shell.Y, bgc.Width, bgc.Height);
        bgc = this.Background[13][3];
        ctx.drawImage(Enjine.Resources.Images.map, bgc.X, bgc.Y, bgc.Width, bgc.Height, (this.Level.ExitX << 4) - shell.X, y - shell.Y, bgc.Width, bgc.Height);
      }
    }
    /**
     * 布局出口1
     * @param {CanvasRenderingContext2D} ctx 
     * @param {Enjine["Camera"]} camera 
     */
    DrawExit1(ctx, camera) {
      for (let y = this.Level.ExitY - 8; y < this.Level.ExitY; y++) {
        let bgc = this.Background[13][y === this.Level.ExitY - 8 ? 4 : 5];
        ctx.drawImage(Enjine.Resources.Images.map, bgc.X, bgc.Y, bgc.Width, bgc.Height, (this.Level.ExitX << 4) - camera.X + 16, (y << 4) - camera.Y, bgc.Width, bgc.Height);
      }
    };
  },
  LevelGenerator: class {
    /**
     * 关卡发生器
     * @param {Number} width 
     * @param {Number} height 
     */
    constructor(width, height) {
      this.Width = width;
      this.Height = height;
      this.Odds = [0];
      this.TotalOdds = 0;
    }
    /**
     * 建立新关卡
     * @param {Number} type 
     * @param {Number} difficulty 
     */
    CreateLevel(type, difficulty) {
      this.Type = type;
      this.Difficulty = difficulty;
      this.Odds[Mario.Odds.Straight] = 20;
      this.Odds[Mario.Odds.HillStraight] = 10;
      this.Odds[Mario.Odds.Tubes] = 2 + difficulty;
      this.Odds[Mario.Odds.Jump] = 2 * difficulty;
      this.Odds[Mario.Odds.Cannon] = -10 + 5 * difficulty;
      this.Type !== Mario.LevelType.Overground && (this.Odds[Mario.Odds.HillStraight] = 0);
      this.Odds.forEach(odd => {
        odd = Math.max(odd, 0);
        this.TotalOdds += odd;
        odd = this.TotalOdds - odd;
      });
      let level = new Mario.Level(this.Width, this.Height);
      let e = this.BuildStraight(level, 0, level.Width, !0);
      while (e < level.Width - 64)
        e += this.BuildZone(level, e, level.Width - e);
      let c = this.Height - 1 - Math.random() * 4 | 0;
      level.ExitX = e + 8;
      level.ExitY = c;
      for (let x = e; x < level.Width; x++)
        for (let y = 0; y < this.Height; y++)
          if (y >= c) level.SetBlock(x, y, 145);
      if (type === Mario.LevelType.Castle || type === Mario.LevelType.Underground) {
        let g = 0, h = 0;
        for (let d = 0; d < level.Width; d++) {
          if (h-- <= 0 && d > 4) {
            g = Math.random() * 4 | 0;
            h = (Math.random() * 4 | 0) + 4;
          }
          for (let h = 0; h < level.Height; h++)
            if (d > 4 && h <= g || d < 1) level.SetBlock(d, h, 145);
        }
      }
      this.FixWalls(level);
      return level;
    }
    /**
     * 建立区域
     * @param {Level} level 
     * @param {Number} w 
     * @param {Number} h 
     */
    BuildZone(level, w, h) {
      let e = Math.random() * this.TotalOdds | 0, d = 0;
      this.Odds.forEach((odd, index) => odd <= e && (d = index));
      let { Straight, HillStraight, Tubes, Jump, Cannons } = Mario.Odds;
      switch (d) {
        case Straight: return this.BuildStraight(level, w, h, !1);
        case HillStraight: return this.BuildHillStraight(level, w, h);
        case Tubes: return this.BuildTubes(level, w, h);
        case Jump: return this.BuildJump(level, w, h);
        case Cannons: return this.BuildCannons(level, w, h);
      } return 0;
    }
    /**
     * 构建跳跃
     * @param {Level} level 
     * @param {Number} b 
     */
    BuildJump(level, b) {
      let c = (Math.random() * 4 | 0) + 2,
        e = c * 2 + ((Math.random() * 2 | 0) + 2),
        h = this.Height - 1 - (Math.random() * 4 | 0);
      for (let d = b; d < b + e; d++)
        if (d < b + c || d > b + e - c - 1)
          for (let i = 0; i < this.Height; i++)
            if (i >= h) level.SetBlock(d, i, 145);
            else if ((Math.random() * 3 | 0) === 0 && i >= h - (d < b + c ? d - b : b + e - d) + 1) level.SetBlock(d, i, 9);
      return e;
    }
    /**
     * 构建大炮
     * @param {Level} level 
     * @param {Number} w 
     * @param {Number} h 
     */
    BuildCannons(level, w, h) {
      alert("cannons");
      let e = (Math.random() * 10 | 0) + 2, d = this.Height - 1 - Math.random() * 4 | 0, f = w + 1 + Math.random() * 4 | 0;
      e = Math.min(e, h);
      for (let i = w; i < w + e; i++) {
        x > f && (f += 2 * Math.random() * 4 | 0);
        f === w + e - 1 && (f += 10);
        let x = d - (Math.random() * 4 | 0) - 1;
        for (let y = 0; y < this.Height; y++)
          if (y >= d) level.SetBlock(x, y, 145);
          else if (x === f && y >= x) level.SetBlock(x, y, y === x ? 14 : y === x + 1 ? 30 : 46);
      }
      return e;
    }
    /**
     * 建立山直
     * @param {Level} level 
     * @param {Number} w 
     * @param {Number} h 
     * @returns {Number}
     */
    BuildHillStraight(level, w, h) {
      let e = (Math.random() * 10 | 0) + 10, d = this.Height - 1 - Math.random() * 4 | 0, i = !0, l = [];
      e = Math.min(e, h);
      for (let x = w; x < w + e; x++)
        for (let y = 0; y < this.Height; y++)
          y >= d && level.SetBlock(x, y, 145);
      for (this.AddEnemyLine(level, w + 1, w + e - 1, d - 1); i;) {
        h = h - 2 - Math.random() * 3 | 0;
        if (h <= 0) i = !1;
        else {
          let j = (Math.random() * 5 | 0) + 3;
          let k = (Math.random() * (e - j - 2) | 0) + w + 1;
          if (l[k - w] || l[k - w + j] || l[k - w - 1] || l[k - w + j + 1]) i = !1;
          else {
            l[k - w] = !0;
            l[k - w + j] = !0;
            this.AddEnemyLine(level, k, k + j, h - 1);
            if ((Math.random() * 4 | 0) === 0) {
              this.Decorate(level, k - 1, k + j + 1, h);
              i = !1;
            }
            for (let x = k; x < k + j; x++)
              for (let y = h; y < d; y++) {
                switch (level.GetBlock(x, y)) {
                  case 0: level.SetBlock(x, y, (x === k ? 4 : x === k + j - 1 ? 6 : 5) + (y === h ? 8 : 9) * 16); break;
                  case 132: level.SetBlock(x, y, 180); break;
                  case 134: level.SetBlock(x, y, 182); break;
                }
              }
          }
        }
      }
      return e;
    }
    /**
     * 
     * @param {Level} level 
     * @param {Number} b 
     * @param {Number} c 
     * @param {Number} y 
     */
    AddEnemyLine(level, b, c, y) {
      for (let x = b; x < c; x++)
        if ((Math.random() * 35 | 0) < this.Difficulty + 1) {
          let f = Math.random() * 4 | 0;
          if (this.Difficulty < 1) f = Mario.Enemy.Goomba;
          else if (this.Difficulty < 3) f = Math.random() * 3 | 0;
          level.SetSpriteTemplate(x, y, new Mario.SpriteTemplate(f, (Math.random() * 35 | 0) < this.Difficulty));
        }
    }
    /**
     * 
     * @param {Level} level 
     * @param {Number} b 
     * @param {Number} c 
     */
    BuildTubes(level, b, c) {
      let e = (Math.random() * 10 | 0) + 5,
        d = this.Height - 1 - Math.random() * 4 | 0,
        f = b + 1 + Math.random() * 4 | 0,
        g = d - (Math.random() * 2 | 0) - 2;
      e = Math.min(e, c);
      for (let x = b; x < b + e; x++) {
        if (x > f + 1) {
          f += 3 + (Math.random() * 4 | 0);
          g = d - (Math.random() * 2 | 0) - 2;
        }
        if (f >= b + e - 2) f += 10;
        if (x === f && (Math.random() * 11 | 0) < this.Difficulty + 1) level.SetSpriteTemplate(x, g, new Mario.SpriteTemplate(Mario.Enemy.Flower, !1));
        for (let y = 0; y < this.Height; y++)
          if (y >= d) level.SetBlock(x, y, 145);
          else if ((x === f || x === f + 1) && y >= g) {
            let j = 10 + x - f;
            level.SetBlock(x, y, j + (y === g ? 0 : 16));
          }
      }
      return e;
    }
    /**
     * 建立直线
     * @param {Level} level 
     * @param {Number} w 
     * @param {Number} h 
     * @param {boolean} bool 
     */
    BuildStraight(level, w, h, bool) {
      let ran = (Math.random() * 10 | 0) + 2, height = this.Height - 1 - (Math.random() * 4 | 0);
      if (bool) ran = 10 + (Math.random() * 5 | 0);
      ran = Math.min(ran, h);
      for (let x = w; x < w + ran; x++)
        for (let y = 0; y < this.Height; y++)
          if (y >= height) level.SetBlock(x, y, 145);
      if (bool || ran > 5) this.Decorate(level, w, w + ran, height);
      return ran;
    }
    /**
     * 
     * @param {Level} level 
     * @param {Number} w 
     * @param {Number} h 
     * @param {Number} y 
     */
    Decorate(level, w, h, y) {
      if (!(y < 1)) {
        let d = Math.random() * 4 | 0, f = Math.random() * 4 | 0;
        this.AddEnemyLine(level, w + 1, h - 1, y - 1);
        if (y - 2 > 0 && h - 1 - f - (w + 1 + d) > 1)
          for (let x = w + 1 + d; x < h - 1 - f; x++)
            level.SetBlock(x, y - 2, 34);
        d = Math.random() * 4 | 0;
        f = Math.random() * 4 | 0;
        if (y - 4 > 0 && h - 1 - f - (w + 1 + d) > 2)
          for (let x = w + 1 + d; x < h - 1 - f; x++)
            level.SetBlock(x, y - 4, x !== w + 1 && x !== h - 2 && (Math.random() * 3 | 0) === 0
              ? (Math.random() * 4 | 0) === 0
                ? 22
                : 21
              : (Math.random() * 4 | 0) === 0
                ? (Math.random() * 4 | 0) === 0
                  ? 18
                  : 17
                : 16
            );
      }
    }
    /**
     * 
     * @param {Level} level 
     */
    FixWalls(level) {
      let b = [[!1]];
      for (let w = 0; w < this.Width + 1; w++) {
        b[w] = [];
        for (let h = 0; h < this.Height + 1; h++) {
          let key = 0;
          for (let x = w - 1; x < w + 1; x++)
            for (let y = h - 1; y < h + 1; y++)
              if (level.GetBlockCapped(x, y) === 145) key++;
          b[w][h] = key === 4;
        }
      }
      this.Blockify(level, b, this.Width + 1, this.Height + 1);
    }
    /**
     * 
     * @param {Level} level 
     * @param {Boolean[][]} b 
     * @param {Number} W 
     * @param {Number} H 
     */
    Blockify(level, b, W, H) {
      let d = 0, f = [[!1]];
      for (let i = 0; i < 2; i++)
        f[i] = [];
      if (this.Type === Mario.LevelType.Castle) d = 8;
      else if (this.Type === Mario.LevelType.Underground) d = 12;
      for (let w = 0; w < W; w++)
        for (let h = 0; h < H; h++) {
          for (let i = w; i <= w + 1; i++)
            for (let j = h; j <= h + 1; j++)
              f[i - w][j - h] = b[Math.min(Math.max(i, 0), W - 1)][Math.min(Math.max(j, 0), H - 1)];
          switch (f[0][0]) {
            case f[1][0]:
              if (f[0][1] === f[1][1]) {
                if (f[0][0] === f[0][1]) f[0][0] && level.SetBlock(w, h, 145 + d);
                else level.SetBlock(w, h, (f[0][0] ? 161 : 129) + d);
              } else level.SetBlock(w, h, (f[0][0] ? f[0][1] ? 163 : 179 : f[0][1] ? 130 : 128) + d);
              break;
            case f[0][1]: if (f[1][0] === f[1][1]) level.SetBlock(w, h, (f[0][0] ? 146 : 144) + d); break;
            case f[1][1]: if (f[0][1] === f[1][0]) level.SetBlock(w, h, 145 + d); break;
            default:
              level.SetBlock(w, h, f[0][1] === f[1][1] ? (f[0][1] ? f[0][0] ? 147 : 131 : f[0][0] ? 162 : 160) + d : 1 + 16 * d);
          }
        }
    }
  },
  SpriteTemplate: class {
    /**
     * 
     * @param {StyleSheet} type 
     * @param {Boolean} winged 
     */
    constructor(type, winged) {
      this.Type = type;
      this.Winged = winged;
      this.LastVisibleTick = -1;
      this.IsDead = !1;
      this.Sprite = null;
    }
    /**
     * 
     * @param {LevelState} world 
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} facing 
     */
    Spawn(world, x, y, facing) {
      if (!this.IsDead) {
        this.Sprite = this.Type === Mario.Enemy.Flower
          ? new Mario.FlowerEnemy(world, x * 16 + 15, y * 16 + 24)
          : new Mario.Enemy(world, x * 16 + 8, y * 16 + 15, facing, this.Type, this.Winged);
        this.Sprite.SpriteTemplate = this;
        world.AddSprite(this.Sprite);
      }
    }
  },
  Enemy,
  Fireball,
  Sparkle: class extends NotchSprite {
    /**
     * 
     * @param {LevelState} world 
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} xa 
     * @param {Number} ya 
     */
    constructor(world, x, y, xa, ya) {
      super();
      this.World = world;
      this.X = x;
      this.Y = y;
      this.Xa = xa;
      this.Ya = ya;
      this.XPic = Math.random() * 2 | 0;
      this.YPic = 0;
      this.Life = 10 + (Math.random() * 5 | 0);
      this.XPicStart = this.XPic;
      this.YPicO = this.XPicO = 4;
      this.PicHeight = this.PicWidth = 8;
      this.Image = Enjine.Resources.Images.particles;
    }
    Move() {
      this.XPic = this.Life > 10 ? 7 : this.XPicStart + (10 - this.Life) * .4 | 0;
      this.Life-- < 0 && this.World.RemoveSprite(this);
      this.X += this.Xa;
      this.Y += this.Ya;
    }
  },
  CoinAnim: class extends NotchSprite {
    /**
     * 
     * @param {LevelState} world 
     * @param {Number} x 
     * @param {Number} y 
     */
    constructor(world, x, y) {
      super();
      this.World = world;
      this.Life = 10;
      this.Image = Enjine.Resources.Images.map;
      this.PicWidth = this.PicHeight = 16;
      this.X = x * 16;
      this.Y = (y - 1) * 16;
      this.Xa = 0;
      this.Ya = -6;
      this.XPic = 0;
      this.YPic = 2;
    }
    Move() {
      if (this.Life-- < 0) {
        this.World.RemoveSprite(this);
        for (let x = 0; x < 2; x++)
          for (let y = 0; y < 2; y++)
            this.World.AddSprite(new Mario.Sparkle(
              this.World,
              this.X + x * 8 + Math.random() * 8 | 0,
              this.Y + y * 8 + Math.random() * 8 | 0,
              0, 0, 0, 2, 5
            ));
      }
      this.XPic = this.Life & 3;
      this.X += this.Xa;
      this.Y += this.Ya;
      this.Ya += 1;
    }
  },
  Mushroom: class extends NotchSprite {
    /**
     * 
     * @param {LevelState} world 
     * @param {Number} x 
     * @param {Number} y 
     */
    constructor(world, x, y) {
      super();
      this.RunTime = 0;
      this.AirInertia = this.GroundInertia = .89;
      this.OnGround = !1;
      this.Width = 4;
      this.Height = 24;
      this.World = world;
      this.X = x;
      this.Y = y;
      this.Image = Enjine.Resources.Images.items;
      this.XPicO = 8;
      this.YPicO = 15;
      this.YPic = 0;
      this.Height = 12;
      this.Facing = 1;
      this.PicWidth = this.PicHeight = 16;
      this.Life = 0;
    }
    CollideCheck() {
      let w = Mario.Character.X - this.X, h = Mario.Character.Y - this.Y;
      if (w > -16 && w < 16 && h > -this.Height && h < Mario.Character.Height) {
        Mario.Character.GetMushroom();
        this.World.RemoveSprite(this);
      }
    }
    Move() {
      if (this.Life < 9) {
        this.Layer = 0;
        this.Y--;
        this.Life++;
      } else {
        this.Layer = 1;
        if (this.Xa > 2)
          this.Facing = 1;
        if (this.Xa < -2)
          this.Facing = -1;
        this.Xa = this.Facing * 1.75;
        this.XFlip = this.Facing === -1;
        this.RunTime += Math.abs(this.Xa) + 5;
        if (!this.SubMove(this.Xa, 0))
          this.Facing *= -1;
        this.OnGround = !1;
        this.SubMove(0, this.Ya);
        this.Ya *= .85;
        this.Xa *= this.OnGround ? this.GroundInertia : this.AirInertia;
        this.OnGround || (this.Ya += 2);
      }
    }
    /**
     * 
     * @param {Number} X 
     * @param {Number} Y 
     * @returns {Boolean}
     */
    SubMove(X, Y) {
      let bool = !1;
      while (X > 8) {
        if (!this.SubMove(8, 0)) return !1;
        X -= 8;
      }
      while (X < -8) {
        if (!this.SubMove(-8, 0)) return !1;
        X += 8;
      }
      while (Y > 8) {
        if (!this.SubMove(0, 8)) return !1;
        Y -= 8;
      }
      while (Y < -8) {
        if (!this.SubMove(0, -8)) return !1;
        Y += 8;
      }
      let x = this.X + X;
      let y = this.Y + Y;
      let { Width: w, Height: h } = this;
      if (Y > 0 && (
        this.IsBlocking(x - w, y + 0, X, 0) ||
        this.IsBlocking(x + w, y + 0, X, 0) ||
        this.IsBlocking(x - w, y + 1, X, Y) ||
        this.IsBlocking(x + w, y + 1, X, Y)
      )) bool = !0;
      if (Y < 0 && (
        this.IsBlocking(x + 0, y - h, X, Y) || bool ||
        this.IsBlocking(x - w, y - h, X, Y) || bool ||
        this.IsBlocking(x + w, y - h, X, Y)
      )) bool = !0;
      if (X > 0 && (
        this.IsBlocking(x + w, y - h, X, Y) ||
        this.IsBlocking(x + w, y - (h / 2 | 0), X, Y) ||
        this.IsBlocking(x + w, y + 0, X, Y)
      )) bool = !0;
      if (X < 0 && (
        this.IsBlocking(x - w, y - h, X, Y) ||
        this.IsBlocking(x - w, y - (h / 2 | 0), X, Y) ||
        this.IsBlocking(x - w, y + 0, X, Y)
      )) bool = !0;
      if (bool) {
        if (X < 0) {
          this.X = ((this.X - w) / 16 + 0 | 0) * 16 + w + 0;
          this.Xa = 0;
        } else if (X > 0) {
          this.X = ((this.X + w) / 16 + 1 | 0) * 16 - w - 1;
          this.Xa = 0;
        }
        if (Y < 0) {
          this.Y = ((this.Y - h) / 16 + 0 | 0) * 16 + h + 0;
          this.Ya = this.JumpTime = 0;
        } else if (Y > 0) {
          this.Y = ((this.Y - 1) / 16 + 1 | 0) * 16 + 0 - 1;
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
     * 
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} ele 
     * @param {Number} e 
     */
    IsBlocking(x, y, ele, e) {
      x = x / 16 | 0;
      y = y / 16 | 0;
      if (x === this.X / 16 | 0 && y === this.Y / 16 | 0)
        return !1;
      return this.World.Level.IsBlocking(x, y, ele, e);
    }
    /**
     * 
     * @param {Number} w 
     * @param {Number} h 
     */
    BumpCheck(w, h) {
      if (this.X + this.Width > w * 16 && this.X - this.Width < w * 16 - 16 && h === (h - 1) / 16 | 0) {
        this.Facing = -Mario.Character.Facing;
        this.Ya = -10;
      }
    }
  },
  Particle: class extends NotchSprite {
    /**
     * 
     * @param {LevelState} world 
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} Xa 
     * @param {Number} Ya 
     */
    constructor(world, x, y, Xa, Ya) {
      super();
      this.World = world;
      this.X = x;
      this.Y = y;
      this.Xa = Xa;
      this.Ya = Ya;
      this.XPic = Math.random() * 2 | 0;
      this.YPic = 0;
      this.YPicO = this.XPicO = 4;
      this.PicHeight = this.PicWidth = 8;
      this.Life = 10;
      this.Image = Enjine.Resources.Images.particles;
    }
    Move() {
      if (this.Life - this.Delta < 0) this.World.RemoveSprite(this);
      this.Life -= this.Delta;
      this.X += this.Xa;
      this.Y += this.Ya;
      this.Ya *= .95;
      this.Ya += 3;
    }
  },
  FireFlower: class extends NotchSprite {
    /**
     * 
     * @param {LevelState} world 
     * @param {Number} x 
     * @param {Number} y 
     */
    constructor(world, x, y) {
      super();
      this.Width = 4;
      this.Height = 24;
      this.World = world;
      this.X = x;
      this.Y = y;
      this.Image = Enjine.Resources.Images.items;
      this.XPicO = 8;
      this.YPicO = 15;
      this.XPic = 1;
      this.YPic = 0;
      this.Height = 12;
      this.Facing = 1;
      this.PicWidth = this.PicHeight = 16;
      this.Life = 0;
    }
    CollideCheck() {
      let x = Mario.Character.X - this.X, y = Mario.Character.Y - this.Y;
      if (x > -16 && x < 16 && y > -this.Height && y < Mario.Character.Height) {
        Mario.Character.GetFlower();
        this.World.RemoveSprite(this);
      }
    }
    Move() {
      if (this.Life < 9) {
        this.Layer = 0;
        this.Y--;
        this.Life++;
      }
    }
  },
  BulletBill: class extends NotchSprite {
    constructor(world, x, y, facing) {
      super();
      this.Image = Enjine.Resources.Images.enemies;
      this.World = world;
      this.X = x;
      this.Y = y;
      this.Facing = facing;
      this.XPicO = 8;
      this.YPicO = 31;
      this.Height = 12;
      this.Width = 4;
      this.PicWidth = 16;
      this.YPic = 5;
      this.XPic = 0;
      this.Ya = -5;
      this.DeadTime = 0;
      this.Dead = !1;
      this.Anim = 0;
    }
    CollideCheck() {
      if (!this.Dead) {
        let x = Mario.Character.X - this.X, y = Mario.Character.Y - this.Y;
        if (x > -16 && x < 16 && y > -this.Height && y < this.World.Mario.Height)
          if (Mario.Character.Y > 0 && y <= 0 && (!Mario.Character.OnGround || !Mario.Character.WasOnGround)) {
            Mario.Character.Stomp(this);
            this.Dead = !0;
            this.Xa = 0;
            this.Ya = 1;
            this.DeadTime = 100;
          } else Mario.Character.GetHurt();
      }
    }
    Move() {
      if (this.DeadTime > 0) {
        if (--this.DeadTime === 0) {
          this.DeadTime = 1;
          for (let i = 0; i < 8; i++)
            this.World.AddSprite(new Mario.Sparkle(
              (this.X + Math.random() * 16 - 8 | 0) + 4,
              (this.Y + Math.random() * 8 | 0) + 4,
              Math.random() * 2 - 1,
              Math.random() * -1,
              0,
              1,
              5
            ));
          this.World.RemoveSprite(this);
        }
        this.X += this.Xa;
        this.Y += this.Ya;
        this.Ya *= .95;
        this.Ya += 1;
      }
      else {
        this.Xa = this.Facing * 4;
        this.XFlip = this.Facing === -1;
        this.Move(this.Xa, 0);
      }
    }
    /**
     * 
     * @param {Number} a 
     */
    SubMove(a) {
      this.X += a;
      return !0;
    }
    /**
     * 
     * @param {Fireball} fireball 
     */
    FireballCollideCheck(fireball) {
      if (this.DeadTime !== 0)
        return !1;
      let x = fireball.X - this.X, y = fireball.Y - this.Y;
      if (x > -16 && x < 16 && y > -this.Height && y < fireball.Height)
        return !0;
      return !1;
    }
    /**
     * 
     * @param {Fireball} fireball 
     */
    ShellCollideCheck(fireball) {
      if (this.DeadTime !== 0)
        return !1;
      let x = fireball.X - this.X, y = fireball.Y - this.Y;
      if (x > -16 && x < 16 && y > -this.Height && y < fireball.Height)
        return Enjine.Resources.PlaySound("kick"), this.Dead = !0, this.Xa = 0, this.Ya = 1, this.DeadTime = 100, !0;
      return !1;
    };
  },
  FlowerEnemy: class extends Enemy {
    /**
     * 
     * @param {LevelState} world 
     * @param {Number} x 
     * @param {Number} y 
     */
    constructor(world, x, y) {
      super(world, x, y);
      this.Image = Enjine.Resources.Images.enemies;
      this.Facing = 1;
      this.Type = Mario.Enemy.Spiky;
      this.NoFireballDeath = this.Winged = !1;
      this.XPic = 0;
      this.YPic = 6;
      this.YPicO = 24;
      this.Height = 12;
      this.Width = 2;
      this.YStart = y;
      this.Ya = -8;
      this.Y -= 1;
      for (let n = this.Tick = this.JumpTime = this.Layer = 0; n < 4; n++)
        this.Move();
    }
    Move() {
      if (this.DeadTime > 0) {
        if (--this.DeadTime === 0) {
          this.DeadTime = 1;
          for (let n = 0; n < 8; n++)
            this.World.AddSprite(new Mario.Sparkle(
              (this.X + Math.random() * 16 - 8 | 0) + 4,
              (this.Y + Math.random() * 8 | 0) + 4,
              Math.random() * 2 - 1,
              Math.random() * -1,
              0,
              1,
              5
            ));
          this.World.RemoveSprite(this);
        }
        this.X += this.Xa;
        this.Y += this.Ya;
        this.Ya *= .95;
        this.Ya += 1;
      }
      else {
        this.Tick++;
        if (this.Y >= this.YStart) {
          this.YStart = this.Y;
          let a = Math.abs(Mario.Character.X - this.X) | 0;
          this.JumpTime++;
          this.Ya = this.JumpTime > 40 && a > 24 ? -8 : 0;
        } else {
          this.JumpTime = 0;
          this.Y += this.Ya;
          this.Ya *= .9;
          this.Ya += .1;
          this.XPic = ((this.Tick / 2 | 0) & 1) * 2 + ((this.Tick / 6 | 0) & 1);
        }
      }
    }
  },
  Shell,
  TitleState: class extends Enjine.GameState {
    constructor() {
      super();
    }
    Enter() {
      this.drawManager = new Enjine.DrawableManager;
      this.camera = new Enjine.Camera;
      let a = new Mario.BackgroundGenerator(2048, 15, !0, Mario.LevelType.Overground), b = new Mario.BackgroundRenderer(a.CreateLevel(), 320, 240, 2);
      a.SetValues(2048, 15, !1, Mario.LevelType.Overground);
      a = new Mario.BackgroundRenderer(a.CreateLevel(), 320, 240, 1);
      this.title = new Enjine.Sprite;
      this.title.Image = Enjine.Resources.Images.title;
      this.title.X = 0;
      this.title.Y = 120;
      this.logo = new Enjine.Sprite;
      this.logo.Image = Enjine.Resources.Images.logo;
      this.logo.X = 0;
      this.logo.Y = 0;
      this.font = Mario.SpriteCuts.CreateRedFont();
      this.font.Strings[0] = { String: "Press S to Start", X: 96, Y: 120 };
      this.logoY = 20;
      this.drawManager.Add(b);
      this.drawManager.Add(a);
      this.bounce = 0;
      Mario.GlobalMapState = new Mario.MapState;
      Mario.Character = new Mario.Character;
      Mario.Character.Image = Enjine.Resources.Images.smallMario;
    }
    Exit() {
      this.drawManager.Clear();
      delete this.drawManager;
      delete this.camera;
      delete this.font;
    }
    /**
     * 
     * @param {Number} time 
     */
    Update(time) {
      this.bounce += time * 2;
      this.logoY = 20 + Math.sin(this.bounce) * 10;
      this.camera.X += time * 25;
      this.drawManager.Update(time);
    }
    Draw(a) {
      this.drawManager.Draw(a, this.camera);
      a.drawImage(Enjine.Resources.Images.title, 0, 120);
      a.drawImage(Enjine.Resources.Images.logo, 0, this.logoY);
      this.font.Draw(a, this.Camera);
    }
    /**
     * 
     * @param {Enjine["GameStateContext"]} a 
     */
    CheckForChange(a) {
      Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.S) && a.ChangeState(Mario.GlobalMapState);
    };
  },
  LoadingState: class extends Enjine.GameState {
    constructor() {
      super();
      this.Images = [];
      this.ImagesLoaded = !1;
      this.ScreenColor = 0;
      this.ColorDirection = 1;
      this.SoundIndex = this.ImageIndex = 0;
    }
    Enter() {
      for (let i = 0; i < 15; i++) {
        this.Images[i] = {
          name: [
            "background",
            "endScene",
            "enemies",
            "fireMario",
            "font",
            "gameOverGhost",
            "items",
            "logo",
            "map",
            "mario",
            "particles",
            "racoonMario",
            "smallMario",
            "title",
            "worldMap"
          ][i],
          src: `public/images/${[
            "bgsheet.png",
            "endscene.gif",
            "enemysheet.png",
            "firemariosheet.png",
            "font.gif",
            "gameovergost.gif",
            "itemsheet.png",
            "logo.gif",
            "mapsheet.png",
            "mariosheet.png",
            "particlesheet.png",
            "racoonmariosheet.png",
            "smallmariosheet.png",
            "title.gif",
            "worldmap.png"
          ][i]}`
        };
      }
      Enjine.Resources.AddImages(this.Images);
      new Audio().canPlayType("audio/mp3")
        ? Enjine.Resources.AddSound("1up", "sounds/1-up.mp3", 1).AddSound("breakblock", "sounds/breakblock.mp3").AddSound("bump", "sounds/bump.mp3", 4).AddSound("cannon", "sounds/cannon.mp3").AddSound("coin", "sounds/coin.mp3", 5).AddSound("death", "sounds/death.mp3", 1).AddSound("exit", "sounds/exit.mp3", 1).AddSound("fireball", "sounds/fireball.mp3", 1).AddSound("jump", "sounds/jump.mp3").AddSound("kick", "sounds/kick.mp3").AddSound("pipe", "sounds/pipe.mp3", 1).AddSound("powerdown", "sounds/powerdown.mp3", 1).AddSound("powerup", "sounds/powerup.mp3", 1).AddSound("sprout", "sounds/sprout.mp3", 1).AddSound("stagestart", "sounds/stagestart.mp3", 1).AddSound("stomp", "sounds/stomp.mp3", 2)
        : Enjine.Resources.AddSound("1up", "sounds/1-up.wav", 1).AddSound("breakblock", "sounds/breakblock.wav").AddSound("bump", "sounds/bump.wav", 2).AddSound("cannon", "sounds/cannon.wav").AddSound("coin", "sounds/coin.wav", 5).AddSound("death", "sounds/death.wav", 1).AddSound("exit", "sounds/exit.wav", 1).AddSound("fireball", "sounds/fireball.wav", 1).AddSound("jump", "sounds/jump.wav", 1).AddSound("kick", "sounds/kick.wav", 1).AddSound("message", "sounds/message.wav", 1).AddSound("pipe", "sounds/pipe.wav", 1).AddSound("powerdown", "sounds/powerdown.wav", 1).AddSound("powerup", "sounds/powerup.wav", 1).AddSound("sprout", "sounds/sprout.wav", 1).AddSound("stagestart", "sounds/stagestart.wav", 1).AddSound("stomp", "sounds/stomp.wav", 1);
      Mario.Tile.LoadBehaviors();
    };
    Exit() {
      delete this.Images;
    };
    /**
     * 
     * @param {number} time 
     */
    Update(time) {
      if (!this.ImagesLoaded) {
        this.ImagesLoaded = !0;
        for (let image of this.Images)
          if (Enjine.Resources.Images[image.name].complete !== !0) {
            this.ImagesLoaded = !1;
            break;
          }
      }
      this.ScreenColor += this.ColorDirection * 255 * time;
      if (this.ScreenColor > 255) {
        this.ScreenColor = 255;
        this.ColorDirection = -1;
      } else if (this.ScreenColor < 0) {
        this.ScreenColor = 0;
        this.ColorDirection = 1;
      }
    };
    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     */
    Draw(ctx) {
      if (this.ImagesLoaded)
        ctx.fillStyle = "rgb(0, 0, 0)";
      else {
        let color = parseInt(this.ScreenColor, 10);
        ctx.fillStyle = `rgb(${color}, ${color}, ${color})`;
      } ctx.fillRect(0, 0, 640, 480);
    };
    /**
     * 
     * @param {Enjine["GameStateContext"]} title 
     */
    CheckForChange(title) {
      if (this.ImagesLoaded) {
        Mario.GlobalMapState = new Mario.MapState;
        title.ChangeState(new Mario.TitleState);
      }
    };
  },
  LoseState: class extends Enjine.GameState {
    constructor() {
      super();
      this.wasKeyDown = !1;
    }
    Enter() {
      this.drawManager = new Enjine.DrawableManager;
      this.camera = new Enjine.Camera;
      this.gameOver = new Enjine.AnimatedSprite;
      this.gameOver.Image = Enjine.Resources.Images.gameOverGhost;
      this.gameOver.SetColumnCount(9);
      this.gameOver.SetRowCount(1);
      this.gameOver.AddNewSequence("turnLoop", 0, 0, 0, 8);
      this.gameOver.PlaySequence("turnLoop", !0);
      this.gameOver.FramesPerSecond = 1 / 15;
      this.gameOver.X = 112;
      this.gameOver.Y = 68;
      this.font = Mario.SpriteCuts.CreateBlackFont();
      this.font.Strings[0] = { String: "Game over!", X: 116, Y: 160 };
      this.drawManager.Add(this.font);
      this.drawManager.Add(this.gameOver);
    }
    Exit() {
      this.drawManager.Clear();
      delete this.drawManager;
      delete this.camera;
      delete this.gameOver;
      delete this.font;
    }
    /**
     * 
     * @param {Number} time 
     */
    Update(time) {
      this.drawManager.Update(time);
      if (Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.S))
        this.wasKeyDown = !0;
    }
    Draw(a) {
      this.drawManager.Draw(a, this.camera);
    }
    /**
     * 
     * @param {Enjine["GameStateContext"]} a 
     */
    CheckForChange(a) {
      if (this.wasKeyDown && !Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.S)) a.ChangeState(new Mario.TitleState);
    }
  },
  WinState: class extends Enjine.GameState {
    constructor() {
      super();
      this.waitTime = 2;
      this.wasKeyDown = !1;
    }
    Enter() {
      this.drawManager = new Enjine.DrawableManager;
      this.camera = new Enjine.Camera;
      this.font = Mario.SpriteCuts.CreateBlackFont();
      this.font.Strings[0] = { String: "Thank you for saving me, Mario!", X: 36, Y: 160 };
      this.kissing = new Enjine.AnimatedSprite;
      this.kissing.Image = Enjine.Resources.Images.endScene;
      this.kissing.X = 112;
      this.kissing.Y = 52;
      this.kissing.SetColumnCount(2);
      this.kissing.SetRowCount(1);
      this.kissing.AddNewSequence("loop", 0, 0, 0, 1);
      this.kissing.PlaySequence("loop", !0);
      this.kissing.FramesPerSecond = .5;
      this.waitTime = 2;
      this.drawManager.Add(this.font);
      this.drawManager.Add(this.kissing);
    }
    Exit() {
      this.drawManager.Clear();
      delete this.drawManager;
      delete this.camera;
    }
    Update(a) {
      this.drawManager.Update(a);
      if (this.waitTime > 0)
        this.waitTime -= a;
      else if (Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.S))
        this.wasKeyDown = !0;
    }
    Draw(a) {
      this.drawManager.Draw(a, this.camera);
    }
    /**
     * 
     * @param {Enjine["GameStateContext"]} a 
     */
    CheckForChange(a) {
      this.waitTime <= 0 && this.wasKeyDown && !Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.S) && a.ChangeState(new Mario.TitleState);
    };
  },
  MapState: class extends Enjine.GameState {
    constructor() {
      super();
      this.camera = new Enjine.Camera;
      this.Level = [];
      this.Data = [];
      this.YFarthestCap = this.XFarthestCap = this.Farthest = this.LevelId = this.MoveTime = this.YMarioA = this.XMarioA = this.YMario = this.XMario = 0;
      this.MapImage = document.createElement("canvas");
      this.MapImage.width = 320;
      this.MapImage.height = 240;
      this.MapContext = this.MapImage.getContext("2d");
      this.EnterLevel = this.CanEnterLevel = !1;
      this.LevelType = this.LevelDifficulty = 0;
      this.WorldNumber = -1;
      this.NextWorld();
    }
    Enter() {
      this.WaterSprite = new Enjine.AnimatedSprite;
      this.WaterSprite.Image = Enjine.Resources.Images.worldMap;
      this.WaterSprite.SetColumnCount(16);
      this.WaterSprite.SetRowCount(16);
      this.WaterSprite.AddNewSequence("loop", 14, 0, 14, 3);
      this.WaterSprite.FramesPerSecond = 1 / 3;
      this.WaterSprite.PlaySequence("loop", !0);
      this.WaterSprite.X = 0;
      this.WaterSprite.Y = 0;
      this.DecoSprite = new Enjine.AnimatedSprite;
      this.DecoSprite.Image = Enjine.Resources.Images.worldMap;
      this.DecoSprite.SetColumnCount(16);
      this.DecoSprite.SetRowCount(16);
      this.DecoSprite.AddNewSequence("world0", 10, 0, 10, 3);
      this.DecoSprite.AddNewSequence("world1", 11, 0, 11, 3);
      this.DecoSprite.AddNewSequence("world2", 12, 0, 12, 3);
      this.DecoSprite.AddNewSequence("world3", 13, 0, 13, 3);
      this.DecoSprite.FramesPerSecond = 1 / 3;
      this.DecoSprite.PlaySequence("world0", !0);
      this.DecoSprite.X = 0;
      this.DecoSprite.Y = 0;
      this.HelpSprite = new Enjine.AnimatedSprite;
      this.HelpSprite.Image = Enjine.Resources.Images.worldMap;
      this.HelpSprite.SetColumnCount(16);
      this.HelpSprite.SetRowCount(16);
      this.HelpSprite.AddNewSequence("help", 7, 3, 7, 5);
      this.HelpSprite.FramesPerSecond = .5;
      this.HelpSprite.PlaySequence("help", !0);
      this.HelpSprite.X = 0;
      this.HelpSprite.Y = 0;
      this.SmallMario = new Enjine.AnimatedSprite;
      this.SmallMario.Image = Enjine.Resources.Images.worldMap;
      this.SmallMario.SetColumnCount(16);
      this.SmallMario.SetRowCount(16);
      this.SmallMario.AddNewSequence("small", 1, 0, 1, 1);
      this.SmallMario.FramesPerSecond = 1 / 3;
      this.SmallMario.PlaySequence("small", !0);
      this.SmallMario.X = 0;
      this.SmallMario.Y = 0;
      this.LargeMario = new Enjine.AnimatedSprite;
      this.LargeMario.Image = Enjine.Resources.Images.worldMap;
      this.LargeMario.SetColumnCount(16);
      this.LargeMario.SetRowCount(8);
      this.LargeMario.AddNewSequence("large", 0, 2, 0, 3);
      this.LargeMario.AddNewSequence("fire", 0, 4, 0, 5);
      this.LargeMario.FramesPerSecond = 1 / 3;
      this.LargeMario.PlaySequence("large", !0);
      this.LargeMario.X = 0;
      this.LargeMario.Y = 0;
      this.FontShadow = Mario.SpriteCuts.CreateBlackFont();
      this.Font = Mario.SpriteCuts.CreateWhiteFont();
      this.DecoSprite.PlaySequence("world" + this.WorldNumber % 4, !0);
      this.LargeMario.PlaySequence(Mario.Character.Fire ? "fire" : "large", !0);
      this.EnterLevel = !1;
      this.LevelType = this.LevelDifficulty = 0;
    }
    Exit() {
      delete this.WaterSprite;
      delete this.DecoSprite;
      delete this.HelpSprite;
      delete this.SmallMario;
      delete this.LargeMario;
      delete this.FontShadow;
      delete this.Font;
    }
    NextWorld() {
      let a = !1;
      if (++this.WorldNumber !== 8) {
        for (this.YFarthestCap = this.XFarthestCap = this.Farthest = this.LevelId = this.MoveTime = 0; !a;)
          a = this.GenerateLevel();
        this.RenderStatic();
      }
    }
    GenerateLevel() {
      let num = 9223372036854775E3,
        d = new Mario.ImprovedNoise(Math.random() * num | 0),
        f = new Mario.ImprovedNoise(Math.random() * num | 0),
        g = new Mario.ImprovedNoise(Math.random() * num | 0);
      this.Level = [];
      this.Data = [];
      let h = Math.random() * 512, i = Math.random() * 512, j = Math.random() * 512, k = Math.random() * 512;
      for (let i = 0; i < 21; i++) {
        this.Level[i] = [];
        this.Data[i] = [];
        for (let b = 0; b < 16; b++) {
          let c = d.PerlinNoise(i * 10 + h, b * 10 + i);
          let e = f.PerlinNoise(i * 10 + j, b * 10 + k);
          c -= e;
          c *= 2;
          this.Level[i][b] = c > 0 ? Mario.MapTile.Water : Mario.MapTile.Grass;
        }
      }
      f = d = 9999;
      for (let c = 0, j = 0; j < 100 && c < 12; j++) {
        let a = (Math.random() * (20 / 3 | 0) | 0) * 3 + 2;
        let b = (Math.random() * 5 | 0) * 3 + 1;
        if (this.Level[a][b] === Mario.MapTile.Grass) {
          a < d && (d = a, f = b);
          this.Level[a][b] = Mario.MapTile.Level;
          this.Data[a][b] = -1;
          c++;
        }
      }
      this.Data[d][f] = -2;
      for (let bool = !0; bool;)
        bool = this.FindConnection(21, 16);
      this.FindCaps(21, 16);
      if (this.XFarthestCap === 0)
        return !1;
      this.Data[this.XFarthestCap][this.YFarthestCap] = -2;
      this.Data[this.XMario / 16 | 0][this.YMario / 16 | 0] = -11;
      for (let x = 0; x < 21; x++)
        for (let y = 0; y < 16; y++)
          if (this.Level[x][y] === Mario.MapTile.Grass && (x !== this.XFarthestCap || y !== this.YFarthestCap - 1)) {
            let c = g.PerlinNoise(x * 10 + h, y * 10 + i);
            if (c > 0)
              this.Level[x][y] = Mario.MapTile.Decoration;
          }
      return !0;
    }
    /**
     * 
     * @param {Number} width 
     * @param {Number} height 
     */
    FindConnection(width, height) {
      for (let x = 0; x < width; x++)
        for (let y = 0; y < height; y++)
          if (this.Level[x][y] === Mario.MapTile.Level && this.Data[x][y] === -1) {
            this.Connect(x, y, width, height);
            return !0;
          }
      return !1;
    }
    /**
     * 
     * @param {Number} X 
     * @param {Number} Y 
     * @param {Number} width 
     * @param {Number} height 
     */
    Connect(X, Y, width, height) {
      let d = 1E4, x1 = 0, y1 = 0;
      for (let x = 0; x < width; x++)
        for (let y = 0; y < height; y++)
          if (this.Level[x][y] === Mario.MapTile.Level && this.Data[x][y] === -2) {
            let j = Math.abs(X - x) | 0;
            let k = Math.abs(Y - y) | 0;
            j = j * j + k * k;
            if (j < d) {
              x1 = x;
              y1 = y;
              d = j;
            }
          }
      this.DrawRoad(X, Y, x1, y1);
      this.Level[X][Y] = Mario.MapTile.Level;
      this.Data[X][Y] = -2;
    }
    DrawRoad(x1, y1, x2, y2) {
      let d = !1;
      Math.random() > .5 && (d = !0);
      if (d) {
        while (x1 > x2) {
          this.Data[x1][y1] = 0;
          this.Level[x1--][y1] = Mario.MapTile.Road;
        }
        while (x1 < x2) {
          this.Data[x1][y1] = 0;
          this.Level[x1++][y1] = Mario.MapTile.Road;
        }
      }
      while (y1 > y2) {
        this.Data[x1][y1] = 0;
        this.Level[x1][y1--] = Mario.MapTile.Road;
      }
      while (y1 < y2) {
        this.Data[x1][y1] = 0;
        this.Level[x1][y1++] = Mario.MapTile.Road;
      }
      if (!d) {
        while (x1 > x2) {
          this.Data[x1][y1] = 0;
          this.Level[x1--][y1] = Mario.MapTile.Road;
        }
        while (x1 < x2) {
          this.Data[x1][y1] = 0;
          this.Level[x1++][y1] = Mario.MapTile.Road;
        }
      }
    }
    FindCaps(width, height) {
      let d = -1, f = -1;
      for (let x = 0; x < width; x++)
        for (let y = 0; y < height; y++)
          if (this.Level[x][y] === Mario.MapTile.Level) {
            let g = 0;
            for (let sizeX = x - 1; sizeX <= x + 1; sizeX++)
              for (let sizeY = y - 1; sizeY <= y + 1; sizeY++)
                if (this.Level[sizeX][sizeY] === Mario.MapTile.Road) g++;
            if (g === 1) {
              if (d === -1) {
                d = x;
                f = y;
              }
              this.Data[x][y] = 0;
            } else this.Data[x][y] = 1;
          } this.XMario = d * 16;
      this.YMario = f * 16;
      this.Travel(d, f, -1, 0);
    }
    Travel(x, y, c, e) {
      if (!(this.Level[x][y] !== Mario.MapTile.Road && this.Level[x][y] !== Mario.MapTile.Level)) {
        if (this.Level[x][y] === Mario.MapTile.Road)
          if (this.Data[x][y] === 1)
            return;
          else
            this.Data[x][y] = 1;
        if (this.Level[x][y] === Mario.MapTile.Level)
          if (this.Data[x][y] > 0)
            this.Data[x][y] = this.LevelId !== 0 && (Math.random() * 4 | 0) === 0 ? -3 : ++this.LevelId;
          else if (e > 0 && (this.Data[x][y] = -1, e > this.Farthest)) {
            this.Farthest = e;
            this.XFarthestCap = x;
            this.YFarthestCap = y;
          }
        c !== 2 && this.Travel(x - 1, y, 0, e++);
        c !== 3 && this.Travel(x, y - 1, 1, e++);
        c !== 0 && this.Travel(x + 1, y, 2, e++);
        c !== 1 && this.Travel(x, y + 1, 3, e++);
      }
    }
    RenderStatic() {
      let map = Enjine.Resources.Images.worldMap;
      let { Level, Road, Water } = Mario.MapTile;
      for (let x = 0; x < 20; x++)
        for (let y = 0; y < 15; y++) {
          this.MapContext.drawImage(map, (this.WorldNumber / 4 | 0) * 16, 0, 16, 16, x * 16, y * 16, 16, 16);
          switch (this.Level[x][y]) {
            case Level:
              let g = this.Data[x][y];
              switch (g) {
                case 0:
                  this.MapContext.drawImage(map, 0, 112, 16, 16, x * 16, y * 16, 16, 16);
                  break;
                case -1:
                  this.MapContext.drawImage(map, 48, 128, 16, 16, x * 16, y * 16, 16, 16);
                  break;
                case -3:
                  this.MapContext.drawImage(map, 0, 128, 16, 16, x * 16, y * 16, 16, 16);
                  break;
                case -10:
                  this.MapContext.drawImage(map, 16, 128, 16, 16, x * 16, y * 16, 16, 16);
                  break;
                case -11:
                  this.MapContext.drawImage(map, 16, 112, 16, 16, x * 16, y * 16, 16, 16);
                  break;
                case -2:
                  this.MapContext.drawImage(map, 32, 112, 16, 16, x * 16, (y - 1) * 16, 16, 16);
                  this.MapContext.drawImage(map, 32, 128, 16, 16, x * 16, y * 16, 16, 16);
                  break;
                default: this.MapContext.drawImage(map, (g - 1) * 16, 96, 16, 16, x * 16, y * 16, 16, 16);
              }
              break;
            case Road:
              let c = this.IsRoad(x - 1, y) ? 1 : 0;
              c += (this.IsRoad(x, y - 1) ? 1 : 0) * 2 + (this.IsRoad(x + 1, y) ? 1 : 0) * 4 + (this.IsRoad(x, y + 1) ? 1 : 0) * 8;
              this.MapContext.drawImage(map, c * 16, 32, 16, 16, x * 16, y * 16, 16, 16);
              break;
            case Water:
              for (let g = 0; g < 2; g++)
                for (let h = 0; h < 2; h++) {
                  let c = this.IsWater(x * 2 + (g - 1), y * 2 + (h - 1)) ? 0 : 1;
                  c += (this.IsWater(x * 2 + g, y * 2 + (h - 1)) ? 0 : 1) * 2 + (this.IsWater(x * 2 + (g - 1), y * 2 + h) ? 0 : 1) * 4 + (this.IsWater(x * 2 + g, y * 2 + h) ? 0 : 1) * 8 - 1;
                  c >= 0 && c <= 14 && this.MapContext.drawImage(map, c * 16, (4 + (g + h & 1)) * 16, 16, 16, x * 16 + g * 8, y * 16 + h * 8, 16, 16);
                }
              break;
          }
        }
    }
    IsRoad(x, y) {
      x = Math.max(x, 0);
      y = Math.max(y, 0);
      return this.Level[x][y] === Mario.MapTile.Road || this.Level[x][y] === Mario.MapTile.Level;
    }
    IsWater(x, y) {
      x = Math.max(x, 0);
      y = Math.max(y, 0);
      for (let i = 0; i < 2; i++)
        for (let j = 0; j < 2; j++)
          if (this.Level[(x + i) / 2 | 0][(y + j) / 2 | 0] !== Mario.MapTile.Water)
            return !1;
      return !0;
    }
    Update(sprite) {
      if (this.WorldNumber !== 8) {
        this.XMario += this.XMarioA;
        this.YMario += this.YMarioA;
        let x = this.XMario / 16 | 0;
        let y = this.YMario / 16 | 0;
        this.Level[x][y] === Mario.MapTile.Road && (this.Data[x][y] = 0);
        if (this.MoveTime > 0)
          this.MoveTime--;
        else {
          this.YMarioA = this.XMarioA = 0;
          if (this.CanEnterLevel && Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.S) && this.Level[x][y] === Mario.MapTile.Level && this.Data[x][y] !== -11 && this.Level[x][y] === Mario.MapTile.Level && this.Data[x][y] !== 0 && this.Data[x][y] > -10) {
            let difficulty = this.WorldNumber + 1;
            Mario.Character.LevelString = difficulty + "-";
            let type = Mario.LevelType.Overground;
            if (this.Data[x][y] > 1 && (Math.random() * 3 | 0) === 0)
              type = Mario.LevelType.Underground;
            this.Data[x][y] < 0 ? (this.Data[x][y] === -2 ? (Mario.Character.LevelString += "X", difficulty += 2) : this.Data[x][y] === -1 ? Mario.Character.LevelString += "?" : (Mario.Character.LevelString += "#", difficulty += 1), type = Mario.LevelType.Castle) : Mario.Character.LevelString += this.Data[x][y];
            this.EnterLevel = !0;
            this.LevelDifficulty = difficulty;
            this.LevelType = type;
          }
          this.CanEnterLevel = !Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.S);
          Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.LEFT) && this.TryWalking(-1, 0);
          Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.RIGHT) && this.TryWalking(1, 0);
          Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.UP) && this.TryWalking(0, -1);
          Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.DOWN) && this.TryWalking(0, 1);
        }
        this.WaterSprite.Update(sprite);
        this.DecoSprite.Update(sprite);
        this.HelpSprite.Update(sprite);
        let mario = `${Mario.Character.Large ? "Large" : "Small"}Mario`;
        this[mario].X = this.XMario + this.XMarioA * sprite | 0;
        this[mario].Y = this.YMario + (this.YMarioA * sprite | 0) - (Mario.Character.Large ? 22 : 6);
        this[mario].Update(sprite)
      }
    }
    TryWalking(moveX, moveY) {
      let x = this.XMario / 16 | 0, y = this.YMario / 16 | 0, toX = x + moveX, toY = y + moveY;
      if ((this.Level[toX][toY] === Mario.MapTile.Road || this.Level[toX][toY] === Mario.MapTile.Level) && !(this.Level[toX][toY] === Mario.MapTile.Road && this.Data[toX][toY] !== 0 && this.Data[x][y] !== 0 && this.Data[x][y] > -10)) {
        this.XMarioA = moveX * 8;
        this.YMarioA = moveY * 8;
        this.MoveTime = this.CalcDistance(x, y, moveX, moveY) * 2 + 1;
      }
    }
    CalcDistance(x, y, moveX, moveY) {
      for (let d = 0; true; d++) {
        x += moveX;
        y += moveY;
        if (
          this.Level[x][y] !== Mario.MapTile.Road ||
          this.Level[x - moveY][y + moveX] === Mario.MapTile.Road ||
          this.Level[x + moveY][y - moveX] === Mario.MapTile.Road
        ) return d;
      }
    }
    Draw(a) {
      if (this.WorldNumber !== 8) {
        a.drawImage(this.MapImage, 0, 0);
        for (let c = 0; c <= 15; c++)
          for (let b = 20; b >= 0; b--) {
            let { Water, Decoration, Level } = Mario.MapTile;
            switch (this.Level[b][c]) {
              case Water:
                if (this.IsWater(b * 2 - 1, c * 2 - 1)) setSprite(this.WaterSprite, -8, -8, this.camera);
                break;
              case Decoration:
                setSprite(this.DecoSprite, 0, 0, this.camera);
                break;
              case Level:
                if (this.Data[b][c] === -2) setSprite(this.HelpSprite, 16, -16, this.camera);
                break;
            }
            function setSprite(sprite, n1, n2, camera) {
              sprite.X = b * 16 + n1;
              sprite.Y = c * 16 + n2;
              sprite.Draw(a, camera);
            }
          }
        Mario.Character.Large ? this.LargeMario.Draw(a, this.camera) : this.SmallMario.Draw(a, this.camera);
        this.FontShadow.Strings[0] = { String: "MARIO " + Mario.Character.Lives, X: 5, Y: 5 };
        this.FontShadow.Strings[1] = { String: "WORLD " + (this.WorldNumber + 1), X: 257, Y: 5 };
        this.FontShadow.Draw(a, this.camera);
        this.Font.Strings[0] = { String: "MARIO " + Mario.Character.Lives, X: 4, Y: 4 };
        this.Font.Strings[1] = { String: "WORLD " + (this.WorldNumber + 1), X: 256, Y: 4 };
        this.Font.Draw(a, this.camera);
      }
    }
    LevelWon() {
      let a = this.XMario / 16, b = this.YMario / 16;
      if (this.Data[a][b] === -2)
        this.NextWorld();
      else {
        this.Data[a][b] = this.Data[a][b] !== -3 ? 0 : -10;
        this.RenderStatic();
      }
    }
    GetX() {
      return 160;
    }
    GetY() {
      return 120;
    }
    /**
     * 
     * @param {Enjine["GameStateContext"]} a 
     */
    CheckForChange(a) {
      if (this.WorldNumber === 8) a.ChangeState(new Mario.WinState);
      if (this.EnterLevel) a.ChangeState(new Mario.LevelState(this.LevelDifficulty, this.LevelType));
    }
  },
  LevelState,
};
