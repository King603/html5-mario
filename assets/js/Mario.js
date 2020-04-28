let Mario = {
  // 裁剪精灵图
  SpriteCuts: {
    // 创建黑色字体
    CreateBlackFont() {
      return new Enjine.SpriteFont([], Enjine.Resources.Images.font, 8, 8, this.GetCharArray(0));
    },
    // 创建红色字体
    CreateRedFont() {
      return new Enjine.SpriteFont([], Enjine.Resources.Images.font, 8, 8, this.GetCharArray(8));
    },
    // 创造绿色字体
    CreateGreenFont() {
      return new Enjine.SpriteFont([], Enjine.Resources.Images.font, 8, 8, this.GetCharArray(16));
    },
    // 创建蓝色字体
    CreateBlueFont() {
      return new Enjine.SpriteFont([], Enjine.Resources.Images.font, 8, 8, this.GetCharArray(24));
    },
    // 创建黄色字体
    CreateYellowFont() {
      return new Enjine.SpriteFont([], Enjine.Resources.Images.font, 8, 8, this.GetCharArray(32));
    },
    // 创建粉红色字体
    CreatePinkFont() {
      return new Enjine.SpriteFont([], Enjine.Resources.Images.font, 8, 8, this.GetCharArray(40));
    },
    // 创建青色字体
    CreateCyanFont() {
      return new Enjine.SpriteFont([], Enjine.Resources.Images.font, 8, 8, this.GetCharArray(48));
    },
    // 创建白色字体
    CreateWhiteFont() {
      return new Enjine.SpriteFont([], Enjine.Resources.Images.font, 8, 8, this.GetCharArray(56));
    },
    // 获取字符数组
    GetCharArray(a) {
      let b = [];
      for (let c = 32; c < 127; c++)
        b[c] = { X: (c - 32) * 8, Y: a };
      return b;
    },
    // 获取背景页
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
    // 获取关卡表
    GetLevelSheet() {
      let { width, height } = Enjine.Resources.Images.map;
      let a = [];
      for (let b = 0; b < width / 16; b++) {
        a[b] = [];
        for (let c = 0; c < height / 16; c++)
          a[b][c] = { X: b * 16, Y: c * 16, Width: 16, Height: 16 };
      } return a;
    }
  },
  // 瓷砖
  Tile: {
    // 方块上方
    BlockUpper: 1,
    // 所有方块
    BlockAll: 2,
    // 方块下方
    BlockLower: 4,
    // 特殊的
    Special: 8,
    // 可碰撞的
    Bumpable: 16,
    // 可断开的
    Breakable: 32,
    // 拾取能力
    PickUpable: 64,
    // 动画
    Animated: 128,
    // 行为
    Behaviors: [],
    // 负载行为
    LoadBehaviors() {
      let a = [0, 20, 28, 0, 130, 130, 130, 130, 2, 2, 2, 2, 2, 0, 138, 0, 162, 146, 154, 162, 146, 146, 154, 146, 2, 0, 2, 2, 2, 0, 2, 0, 192, 192, 192, 192, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2];
      for (let b = 58; b < 128; b++)
        a[b] = 0;
      a[128] = 2;
      a[129] = 2;
      a[130] = 2;
      a[131] = 0;
      a[132] = 1;
      a[133] = 1;
      a[134] = 1;
      a[135] = 0;
      a[136] = 2;
      a[137] = 2;
      a[138] = 2;
      a[139] = 0;
      a[140] = 2;
      a[141] = 2;
      a[142] = 2;
      a[143] = 0;
      a[144] = 2;
      a[145] = 0;
      a[146] = 2;
      a[147] = 0;
      a[148] = 0;
      a[149] = 0;
      a[150] = 0;
      a[151] = 0;
      a[152] = 2;
      a[153] = 2;
      a[154] = 2;
      a[155] = 0;
      a[156] = 2;
      a[157] = 2;
      a[158] = 2;
      a[159] = 0;
      a[160] = 2;
      a[161] = 2;
      a[162] = 2;
      a[163] = 0;
      a[164] = 0;
      a[165] = 0;
      a[166] = 0;
      a[167] = 0;
      a[168] = 2;
      a[169] = 2;
      a[170] = 2;
      a[171] = 0;
      a[172] = 2;
      a[173] = 2;
      a[174] = 2;
      a[175] = 0;
      a[176] = 2;
      a[177] = 2;
      a[178] = 2;
      a[179] = 0;
      a[180] = 1;
      a[181] = 1;
      a[182] = 1;
      for (let b = 183; b < 224; b++)
        a[b] = 0;
      a[224] = 1;
      a[225] = 1;
      a[226] = 1;
      for (let b = 227; b < 256; b++)
        a[b] = 0;
      this.Behaviors = a;
    }
  },
  // 等级样式
  LevelType: {
    // 在地面
    Overground: 0,
    // 在地下
    Underground: 1,
    // 城堡
    Castle: 2
  },
  // 几率
  Odds: {
    // 直的
    Straight: 0,
    // 直丘
    HillStraight: 1,
    // 管子
    Tubes: 2,
    // 跳跃
    Jump: 3,
    // 大炮
    Cannons: 4
  },
  // 图部件
  MapTile: {
    // 草
    Grass: 0,
    // 水
    Water: 1,
    // 关卡
    Level: 2,
    // 道路
    Road: 3,
    // 装饰
    Decoration: 4
  }
};
Mario.Level = (() => {
  return class {
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
    // 更新数据
    Update() {
      for (let x = 0; x < this.Width; x++)
        for (let y = 0; y < this.Height; y++)
          if (this.Data[x][y] > 0) this.Data[x][y]--;
    }
    /**
     * 获取方块顶部
     * @param {Number} x X坐标
     * @param {Number} y Y坐标
     */
    GetBlockCapped(x, y) {
      x = Math.max(x, 0);
      y = Math.max(y, 0);
      x >= this.Width && (x = this.Width - 1);
      y >= this.Height && (y = this.Height - 1);
      return this.Map[x][y];
    }
    /**
     * 获取方块
     * @param {Number} x X坐标
     * @param {Number} y Y坐标
     */
    GetBlock(x, y) {
      x < 0 && (x = 0);
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
     * @param {Element} ele 元素
     */
    SetBlock(x, y, ele) {
      x < 0 || y < 0 || x >= this.Width || y >= this.Height || (this.Map[x][y] = ele);
    }
    /**
     * 设置方块数据
     * @param {Number} x X坐标
     * @param {Number} y Y坐标
     * @param {Element} ele 元素 
     */
    SetBlockData(x, y, ele) {
      x < 0 || y < 0 || x >= this.Width || y >= this.Height || (this.Data[x][y] = ele);
    }
    /**
     * 判断阻塞
     * @param {Number} x X坐标
     * @param {Number} y Y坐标
     * @param {Element} ele 元素 
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
     */
    GetSpriteTemplate(x, y) {
      return x < 0 || y < 0 || x >= this.Width || y >= this.Height ? null : this.SpriteTemplates[x][y];
    }
    /**
     * 设置Sprite模板
     * @param {Number} x X坐标
     * @param {Number} y Y坐标
     * @param {Element} ele 元素
     */
    SetSpriteTemplate(x, y, ele) {
      x < 0 || y < 0 || x >= this.Width || y >= this.Height || (this.SpriteTemplates[x][y] = ele);
    }
  }
})();
Mario.BackgroundGenerator = (() => class {
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
  // 创建关卡
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
   * @param {*} level 
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
   * @param {*} level 
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
  // 生成的城堡
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
})();
Mario.BackgroundRenderer = (() => class extends Enjine.Drawable {
  /**
   * 背景渲染器
   * @param {*} level 
   * @param {*} width 
   * @param {*} y Y坐标
   * @param {*} distance 
   */
  constructor(level, width, y, distance) {
    super();
    this.Level = level;
    this.Width = width;
    this.Distance = distance;
    this.TilesY = (y / 32 | 0) + 1;
    this.Background = Mario.SpriteCuts.GetBackgroundSheet();
  }
  Draw(a, b) {
    let c = b.X / this.Distance;
    for (let e = c / 32 | 0; e <= (c + this.Width) / 32 | 0; e++)
      for (let d = 0; d < this.TilesY; d++) {
        let block = this.Level.GetBlock(e, d) & 255;
        block = this.Background[block % 8][block / 8 | 0];
        a.drawImage(Enjine.Resources.Images.background, block.X, block.Y, block.Width, block.Height, (e << 5) - c | 0, d << 5 | 0, block.Width, block.Height);
      }
  }
})();
Mario.ImprovedNoise = (() => class {
  constructor(a) {
    this.P = [];
    this.Shuffle(a);
  }
  Shuffle() {
    let a = [];
    for (let i = 0; i < 256; i++)
      a[i] = i;
    for (let i = 0; i < 256; i++) {
      let random = (Math.random() * 255 | 0) + i;
      let amount = a[i];
      a[i] = a[random];
      a[random] = amount;
      this.P[i + 256] = this.P[i] = a[i];
    }
  }
  PerlinNoise(a, b) {
    let e = 0;
    for (let i = 0; i < 8; i++) {
      let d = 64 / (1 << i);
      e += this.Noise(a / d, b / d, 128) / (1 << i);
    }
    return e;
  }
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
  Fade(a) {
    return a * a * a * (a * (a * 6 - 15) + 10);
  }
  Lerp(a, b, c) {
    return b + a * (c - b);
  }
  Grad(a, b, c, e) {
    a &= 15;
    return ((a & 1) === 0 ? 1 : -1) * (a < 8 ? b : c) + ((a & 2) === 0 ? 1 : -1) * (a < 4 ? c : a === 12 || a === 14 ? b : e);
  }
})();
Mario.NotchSprite = (() => class extends Enjine.Drawable {
  constructor(a) {
    super();
    this.YPicO = this.XPicO = this.YPic = this.XPic = this.Ya = this.Xa = this.Y = this.X = this.YOld = this.XOld = 0;
    this.PicHeight = this.PicWidth = 32;
    this.YFlip = this.XFlip = !1;
    this.Visible = !0;
    this.Image = a;
    this.Delta = 0;
    this.SpriteTemplate = null;
    this.Layer = 1;
  }
  Draw(a) {
    if (this.Visible) {
      let b = (this.XOld + (this.X - this.XOld) * this.Delta | 0) - this.XPicO;
      let c = (this.YOld + (this.Y - this.YOld) * this.Delta | 0) - this.YPicO;
      a.save();
      a.scale(
        this.XFlip ? -1 : 1,
        this.YFlip ? -1 : 1
      );
      a.translate(
        this.XFlip ? -320 : 0,
        this.YFlip ? -240 : 0
      );
      a.drawImage(
        this.Image,
        this.XPic * this.PicWidth,
        this.YPic * this.PicHeight,
        this.PicWidth,
        this.PicHeight,
        this.XFlip ? 320 - b - this.PicWidth : b,
        this.YFlip ? 240 - c - this.PicHeight : c,
        this.PicWidth,
        this.PicHeight
      );
      a.restore();
    }
  }
  Update(delta) {
    this.XOld = this.X;
    this.YOld = this.Y;
    this.Move();
    this.Delta = delta;
  }
  UpdateNoMove() {
    this.XOld = this.X;
    this.YOld = this.Y;
    this.Delta = 0;
  }
  Move() {
    this.X += this.Xa;
    this.Y += this.Ya;
  }
  GetX(x) {
    return (this.XOld + (this.X - this.XOld) * x | 0) - this.XPicO;
  }
  GetY(y) {
    return (this.YOld + (this.Y - this.YOld) * y | 0) - this.YPicO;
  }
  CollideCheck() { }
  BumpCheck() { }
  Release() { }
  ShellCollideCheck() {
    return !1;
  }
  FireballCollideCheck() {
    return !1;
  }
})();
Mario.Character = (() => class extends Mario.NotchSprite {
  constructor() {
    super(null);
    this.Fire = this.Large = !1;
    this.Coins = 0;
    this.Lives = 3;
    this.LevelString = "none";
    this.AirInertia = this.GroundInertia = .89;
    this.RunTime = 0;
    this.Sliding = this.Ducking = this.MayJump = this.OnGround = this.WasOnGround = !1;
    this.YJumpSpeed = this.XJumpSpeed = this.JumpTime = 0;
    this.CanShoot = !1;
    this.Width = 4;
    this.Height = 24;
    this.World = null;
    this.InvulnerableTime = this.WinTime = this.DeathTime = this.YDeathPos = this.XDeathPos = this.PowerUpTime = this.Facing = 0;
    this.Carried = null;
    this.NewFire = this.NewLarge = this.LastFire = this.LastLarge = !1;
  }
  Initialize(a) {
    this.World = a;
    this.X = 32;
    this.RunTime = this.PowerUpTime = this.Y = 0;
    this.Sliding = this.Ducking = this.MayJump = this.OnGround = this.WasOnGround = !1;
    this.YJumpSpeed = this.XJumpSpeed = this.JumpTime = 0;
    this.CanShoot = !1;
    this.Width = 4;
    this.Height = 24;
    this.World = a;
    this.InvulnerableTime = this.WinTime = this.DeathTime = this.YDeathPos = this.XDeathPos = this.PowerUpTime = this.Facing = 0;
    this.Carried = null;
    this.SetLarge(this.Large, this.Fire);
  }
  SetLarge(a, b) {
    b && (a = !0);
    a || (b = !1);
    this.LastLarge = this.Large;
    this.LastFire = this.Fire;
    this.Large = a;
    this.Fire = b;
    this.NewLarge = this.Large;
    this.NewFire = this.Fire;
    this.Blink(!0);
  }
  Blink(a) {
    this.Large = a ? this.NewLarge : this.LastLarge;
    this.Fire = a ? this.NewFire : this.LastFire;
    this.Image = this.Large ? this.Fire ? Enjine.Resources.Images.fireMario : Enjine.Resources.Images.mario : Enjine.Resources.Images.smallMario;
    this.XPicO = this.Large ? 16 : 8;
    this.YPicO = this.Large ? 31 : 15;
    this.PicWidth = this.PicHeight = this.Large ? 32 : 16;
  }
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
    }
    else {
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
  SubMove(a, b) {
    let c = !1;
    while (a > 8) {
      if (!this.SubMove(8, 0)) return !1;
      a -= 8;
    }
    while (a < -8) {
      if (!this.SubMove(-8, 0)) return !1;
      a += 8;
    }
    while (b > 8) {
      if (!this.SubMove(0, 8)) return !1;
      b -= 8;
    }
    while (b < -8) {
      if (!this.SubMove(0, -8)) return !1;
      b += 8;
    }
    let x = this.X + a;
    let y = this.Y + b;
    if (b > 0 && (
      this.IsBlocking(x - this.Width, y, a, 0) ||
      this.IsBlocking(x + this.Width, y, a, 0) ||
      this.IsBlocking(x - this.Width, y + 1, a, b) ||
      this.IsBlocking(x + this.Width, y + 1, a, b)
    )) c = !0;
    if (b < 0 && (
      this.IsBlocking(x, y - this.Height, a, b) || c ||
      this.IsBlocking(x - this.Width, y - this.Height, a, b) || c ||
      this.IsBlocking(x + this.Width, y - this.Height, a, b)
    )) c = !0;
    if (a > 0) {
      this.Sliding = !0;
      if (
        this.IsBlocking(x + this.Width, y - this.Height, a, b) ||
        this.IsBlocking(x + this.Width, y - (this.Height / 2 | 0), a, b) ||
        this.IsBlocking(x + this.Width, y, a, b)
      ) c = !0;
      else this.Sliding = !1;
    }
    if (a < 0) {
      this.Sliding = !0;
      if (
        this.IsBlocking(x - this.Width, y - this.Height, a, b) ||
        this.IsBlocking(x - this.Width, y - (this.Height / 2 | 0), a, b) ||
        this.IsBlocking(x - this.Width, y, a, b)
      ) c = !0;
      else this.Sliding = !1;
    }
    if (c) {
      if (a < 0) {
        this.X = ((this.X - this.Width) / 16 | 0) * 16 + this.Width;
        this.Xa = 0;
      } else if (a > 0) {
        this.X = ((this.X + this.Width) / 16 + 1 | 0) * 16 - this.Width - 1;
        this.Xa = 0;
      }
      if (b < 0) {
        this.Y = ((this.Y - this.Height) / 16 | 0) * 16 + this.Height;
        this.Ya = this.JumpTime = 0;
      } else if (b > 0) {
        this.Y = ((this.Y - 1) / 16 + 1 | 0) * 16 - 1;
        this.OnGround = !0;
      }
      return !1;
    } else {
      this.X += a;
      this.Y += b;
      return !0;
    }
  }
  IsBlocking(a, b, c, e) {
    a = a / 16 | 0;
    b = b / 16 | 0;
    if (a === (this.X / 16 | 0) && b === (this.Y / 16 | 0))
      return !1;
    let d = this.World.Level.GetBlock(a, b);
    if ((Mario.Tile.Behaviors[d & 255] & Mario.Tile.PickUpable) > 0) {
      this.GetCoin();
      Enjine.Resources.PlaySound("coin");
      this.World.Level.SetBlock(a, b, 0);
      for (let d = 0; d < 2; d++)
        for (let f = 0; f < 2; f++)
          this.World.AddSprite(new Mario.Sparkle(
            this.World,
            a * 16 + d * 8 + (Math.random() * 8 | 0),
            b * 16 + f * 8 + (Math.random() * 8 | 0),
            0, 0, 0, 2, 5
          ));
    }
    if ((d = this.World.Level.IsBlocking(a, b, c, e)) && e < 0) this.World.Bump(a, b, this.Large);
    return d;
  }
  Stomp(a) {
    let b = 0;
    if (!(this.DeathTime > 0 || this.World.Paused)) {
      b = a.Y - a.Height / 2;
      this.SubMove(0, b - this.Y);
      if (a instanceof Mario.Enemy || a instanceof Mario.BulletBill) {
        Enjine.Resources.PlaySound("kick");
        this.XJumpSpeed = 0;
        this.YJumpSpeed = -1.9;
        this.JumpTime = 8;
        this.Ya = this.JumpTime * this.YJumpSpeed;
        this.Sliding = this.OnGround = !1;
        this.InvulnerableTime = 1;
      } else if (a instanceof Mario.Shell) {
        if (Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.A) && a.Facing === 0) {
          this.Carried = a;
          a.Carried = !0;
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
  Win() {
    this.XDeathPos = this.X | 0;
    this.YDeathPos = this.Y | 0;
    this.World.Paused = !0;
    this.WinTime = 1;
    Enjine.Resources.PlaySound("exit");
  }
  Die() {
    this.XDeathPos = this.X | 0;
    this.YDeathPos = this.Y | 0;
    this.World.Paused = !0;
    this.DeathTime = 1;
    Enjine.Resources.PlaySound("death");
    this.SetLarge(!1, !1);
  }
  GetFlower() {
    if (!(this.DeathTime > 0 && this.World.Paused))
      if (this.Fire) {
        this.GetCoin();
        Enjine.Resources.PlaySound("coin");
      } else {
        this.World.Paused = !0;
        this.PowerUpTime = 18;
        Enjine.Resources.PlaySound("powerup");
        this.SetLarge(!0, !0);
      }
  }
  GetMushroom() {
    if (!(this.DeathTime > 0 && this.World.Paused))
      if (this.Large) {
        this.GetCoin();
        Enjine.Resources.PlaySound("coin");
      } else {
        this.World.Paused = !0;
        this.PowerUpTime = 18;
        Enjine.Resources.PlaySound("powerup");
        this.SetLarge(!0, !1);
      }
  }
  Kick(a) {
    if (!(this.DeathTime > 0 && this.World.Paused))
      if (Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.A)) {
        this.Carried = a;
        a.Carried = !0;
      } else {
        Enjine.Resources.PlaySound("kick");
        this.InvulnerableTime = 1;
      }
  }
  Get1Up() {
    Enjine.Resources.PlaySound("1up");
    this.Lives = Math.min(++this.Lives, 99);
  }
  GetCoin() {
    if (++this.Coins === 100) {
      this.Coins = 0;
      this.Get1Up();
    }
  }
})();
Mario.LevelRenderer = (() => class extends Enjine.Drawable {
  constructor(level, width, height) {
    super();
    this.Width = width;
    this.Height = height;
    this.Level = level;
    this.TilesY = (height / 16 | 0) + 1;
    this.AnimTime = this.Bounce = this.Tick = this.Delta = 0;
    this.Background = Mario.SpriteCuts.GetLevelSheet();
  }
  Update(a) {
    this.AnimTime += a;
    this.Tick = this.AnimTime | 0;
    this.Bounce += a * 30;
    this.Delta = a;
  }
  Draw(a, b) {
    this.DrawStatic(a, b);
    this.DrawDynamic(a, b);
  }
  DrawStatic(a, b) {
    for (let x = b.X / 16 | 0; x < ((b.X + this.Width) / 16 | 0) + 1; x++)
      for (let y = 0; y < this.TilesY; y++) {
        let level = this.Level.GetBlock(x, y) & 255;
        if ((Mario.Tile.Behaviors[level] & Mario.Tile.Animated) === 0) {
          level = this.Background[level % 16][level / 16 | 0];
          a.drawImage(Enjine.Resources.Images.map, level.X, level.Y, level.Width, level.Height, (x << 4) - b.X | 0, y << 4 | 0, level.Width, level.Height);
        }
      }
  }
  DrawDynamic(a, b) {
    for (let x = b.X / 16 | 0; x <= (b.X + this.Width) / 16 | 0; x++)
      for (let y = b.Y / 16 | 0; y <= (b.Y + this.Height) / 16 | 0; y++) {
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
          a.drawImage(Enjine.Resources.Images.map, level.X, level.Y, level.Width, level.Height, (x << 4) - b.X, (y << 4) - b.Y - g, level.Width, level.Height);
        }
      }
  }
  DrawExit0(a, b, c) {
    for (let y = this.Level.ExitY - 8; y < this.Level.ExitY; y++) {
      let bgc = this.Background[12][y === this.Level.ExitY - 8 ? 4 : 5];
      a.drawImage(Enjine.Resources.Images.map, bgc.X, bgc.Y, bgc.Width, bgc.Height, (this.Level.ExitX << 4) - b.X - 16, (y << 4) - b.Y, bgc.Width, bgc.Height);
    }
    if (c) {
      let y = this.Level.ExitY * 16 - 48 - Math.sin(this.AnimTime) * 48 - 8;
      let bgc = this.Background[12][3];
      a.drawImage(Enjine.Resources.Images.map, bgc.X, bgc.Y, bgc.Width, bgc.Height, (this.Level.ExitX << 4) - b.X - 16, y - b.Y, bgc.Width, bgc.Height);
      bgc = this.Background[13][3];
      a.drawImage(Enjine.Resources.Images.map, bgc.X, bgc.Y, bgc.Width, bgc.Height, (this.Level.ExitX << 4) - b.X, y - b.Y, bgc.Width, bgc.Height);
    }
  }
  DrawExit1(a, b) {
    for (let y = this.Level.ExitY - 8; y < this.Level.ExitY; y++) {
      let bgc = this.Background[13][y === this.Level.ExitY - 8 ? 4 : 5];
      a.drawImage(Enjine.Resources.Images.map, bgc.X, bgc.Y, bgc.Width, bgc.Height, (this.Level.ExitX << 4) - b.X + 16, (y << 4) - b.Y, bgc.Width, bgc.Height);
    }
  };
})();
Mario.LevelGenerator = (() => {
  return class {
    constructor(width, height) {
      this.Width = width;
      this.Height = height;
      this.Odds = [];
      this.Type = this.Difficulty = this.TotalOdds = 0;
    }
    CreateLevel(a, b) {
      this.Type = a;
      this.Difficulty = b;
      this.Odds[Mario.Odds.Straight] = 20;
      this.Odds[Mario.Odds.HillStraight] = 10;
      this.Odds[Mario.Odds.Tubes] = 2 + b;
      this.Odds[Mario.Odds.Jump] = 2 * b;
      this.Odds[Mario.Odds.Cannon] = -10 + 5 * b;
      this.Type !== Mario.LevelType.Overground && (this.Odds[Mario.Odds.HillStraight] = 0);
      for (let odd of this.Odds) {
        odd = Math.max(odd, 0);
        this.TotalOdds += odd;
        odd = this.TotalOdds - odd;
      }
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
      if (a === Mario.LevelType.Castle || a === Mario.LevelType.Underground) {
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
    BuildZone(a, b, c) {
      let e = Math.random() * this.TotalOdds | 0, d = 0;
      this.Odds.forEach((odd, index) => odd <= e && (d = index));
      let { Straight, HillStraight, Tubes, Jump, Cannons } = Mario.Odds;
      switch (d) {
        case Straight: return this.BuildStraight(a, b, c, !1);
        case HillStraight: return this.BuildHillStraight(a, b, c);
        case Tubes: return this.BuildTubes(a, b, c);
        case Jump: return this.BuildJump(a, b, c);
        case Cannons: return this.BuildCannons(a, b, c);
      } return 0;
    }
    BuildJump(a, b) {
      let c = (Math.random() * 4 | 0) + 2, e = c * 2 + ((Math.random() * 2 | 0) + 2), h = this.Height - 1 - (Math.random() * 4 | 0);
      for (let d = b; d < b + e; d++)
        if (d < b + c || d > b + e - c - 1)
          for (let f = 0; f < this.Height; f++)
            if (f >= h) a.SetBlock(d, f, 145);
            else if ((Math.random() * 3 | 0) === 0 && f >= h - (d < b + c ? d - b : b + e - d) + 1) a.SetBlock(d, f, 9);
      return e;
    }
    BuildCannons(a, b, c) {
      alert("cannons");
      let e = (Math.random() * 10 | 0) + 2, d = this.Height - 1 - Math.random() * 4 | 0, f = b + 1 + Math.random() * 4 | 0;
      e = Math.min(e, c);
      for (let g = b; g < b + e; g++) {
        g > f && (f += 2 * Math.random() * 4 | 0);
        f === b + e - 1 && (f += 10);
        let i = d - (Math.random() * 4 | 0) - 1;
        for (let h = 0; h < this.Height; h++)
          if (h >= d) a.SetBlock(g, h, 145);
          else if (g === f && h >= i) a.SetBlock(g, h, h === i ? 14 : h === i + 1 ? 30 : 46);
      }
      return e;
    }
    BuildHillStraight(a, b, c) {
      let e = (Math.random() * 10 | 0) + 10, d = this.Height - 1 - Math.random() * 4 | 0, h = d, i = !0, l = [];
      e = Math.min(e, c);
      for (let x = b; x < b + e; x++)
        for (let y = 0; y < this.Height; y++)
          y >= d && a.SetBlock(x, y, 145);
      for (this.AddEnemyLine(a, b + 1, b + e - 1, d - 1); i;) {
        h = h - 2 - Math.random() * 3 | 0;
        if (h <= 0) i = !1;
        else {
          let j = (Math.random() * 5 | 0) + 3;
          let k = (Math.random() * (e - j - 2) | 0) + b + 1;
          if (l[k - b] || l[k - b + j] || l[k - b - 1] || l[k - b + j + 1]) i = !1;
          else {
            l[k - b] = !0;
            l[k - b + j] = !0;
            this.AddEnemyLine(a, k, k + j, h - 1);
            if ((Math.random() * 4 | 0) === 0) {
              this.Decorate(a, k - 1, k + j + 1, h);
              i = !1;
            }
            for (let x = k; x < k + j; x++)
              for (let y = h; y < d; y++) {
                let m = 5;
                let n = 9;
                if (x === k) m = 4;
                else if (x === k + j - 1) m = 6;
                if (y === h) n = 8;
                switch (a.GetBlock(x, y)) {
                  case 0: a.SetBlock(x, y, m + n * 16); break;
                  case 132: a.SetBlock(x, y, 180); break;
                  case 134: a.SetBlock(x, y, 182); break;
                }
              }
          }
        }
      }
      return e;
    }
    AddEnemyLine(a, b, c, e) {
      for (let d = b; d < c; d++)
        if ((Math.random() * 35 | 0) < this.Difficulty + 1) {
          let f = Math.random() * 4 | 0;
          if (this.Difficulty < 1) f = Mario.Enemy.Goomba;
          else if (this.Difficulty < 3) f = Math.random() * 3 | 0;
          a.SetSpriteTemplate(d, e, new Mario.SpriteTemplate(f, (Math.random() * 35 | 0) < this.Difficulty));
        }
    }
    BuildTubes(a, b, c) {
      let e = (Math.random() * 10 | 0) + 5,
        d = this.Height - 1 - Math.random() * 4 | 0,
        f = b + 1 + Math.random() * 4 | 0,
        g = d - (Math.random() * 2 | 0) - 2;
      e = Math.min(e, c);
      for (let h = b; h < b + e; h++) {
        if (h > f + 1) {
          f += 3 + (Math.random() * 4 | 0);
          g = d - (Math.random() * 2 | 0) - 2;
        }
        if (f >= b + e - 2) f += 10;
        if (h === f && (Math.random() * 11 | 0) < this.Difficulty + 1) a.SetSpriteTemplate(h, g, new Mario.SpriteTemplate(Mario.Enemy.Flower, !1));
        for (let i = 0; i < this.Height; i++)
          if (i >= d) a.SetBlock(h, i, 145);
          else if ((h === f || h === f + 1) && i >= g) {
            let j = 10 + h - f;
            a.SetBlock(h, i, j + (i === g ? 0 : 16));
          }
      }
      return e;
    }
    BuildStraight(a, b, c, e) {
      let d = (Math.random() * 10 | 0) + 2, f = this.Height - 1 - (Math.random() * 4 | 0);
      if (e) d = 10 + (Math.random() * 5 | 0);
      d = Math.min(d, c);
      for (let g = b; g < b + d; g++)
        for (let h = 0; h < this.Height; h++)
          if (h >= f) a.SetBlock(g, h, 145);
      if (e || d > 5) this.Decorate(a, b, b + d, f);
      return d;
    }
    Decorate(a, b, c, e) {
      if (!(e < 1)) {
        let d = Math.random() * 4 | 0, f = Math.random() * 4 | 0;
        this.AddEnemyLine(a, b + 1, c - 1, e - 1);
        if (e - 2 > 0 && c - 1 - f - (b + 1 + d) > 1)
          for (let g = b + 1 + d; g < c - 1 - f; g++)
            a.SetBlock(g, e - 2, 34);
        d = Math.random() * 4 | 0;
        f = Math.random() * 4 | 0;
        if (e - 4 > 0 && c - 1 - f - (b + 1 + d) > 2)
          for (let g = b + 1 + d; g < c - 1 - f; g++)
            a.SetBlock(g, e - 4, g !== b + 1 && g !== c - 2 && (Math.random() * 3 | 0) === 0
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
    FixWalls(a) {
      let b = [];
      for (let x = 0; x < this.Width + 1; x++) {
        b[x] = [];
        for (let y = 0; y < this.Height + 1; y++) {
          let key = 0;
          for (let w = x - 1; w < x + 1; w++)
            for (let h = y - 1; h < y + 1; h++)
              if (a.GetBlockCapped(w, h) === 145) key++;
          b[x][y] = key === 4;
        }
      }
      this.Blockify(a, b, this.Width + 1, this.Height + 1);
    }
    Blockify(a, b, c, e) {
      let d = 0, f = [];
      for (let i = 0; i < 2; i++)
        f[i] = [];
      if (this.Type === Mario.LevelType.Castle) d = 8;
      else if (this.Type === Mario.LevelType.Underground) d = 12;
      for (let g = 0; g < c; g++)
        for (let h = 0; h < e; h++) {
          for (let i = g; i <= g + 1; i++)
            for (let j = h; j <= h + 1; j++) {
              let k = i;
              let l = j;
              if (k < 0) k = 0;
              if (l < 0) l = 0;
              if (k > c - 1) k = c - 1;
              if (l > e - 1) l = e - 1;
              f[i - g][j - h] = b[k][l];
            }
          switch (f[0][0]) {
            case f[1][0]:
              if (f[0][1] === f[1][1]) {
                if (f[0][0] === f[0][1]) {
                  if (f[0][0]) a.SetBlock(g, h, 145 + d);
                } else {
                  a.SetBlock(g, h, (f[0][0] ? 161 : 129) + d);
                }
              } else a.SetBlock(g, h, (f[0][0] ? f[0][1] ? 163 : 179 : f[0][1] ? 130 : 128) + d);
              break;
            case f[0][1]: if (f[1][0] === f[1][1]) a.SetBlock(g, h, (f[0][0] ? 146 : 144) + d); break;
            case f[1][1]: if (f[0][1] === f[1][0]) a.SetBlock(g, h, 145 + d); break;
            default:
              a.SetBlock(g, h, f[0][1] === f[1][1] ? (f[0][1] ? f[0][0] ? 147 : 131 : f[0][0] ? 162 : 160) + d : 1 + 16 * d);
          }
        }
    }
  }
})();
Mario.SpriteTemplate = (() => {
  return class {
    constructor(type, winged) {
      this.Type = type;
      this.Winged = winged;
      this.LastVisibleTick = -1;
      this.IsDead = !1;
      this.Sprite = null;
    }
    Spawn(a, b, c, e) {
      if (!this.IsDead) {
        this.Sprite = this.Type === Mario.Enemy.Flower
          ? new Mario.FlowerEnemy(a, b * 16 + 15, c * 16 + 24)
          : new Mario.Enemy(a, b * 16 + 8, c * 16 + 15, e, this.Type, this.Winged);
        this.Sprite.SpriteTemplate = this;
        a.AddSprite(this.Sprite);
      }
    }
  }
})();
Mario.Enemy = (() => {
  return class extends Mario.NotchSprite {
    constructor(world, x, y, facing, type, winged) {
      super();
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
      this.Image = Enjine.Resources.Images.enemies;
      this.XPicO = 8;
      this.YPicO = 31;
      this.AvoidCliffs = this.Type === Mario.Enemy.RedKoopa;
      this.NoFireballDeath = this.Type === Mario.Enemy.Spiky;
      this.YPic = this.Type;
      if (this.YPic > 1) this.Height = 12;
      this.Facing = facing;
      if (this.Facing === 0) this.Facing = 1;
      this.PicWidth = 16;
    }
    CollideCheck() {
      if (this.DeadTime === 0) {
        let a = Mario.MarioCharacter.X - this.X, b = Mario.MarioCharacter.Y - this.Y;
        if (a > -this.Width * 2 - 4 && a < this.Width * 2 + 4 && b > -this.Height && b < Mario.MarioCharacter.Height)
          if (this.Type !== Mario.Enemy.Spiky && Mario.MarioCharacter.Ya > 0 && b <= 0 && (!Mario.MarioCharacter.OnGround || !Mario.MarioCharacter.WasOnGround))
            if (Mario.MarioCharacter.Stomp(this), this.Winged) {
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
            Mario.MarioCharacter.GetHurt();
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
    SubMove(a, b) {
      let c = !1;
      while (a > 8) {
        if (!this.SubMove(8, 0)) return !1;
        a -= 8;
      }
      while (a < -8) {
        if (!this.SubMove(-8, 0)) return !1;
        a += 8;
      }
      while (b > 8) {
        if (!this.SubMove(0, 8)) return !1;
        b -= 8;
      }
      while (b < -8) {
        if (!this.SubMove(0, -8)) return !1;
        b += 8;
      }
      let x = this.X + a;
      let y = this.Y + b;
      if (b > 0 && (
        this.IsBlocking(x - this.Width, y, a, 0) ||
        this.IsBlocking(x + this.Width, y, a, 0) ||
        this.IsBlocking(x - this.Width, y + 1, a, b) ||
        this.IsBlocking(x + this.Width, y + 1, a, b)
      )) c = !0;
      if (b < 0 && (
        this.IsBlocking(x, y - this.Height, a, b) || c ||
        this.IsBlocking(x - this.Width, y - this.Height, a, b) || c ||
        this.IsBlocking(x + this.Width, y - this.Height, a, b)
      )) c = !0;
      if (a > 0 && (
        this.IsBlocking(x + this.Width, y - this.Height, a, b) ||
        this.IsBlocking(x + this.Width, y - (this.Height / 2 | 0), a, b) ||
        this.IsBlocking(x + this.Width, y, a, b) ||
        (this.AvoidCliffs && this.OnGround && !this.World.Level.IsBlocking((this.X + this.Xa + this.Width) / 16 | 0, this.Y / 16 + 1 | 0, this.Xa, 1))
      )) c = !0;
      if (a < 0 && (
        this.IsBlocking(x - this.Width, y - this.Height, a, b) ||
        this.IsBlocking(x - this.Width, y - (this.Height / 2 | 0), a, b) ||
        this.IsBlocking(x - this.Width, y, a, b) ||
        (this.AvoidCliffs && this.OnGround && !this.World.Level.IsBlocking((this.X + this.Xa - this.Width) / 16 | 0, this.Y / 16 + 1 | 0, this.Xa, 1))
      )) c = !0;
      if (c) {
        if (a < 0) {
          this.X = ((this.X - this.Width) / 16 | 0) * 16 + this.Width;
          this.Xa = 0;
        } if (a > 0) {
          this.X = ((this.X + this.Width) / 16 + 1 | 0) * 16 - this.Width - 1;
          this.Xa = 0;
        } if (b < 0) {
          this.Y = ((this.Y - this.Height) / 16 | 0) * 16 + this.Height;
          this.Ya = this.JumpTime = 0;
        } if (b > 0) {
          this.Y = ((this.Y - 1) / 16 + 1 | 0) * 16 - 1;
          this.OnGround = !0;
        }
        return !1;
      } else {
        this.X += a;
        this.Y += b;
        return !0;
      }
    }
    IsBlocking(a, b, c, e) {
      a = a / 16 | 0;
      b = b / 16 | 0;
      if (a === this.X / 16 | 0 && b === this.Y / 16 | 0)
        return !1;
      return this.World.Level.IsBlocking(a, b, c, e);
    }
    ShellCollideCheck(a) {
      if (this.DeadTime !== 0)
        return !1;
      let b = a.X - this.X, c = a.Y - this.Y;
      if (b > -16 && b < 16 && c > -this.Height && c < a.Height) {
        Enjine.Resources.PlaySound("kick");
        this.Xa = a.Facing * 2;
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
    FireballCollideCheck(a) {
      if (this.DeadTime !== 0)
        return !1;
      let b = a.X - this.X, c = a.Y - this.Y;
      if (b > -16 && b < 16 && c > -this.Height && c < a.Height) {
        if (this.NoFireballDeath)
          return !0;
        Enjine.Resources.PlaySound("kick");
        this.Xa = a.Facing * 2;
        this.Ya = -5;
        this.FlyDeath = !0;
        if (this.SpriteTemplate !== null)
          this.SpriteTemplate.IsDead = !0;
        this.DeadTime = 100;
        this.Winged = !1;
        return this.YFlip = !0;
      }
    }
    BumpCheck(a, b) {
      if (this.DeadTime === 0 && this.X + this.Width > a * 16 && this.X - this.Width < a * 16 + 16 && b === (this.Y - 1) / 16 | 0) {
        Enjine.Resources.PlaySound("kick");
        this.Xa = -Mario.MarioCharacter.Facing * 2;
        this.Ya = -5;
        this.FlyDeath = !0;
        if (this.SpriteTemplate !== null)
          this.SpriteTemplate.IsDead = !0;
        this.DeadTime = 100;
        this.Winged = !1;
        this.YFlip = !0;
      }
    }
    SubDraw = super.Draw;
    Draw(a, b) {
      if (this.Winged) {
        let c = (this.XOld + (this.X - this.XOld) * this.Delta | 0) - this.XPicO;
        let e = (this.YOld + (this.Y - this.YOld) * this.Delta | 0) - this.YPicO;
        if (this.Type !== Mario.Enemy.RedKoopa && this.Type !== Mario.Enemy.GreenKoopa) {
          this.XFlip = !this.XFlip;
          a.save();
          a.scale(this.XFlip ? -1 : 1, this.YFlip ? -1 : 1);
          a.translate(this.XFlip ? -320 : 0, this.YFlip ? -240 : 0);
          a.drawImage(
            this.Image,
            (this.WingTime / 4 | 0) % 2 * 16,
            128,
            16,
            32,
            this.XFlip ? 320 - c - 24 : c - 8,
            this.YFlip ? 240 - e - 32 : e - 8,
            16,
            32
          );
          a.restore();
          this.XFlip = !this.XFlip;
        }
      }
      this.SubDraw(a, b);
      if (this.Winged) {
        let c = (this.XOld + (this.X - this.XOld) * this.Delta | 0) - this.XPicO;
        let e = (this.YOld + (this.Y - this.YOld) * this.Delta | 0) - this.YPicO;
        a.save();
        a.scale(this.XFlip ? -1 : 1, this.YFlip ? -1 : 1);
        a.translate(this.XFlip ? -320 : 0, this.YFlip ? -240 : 0);
        a.drawImage(this.Image, (this.WingTime / 4 | 0) % 2 * 16, 128, 16, 32, this.XFlip ? 320 - c - 24 : c - 8, this.YFlip ? 240 - e - (this.Type === Mario.Enemy.RedKoopa && this.Type === Mario.Enemy.GreenKoopa ? 0 : 32) : e - 8, 16, 32);
        a.restore();
      }
    }
    RedKoopa = 0;
    GreenKoopa = 1;
    Goomba = 2;
    Spiky = 3;
    Flower = 4;
  }
})();
Mario.Fireball = (() => {
  return class extends Mario.NotchSprite {
    constructor(a, b, c, e) {
      super();
      this.AirInertia = this.GroundInertia = .89;
      this.Image = Enjine.Resources.Images.particles;
      this.World = a;
      this.X = b;
      this.Y = c;
      this.Facing = e;
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
    SubMove(a, b) {
      let c = !1;
      while (a > 8) {
        if (!this.SubMove(8, 0)) return !1;
        a -= 8;
      }
      while (a < -8) {
        if (!this.SubMove(-8, 0)) return !1;
        a += 8;
      }
      while (b > 8) {
        if (!this.SubMove(0, 8)) return !1;
        b -= 8;
      }
      while (b < -8) {
        if (!this.SubMove(0, -8)) return !1;
        b += 8;
      }
      let x = this.X + a;
      let y = this.Y + b;
      if (b > 0 && (
        this.IsBlocking(x - this.Width, y, a, 0) ||
        this.IsBlocking(x + this.Width, y, a, 0) ||
        this.IsBlocking(x - this.Width, y + 1, a, b) ||
        this.IsBlocking(x + this.Width, y + 1, a, b)
      )) c = !0;
      if (b < 0 && (
        this.IsBlocking(x, y - this.Height, a, b) || c ||
        this.IsBlocking(x - this.Width, y - this.Height, a, b) || c ||
        this.IsBlocking(x + this.Width, y - this.Height, a, b)
      )) c = !0;
      if (a > 0 && (
        this.IsBlocking(x + this.Width, y - this.Height, a, b) ||
        this.IsBlocking(x + this.Width, y - (this.Height / 2 | 0), a, b) ||
        this.IsBlocking(x + this.Width, y, a, b)
      )) c = !0;
      if (a < 0 && (
        this.IsBlocking(x - this.Width, y - this.Height, a, b) ||
        this.IsBlocking(x - this.Width, y - (this.Height / 2 | 0), a, b) ||
        this.IsBlocking(x - this.Width, y, a, b)
      )) c = !0;
      if (c) {
        if (a < 0) {
          this.X = ((this.X - this.Width) / 16 | 0) * 16 + this.Width;
          this.Xa = 0;
        } else if (a > 0) {
          this.X = ((this.X + this.Width) / 16 + 1 | 0) * 16 - this.Width - 1;
          this.Xa = 0;
        }
        if (b < 0) {
          this.Y = ((this.Y - this.Height) / 16 | 0) * 16 + this.Height;
          this.Ya = 0;
        } else if (b > 0) {
          this.Y = ((this.Y - 1) / 16 + 1 | 0) * 16 - 1;
          this.OnGround = !0;
        }
        return !1;
      }
      else {
        this.X += a;
        this.Y += b;
        return !0;
      }
    }
    IsBlocking(a, b, c, e) {
      a = a / 16 | 0;
      b = b / 16 | 0;
      if (a === this.X / 16 | 0 && b === this.Y / 16 | 0)
        return !1;
      return this.World.Level.IsBlocking(a, b, c, e);
    }
    Die() {
      this.Dead = !0;
      this.Xa = -this.Facing * 2;
      this.Ya = -5;
      this.DeadTime = 100;
    };
  }
})();
Mario.Sparkle = (() => {
  return class extends Mario.NotchSprite {
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
  }
})();
Mario.CoinAnim = (() => {
  return class extends Mario.NotchSprite {
    constructor(world, x, y) {
      super();
      this.World = world;
      this.Life = 10;
      this.Image = Enjine.Resources.Images.map;
      this.PicWidth = this.PicHeight = 16;
      this.X = x * 16;
      this.Y = y * 16 - 16;
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
  }
})();
Mario.Mushroom = (() => {
  return class extends Mario.NotchSprite {
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
      let a = Mario.MarioCharacter.X - this.X, b = Mario.MarioCharacter.Y - this.Y;
      if (a > -16 && a < 16 && b > -this.Height && b < Mario.MarioCharacter.Height) {
        Mario.MarioCharacter.GetMushroom();
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
    SubMove(a, b) {
      let c = !1;
      while (a > 8) {
        if (!this.SubMove(8, 0)) return !1;
        a -= 8;
      }
      while (a < -8) {
        if (!this.SubMove(-8, 0)) return !1;
        a += 8;
      }
      while (b > 8) {
        if (!this.SubMove(0, 8)) return !1;
        b -= 8;
      }
      while (b < -8) {
        if (!this.SubMove(0, -8)) return !1;
        b += 8;
      }
      let x = this.X + a;
      let y = this.Y + b;
      if (b > 0 && (
        this.IsBlocking(x - this.Width, y, a, 0) ||
        this.IsBlocking(x + this.Width, y, a, 0) ||
        this.IsBlocking(x - this.Width, y + 1, a, b) ||
        this.IsBlocking(x + this.Width, y + 1, a, b)
      )) c = !0;
      if (b < 0 && (
        this.IsBlocking(x, y - this.Height, a, b) || c ||
        this.IsBlocking(x - this.Width, y - this.Height, a, b) || c ||
        this.IsBlocking(x + this.Width, y - this.Height, a, b)
      )) c = !0;
      if (a > 0 && (
        this.IsBlocking(x + this.Width, y - this.Height, a, b) ||
        this.IsBlocking(x + this.Width, y - (this.Height / 2 | 0), a, b) ||
        this.IsBlocking(x + this.Width, y, a, b)
      )) c = !0;
      if (a < 0 && (
        this.IsBlocking(x - this.Width, y - this.Height, a, b) ||
        this.IsBlocking(x - this.Width, y - (this.Height / 2 | 0), a, b) ||
        this.IsBlocking(x - this.Width, y, a, b)
      )) c = !0;
      if (c) {
        if (a < 0) {
          this.X = ((this.X - this.Width) / 16 | 0) * 16 + this.Width;
          this.Xa = 0;
        } else if (a > 0) {
          this.X = ((this.X + this.Width) / 16 + 1 | 0) * 16 - this.Width - 1;
          this.Xa = 0;
        }
        if (b < 0) {
          this.Y = ((this.Y - this.Height) / 16 | 0) * 16 + this.Height;
          this.Ya = this.JumpTime = 0;
        } else if (b > 0) {
          this.Y = ((this.Y - 1) / 16 + 1 | 0) * 16 - 1;
          this.OnGround = !0;
        }
        return !1;
      }
      else {
        this.X += a;
        this.Y += b;
        return !0;
      }
    }
    IsBlocking(a, b, c, e) {
      a = a / 16 | 0;
      b = b / 16 | 0;
      if (a === this.X / 16 | 0 && b === this.Y / 16 | 0)
        return !1;
      return this.World.Level.IsBlocking(a, b, c, e);
    }
    BumpCheck(a, b) {
      if (this.X + this.Width > a * 16 && this.X - this.Width < a * 16 - 16 && b === (b - 1) / 16 | 0) {
        this.Facing = -Mario.MarioCharacter.Facing;
        this.Ya = -10;
      }
    }
  }
})();
Mario.Particle = (() => {
  return class extends Mario.NotchSprite {
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
  }
})();
Mario.FireFlower = (() => {
  return class extends Mario.NotchSprite {
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
      let x = Mario.MarioCharacter.X - this.X, y = Mario.MarioCharacter.Y - this.Y;
      if (x > -16 && x < 16 && y > -this.Height && y < Mario.MarioCharacter.Height) {
        Mario.MarioCharacter.GetFlower();
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
  }
})();
Mario.BulletBill = (() => {
  return class extends Mario.NotchSprite {
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
        let x = Mario.MarioCharacter.X - this.X, y = Mario.MarioCharacter.Y - this.Y;
        if (x > -16 && x < 16 && y > -this.Height && y < this.World.Mario.Height)
          if (Mario.MarioCharacter.Y > 0 && y <= 0 && (!Mario.MarioCharacter.OnGround || !Mario.MarioCharacter.WasOnGround)) {
            Mario.MarioCharacter.Stomp(this);
            this.Dead = !0;
            this.Xa = 0;
            this.Ya = 1;
            this.DeadTime = 100;
          } else Mario.MarioCharacter.GetHurt();
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
    SubMove(a) {
      this.X += a;
      return !0;
    }
    FireballCollideCheck(a) {
      if (this.DeadTime !== 0)
        return !1;
      let x = a.X - this.X, y = a.Y - this.Y;
      if (x > -16 && x < 16 && y > -this.Height && y < a.Height)
        return !0;
      return !1;
    }
    ShellCollideCheck(a) {
      if (this.DeadTime !== 0)
        return !1;
      let x = a.X - this.X, y = a.Y - this.Y;
      if (x > -16 && x < 16 && y > -this.Height && y < a.Height)
        return Enjine.Resources.PlaySound("kick"), this.Dead = !0, this.Xa = 0, this.Ya = 1, this.DeadTime = 100, !0;
      return !1;
    };
  }
})();
Mario.FlowerEnemy = (() => {
  return class extends Mario.Enemy {
    constructor(world, x, y) {
      super();
      this.Image = Enjine.Resources.Images.enemies;
      this.World = world;
      this.X = x;
      this.Y = y;
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
          let a = Math.abs(Mario.MarioCharacter.X - this.X) | 0;
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
  }
})();
Mario.Shell = (() => {
  return class extends Mario.NotchSprite {
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
    FireballCollideCheck(a) {
      if (this.DeadTime !== 0)
        return !1;
      let x = a.X - this.X, y = a.Y - this.Y;
      if (x > -16 && x < 16 && y > -this.Height && y < a.Height) {
        if (this.Facing !== 0)
          return !0;
        Enjine.Resources.PlaySound("kick");
        this.Xa = a.Facing * 2;
        this.Ya = -5;
        if (this.SpriteTemplate !== null)
          this.SpriteTemplate.IsDead = !0;
        this.DeadTime = 100;
        return this.YFlip = !0;
      } return !1;
    }
    CollideCheck() {
      if (!this.Carried && !(this.Dead || this.DeadTime > 0)) {
        let a = Mario.MarioCharacter.X - this.X, b = Mario.MarioCharacter.Y - this.Y;
        if (a > -16 && a < 16 && b > -this.Height && b < Mario.MarioCharacter.Height) {
          if (Mario.MarioCharacter.Ya > 0 && b <= 0 && (!Mario.MarioCharacter.OnGround || !Mario.MarioCharacter.WasOnGround)) {
            Mario.MarioCharacter.Stomp(this);
            if (this.Facing = this.Facing !== 0) this.Xa = 0;
            else Mario.MarioCharacter.Facing;
          } else if (this.Facing !== 0) {
            Mario.MarioCharacter.GetHurt();
          } else {
            Mario.MarioCharacter.Kick(this);
            this.Facing = Mario.MarioCharacter.Facing;
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
    SubMove(a, b) {
      let c = !1;
      while (a > 8) {
        if (!this.SubMove(8, 0)) return !1;
        a -= 8;
      }
      while (a < -8) {
        if (!this.SubMove(-8, 0)) return !1;
        a += 8;
      }
      while (b > 8) {
        if (!this.SubMove(0, 8)) return !1;
        b -= 8;
      }
      while (b < -8) {
        if (!this.SubMove(0, -8)) return !1;
        b += 8;
      }
      let x = this.X + a;
      let y = this.Y + b;
      if (b > 0 && (
        this.IsBlocking(x - this.Width, y + b, a, 0) ||
        this.IsBlocking(x + this.Width, y + b, a, 0) ||
        this.IsBlocking(x - this.Width, y + b + 1, a, b) ||
        this.IsBlocking(x + this.Width, y + b + 1, a, b)
      )) c = !0;
      if (b < 0 && (
        this.IsBlocking(x, y + b - this.Height, a, b) || c ||
        this.IsBlocking(x - this.Width, y + b - this.Height, a, b) || c ||
        this.IsBlocking(x + this.Width, y + b - this.Height, a, b)
      )) c = !0;
      if (a > 0 && (
        this.IsBlocking(x + this.Width, y + b - this.Height, a, b) ||
        this.IsBlocking(x + this.Width, y + b - (this.Height / 2 | 0), a, b) ||
        this.IsBlocking(x + this.Width, y + b, a, b)
      )) c = !0;
      if (a < 0 && (
        this.IsBlocking(x - this.Width, y + b - this.Height, a, b) ||
        this.IsBlocking(x - this.Width, y + b - (this.Height / 2 | 0), a, b) ||
        this.IsBlocking(x - this.Width, y + b, a, b)
      )) c = !0;
      if (c) {
        if (a < 0) {
          this.X = ((this.X - this.Width) / 16 | 0) * 16 + this.Width;
          this.Xa = 0;
        } else if (a > 0) {
          this.X = ((this.X + this.Width) / 16 + 1 | 0) * 16 - this.Width - 1;
          this.Xa = 0;
        }
        if (b < 0) {
          this.Y = ((this.Y - this.Height) / 16 | 0) * 16 + this.Height;
          this.Ya = 0;
        } else if (b > 0) {
          this.Y = ((this.Y - 1) / 16 + 1 | 0) * 16 - 1;
          this.OnGround = !0;
        }
        return !1;
      }
      else {
        this.X += a;
        this.Y += b;
        return !0;
      }
    }
    IsBlocking(a, b, c, e) {
      a = a / 16 | 0;
      b = b / 16 | 0;
      if (a === (this.X / 16 | 0) && b === (this.Y / 16 | 0))
        return !1;
      let d = this.World.Level.IsBlocking(a, b, c, e);
      if (d && e === 0 && c !== 0) this.World.Bump(a, b, !0);
      return d;
    }
    BumpCheck(a, b) {
      if (this.X + this.Width > a * 16 && this.X - this.Width < a * 16 + 16 && b === ((this.Y - 1) / 16 | 0)) {
        this.Facing = -Mario.MarioCharacter.Facing;
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
    ShellCollideCheck(a) {
      if (this.DeadTime !== 0)
        return !1;
      let x = a.X - this.X, y = a.Y - this.Y;
      if (x > -16 && x < 16 && y > -this.Height && y < a.Height) {
        Enjine.Resources.PlaySound("kick");
        if (Mario.MarioCharacter.Carried === a || Mario.MarioCharacter.Carried === this)
          Mario.MarioCharacter.Carried = null;
        this.Die();
        a.Die();
        return !0;
      } return !1;
    }
    Release() {
      this.Carried = !1;
      this.Facing = Mario.MarioCharacter.Facing;
      this.X += this.Facing * 8;
    }
  }
})();
Mario.TitleState = (() => {
  return class extends Enjine.GameState {
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
      Mario.MarioCharacter = new Mario.Character;
      Mario.MarioCharacter.Image = Enjine.Resources.Images.smallMario;
    }
    Exit() {
      this.drawManager.Clear();
      delete this.drawManager;
      delete this.camera;
      delete this.font;
    }
    Update(a) {
      this.bounce += a * 2;
      this.logoY = 20 + Math.sin(this.bounce) * 10;
      this.camera.X += a * 25;
      this.drawManager.Update(a);
    }
    Draw(a) {
      this.drawManager.Draw(a, this.camera);
      a.drawImage(Enjine.Resources.Images.title, 0, 120);
      a.drawImage(Enjine.Resources.Images.logo, 0, this.logoY);
      this.font.Draw(a, this.Camera);
    }
    CheckForChange(a) {
      Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.S) && a.ChangeState(Mario.GlobalMapState);
    };
  }
})();
Mario.LoadingState = (() => {
  return class extends Enjine.GameState {
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
      (new Audio).canPlayType("audio/mp3")
        ? Enjine.Resources.AddSound("1up", "sounds/1-up.mp3", 1).AddSound("breakblock", "sounds/breakblock.mp3").AddSound("bump", "sounds/bump.mp3", 4).AddSound("cannon", "sounds/cannon.mp3").AddSound("coin", "sounds/coin.mp3", 5).AddSound("death", "sounds/death.mp3", 1).AddSound("exit", "sounds/exit.mp3", 1).AddSound("fireball", "sounds/fireball.mp3", 1).AddSound("jump", "sounds/jump.mp3").AddSound("kick", "sounds/kick.mp3").AddSound("pipe", "sounds/pipe.mp3", 1).AddSound("powerdown", "sounds/powerdown.mp3", 1).AddSound("powerup", "sounds/powerup.mp3", 1).AddSound("sprout", "sounds/sprout.mp3", 1).AddSound("stagestart", "sounds/stagestart.mp3", 1).AddSound("stomp", "sounds/stomp.mp3", 2)
        : Enjine.Resources.AddSound("1up", "sounds/1-up.wav", 1).AddSound("breakblock", "sounds/breakblock.wav").AddSound("bump", "sounds/bump.wav", 2).AddSound("cannon", "sounds/cannon.wav").AddSound("coin", "sounds/coin.wav", 5).AddSound("death", "sounds/death.wav", 1).AddSound("exit", "sounds/exit.wav", 1).AddSound("fireball", "sounds/fireball.wav", 1).AddSound("jump", "sounds/jump.wav", 1).AddSound("kick", "sounds/kick.wav", 1).AddSound("message", "sounds/message.wav", 1).AddSound("pipe", "sounds/pipe.wav", 1).AddSound("powerdown", "sounds/powerdown.wav", 1).AddSound("powerup", "sounds/powerup.wav", 1).AddSound("sprout", "sounds/sprout.wav", 1).AddSound("stagestart", "sounds/stagestart.wav", 1).AddSound("stomp", "sounds/stomp.wav", 1);
      Mario.Tile.LoadBehaviors();
    };
    Exit() {
      delete this.Images;
    };
    Update(a) {
      if (!this.ImagesLoaded) {
        this.ImagesLoaded = !0;
        for (let image of this.Images)
          if (Enjine.Resources.Images[image.name].complete !== !0) {
            this.ImagesLoaded = !1;
            break;
          }
      }
      this.ScreenColor += this.ColorDirection * 255 * a;
      if (this.ScreenColor > 255) {
        this.ScreenColor = 255;
        this.ColorDirection = -1;
      } else if (this.ScreenColor < 0) {
        this.ScreenColor = 0;
        this.ColorDirection = 1;
      }
    };
    Draw(ctx) {
      if (this.ImagesLoaded)
        ctx.fillStyle = "rgb(0, 0, 0)";
      else {
        let color = parseInt(this.ScreenColor, 10);
        ctx.fillStyle = `rgb(${color}, ${color}, ${color})`;
      } ctx.fillRect(0, 0, 640, 480);
    };
    CheckForChange(title) {
      if (this.ImagesLoaded) {
        Mario.GlobalMapState = new Mario.MapState;
        title.ChangeState(new Mario.TitleState);
      }
    };
  }
})();
Mario.LoseState = (() => {
  return class extends Enjine.GameState {
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
    Update(a) {
      this.drawManager.Update(a);
      if (Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.S))
        this.wasKeyDown = !0;
    }
    Draw(a) {
      this.drawManager.Draw(a, this.camera);
    }
    CheckForChange(a) {
      if (this.wasKeyDown && !Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.S)) a.ChangeState(new Mario.TitleState);
    }
  }
})();
Mario.WinState = (() => {
  return class extends Enjine.GameState {
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
    CheckForChange(a) {
      this.waitTime <= 0 && this.wasKeyDown && !Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.S) && a.ChangeState(new Mario.TitleState);
    };
  }
})();
Mario.MapState = (() => {
  return class extends Enjine.GameState {
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
      this.LargeMario.PlaySequence(Mario.MarioCharacter.Fire ? "fire" : "large", !0);
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
    FindConnection(width, height) {
      for (let x = 0; x < width; x++)
        for (let y = 0; y < height; y++)
          if (this.Level[x][y] === Mario.MapTile.Level && this.Data[x][y] === -1) {
            this.Connect(x, y, width, height);
            return !0;
          }
      return !1;
    }
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
            Mario.MarioCharacter.LevelString = difficulty + "-";
            let type = Mario.LevelType.Overground;
            if (this.Data[x][y] > 1 && (Math.random() * 3 | 0) === 0)
              type = Mario.LevelType.Underground;
            this.Data[x][y] < 0 ? (this.Data[x][y] === -2 ? (Mario.MarioCharacter.LevelString += "X", difficulty += 2) : this.Data[x][y] === -1 ? Mario.MarioCharacter.LevelString += "?" : (Mario.MarioCharacter.LevelString += "#", difficulty += 1), type = Mario.LevelType.Castle) : Mario.MarioCharacter.LevelString += this.Data[x][y];
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
        let mario = `${Mario.MarioCharacter.Large ? "Large" : "Small"}Mario`;
        this[mario].X = this.XMario + this.XMarioA * sprite | 0;
        this[mario].Y = this.YMario + (this.YMarioA * sprite | 0) - (Mario.MarioCharacter.Large ? 22 : 6);
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
        Mario.MarioCharacter.Large ? this.LargeMario.Draw(a, this.camera) : this.SmallMario.Draw(a, this.camera);
        this.FontShadow.Strings[0] = { String: "MARIO " + Mario.MarioCharacter.Lives, X: 5, Y: 5 };
        this.FontShadow.Strings[1] = { String: "WORLD " + (this.WorldNumber + 1), X: 257, Y: 5 };
        this.FontShadow.Draw(a, this.camera);
        this.Font.Strings[0] = { String: "MARIO " + Mario.MarioCharacter.Lives, X: 4, Y: 4 };
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
    CheckForChange(a) {
      if (this.WorldNumber === 8) a.ChangeState(new Mario.WinState);
      if (this.EnterLevel) a.ChangeState(new Mario.LevelState(this.LevelDifficulty, this.LevelType));
    }
  }
})();
Mario.LevelState = (() => {
  return class extends Enjine.GameState {
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
      for (let a = 0; a < 2; a++) {
        let b = 4 >> a;
        let c = ((this.Level.Width * 16 - 320) / b | 0) + 320;
        let e = ((this.Level.Height * 16 - 240) / b | 0) + 240;
        c = new Mario.BackgroundGenerator(c / 32 + 1, e / 32 + 1, a === 0, this.LevelType);
        this.BgLayer[a] = new Mario.BackgroundRenderer(c.CreateLevel(), 320, 240, b);
      }
      Mario.MarioCharacter.Initialize(this);
      this.Sprites.Add(Mario.MarioCharacter);
      this.StartTime = 1;
      this.TimeLeft = 200;
      this.GotoLoseState = this.GotoMapState = !1;
    };
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
    };
    CheckShellCollide(a) {
      this.ShellsToCheck.push(a);
    };
    CheckFireballCollide(a) {
      this.FireballsToCheck.push(a);
    };
    Update(a) {
      this.Delta = a;
      this.TimeLeft -= a;
      (this.TimeLeft | 0) === 0 && Mario.MarioCharacter.Die();
      this.StartTime > 0 && this.StartTime++;
      this.Camera.X = Mario.MarioCharacter.X - 160;
      let b;
      if (this.Camera.X < 0)
        this.Camera.X = 0;
      if (this.Camera.X > this.Level.Width * 16 - 320)
        this.Camera.X = this.Level.Width * 16 - 320;
      for (let b = this.FireballsOnScreen = 0; b < this.Sprites.Objects.length; b++) {
        let d = this.Sprites.Objects[b];
        if (d !== Mario.MarioCharacter) {
          let c = d.X - this.Camera.X;
          let e = d.Y - this.Camera.Y;
          if (c < -64 || c > 384 || e < -64 || e > 304) this.Sprites.RemoveAt(b);
          else if (d instanceof Mario.Fireball) this.FireballsOnScreen++;
        }
      }
      if (this.Paused)
        for (b = 0; b < this.Sprites.Objects.length; b++)
          this.Sprites.Objects[b] === Mario.MarioCharacter ? this.Sprites.Objects[b].Update(a) : this.Sprites.Objects[b].UpdateNoMove(a);
      else {
        this.Layer.Update(a);
        this.Level.Update();
        this.Tick++;
        for (let c = (this.Camera.X / 16 | 0) - 1; c <= ((this.Camera.X + this.Layer.Width) / 16 | 0) + 1; c++)
          for (let e = (this.Camera.Y / 16 | 0) - 1; e <= ((this.Camera.Y + this.Layer.Height) / 16 | 0) + 1; e++) {
            let d = 0;
            c * 16 + 8 > Mario.MarioCharacter.X + 16 && (d = -1);
            c * 16 + 8 < Mario.MarioCharacter.X - 16 && (d = 1);
            let f = this.Level.GetSpriteTemplate(c, e);
            if (f !== null)
              f.LastVisibleTick !== this.Tick - 1 && (f.Sprite === null || !this.Sprites.Contains(f.Sprite)) && f.Spawn(this, c, e, d), f.LastVisibleTick = this.Tick;
            if (d !== 0 && (f = this.Level.GetBlock(c, e), (Mario.Tile.Behaviors[f & 255] & Mario.Tile.Animated) > 0 && (f % 16 / 4 | 0) === 3 && (f / 16 | 0) === 0 && (this.Tick - c * 2) % 100 === 0)) {
              for (let b = 0; b < 8; b++)
                this.AddSprite(new Mario.Sparkle(this, c * 16 + 8, e * 16 + (Math.random() * 16 | 0), Math.random() * d, 0, 0, 1, 5));
              this.AddSprite(new Mario.BulletBill(this, c * 16 + 8 + d * 8, e * 16 + 15, d));
            }
          }
        b && Enjine.Resources.PlaySound("cannon");
        for (let b = 0; b < this.Sprites.Objects.length; b++)
          this.Sprites.Objects[b].Update(a);
        for (let b = 0; b < this.Sprites.Objects.length; b++)
          this.Sprites.Objects[b].CollideCheck();
        for (let b = 0; b < this.ShellsToCheck.length; b++)
          for (let c = 0; c < this.Sprites.Objects.length; c++)
            if (this.Sprites.Objects[c] !== this.ShellsToCheck[b] && !this.ShellsToCheck[b].Dead && this.Sprites.Objects[c].ShellCollideCheck(this.ShellsToCheck[b]) && Mario.MarioCharacter.Carried === this.ShellsToCheck[b] && !this.ShellsToCheck[b].Dead)
              Mario.MarioCharacter.Carried = null, this.ShellsToCheck[b].Die();
        for (let b = this.ShellsToCheck.length = 0; b < this.FireballsToCheck.length; b++)
          for (let c = 0; c < this.Sprites.Objects.length; c++)
            this.Sprites.Objects[c] !== this.FireballsToCheck[b] && !this.FireballsToCheck[b].Dead && this.Sprites.Objects[c].FireballCollideCheck(this.FireballsToCheck[b]) && this.FireballsToCheck[b].Die();
        this.FireballsToCheck.length = 0;
      }
      this.Sprites.AddRange(this.SpritesToAdd);
      this.Sprites.RemoveList(this.SpritesToRemove);
      this.SpritesToAdd.length = 0;
      this.SpritesToRemove.length = 0;
      this.Camera.X = Mario.MarioCharacter.XOld + (Mario.MarioCharacter.X - Mario.MarioCharacter.XOld) * a - 160;
      this.Camera.Y = Mario.MarioCharacter.YOld + (Mario.MarioCharacter.Y - Mario.MarioCharacter.YOld) * a - 120;
    };
    Draw(a) {
      this.Camera.X = Math.max(this.Camera.X, 0);
      this.Camera.Y = Math.max(this.Camera.Y, 0);
      this.Camera.X = Math.min(this.Camera.X, this.Level.Width * 16 - 320);
      this.Camera.Y = Math.min(this.Camera.Y, this.Level.Height * 16 - 240);
      for (let b = 0; b < 2; b++)
        this.BgLayer[b].Draw(a, this.Camera);
      a.save();
      a.translate(-this.Camera.X, -this.Camera.Y);
      for (let Obj of this.Sprites.Objects)
        if (Obj.Layer === 0) Obj.Draw(a, this.Camera);
      a.restore();
      this.Layer.Draw(a, this.Camera);
      this.Layer.DrawExit0(a, this.Camera, Mario.MarioCharacter.WinTime === 0);
      a.save();
      a.translate(-this.Camera.X, -this.Camera.Y);
      for (let Obj of this.Sprites.Objects)
        Obj.Layer === 1 && Obj.Draw(a, this.Camera);
      a.restore();
      this.Layer.DrawExit1(a, this.Camera);
      this.DrawStringShadow(a, "MARIO " + Mario.MarioCharacter.Lives, 0, 0);
      this.DrawStringShadow(a, "00000000", 0, 1);
      this.DrawStringShadow(a, "COIN", 14, 0);
      this.DrawStringShadow(a, " " + Mario.MarioCharacter.Coins, 14, 1);
      this.DrawStringShadow(a, "WORLD", 24, 0);
      this.DrawStringShadow(a, " " + Mario.MarioCharacter.LevelString, 24, 1);
      this.DrawStringShadow(a, "TIME", 34, 0);
      let b = Math.max(this.TimeLeft | 0, 0);
      this.DrawStringShadow(a, " " + b, 34, 1);
      this.StartTime > 0 && (b = this.StartTime + this.Delta - 2, this.RenderBlackout(a, 160, 120, b * b * .6 | 0));
      if (Mario.MarioCharacter.WinTime > 0) {
        let b = Mario.MarioCharacter.WinTime + this.Delta;
        b *= b * .2;
        if (b > 900)
          Mario.GlobalMapState.LevelWon(), this.GotoMapState = !0;
        this.RenderBlackout(a, Mario.MarioCharacter.XDeathPos - this.Camera.X | 0, Mario.MarioCharacter.YDeathPos - this.Camera.Y | 0, 320 - b | 0);
      }
      if (Mario.MarioCharacter.DeathTime > 0) {
        let b = Mario.MarioCharacter.DeathTime + this.Delta;
        b *= b * .1;
        if (b > 900 && (Mario.MarioCharacter.Lives--, this.GotoMapState = !0, Mario.MarioCharacter.Lives <= 0))
          this.GotoLoseState = !0;
        this.RenderBlackout(a, Mario.MarioCharacter.XDeathPos - this.Camera.X | 0, Mario.MarioCharacter.YDeathPos - this.Camera.Y | 0, 320 - b | 0);
      }
    };
    DrawStringShadow(a, b, c, e) {
      this.Font.Strings[0] = { String: b, X: c * 8 + 4, Y: e * 8 + 4 };
      this.FontShadow.Strings[0] = { String: b, X: c * 8 + 5, Y: e * 8 + 5 };
      this.FontShadow.Draw(a, this.Camera);
      this.Font.Draw(a, this.Camera);
    };
    RenderBlackout(a, b, c, e) {
      if (!(e > 320)) {
        let d = [], f = [];
        for (let g = 0; g < 16; g++) {
          d[g] = b + Math.cos(g * Math.PI / 15) * e | 0;
          f[g] = c + Math.sin(g * Math.PI / 15) * e | 0;
        }
        d[16] = 0;
        f[16] = c;
        d[17] = 0;
        f[17] = 240;
        d[18] = 320;
        f[18] = 240;
        d[19] = 320;
        f[19] = c;
        a.fillStyle = "#000";
        a.beginPath();
        a.moveTo(d[19], f[19]);
        for (let g = 18; g >= 0; g--)
          a.lineTo(d[g], f[g]);
        a.closePath();
        a.fill();
        for (let g = 0; g < 16; g++) {
          d[g] = b - Math.cos(g * Math.PI / 15) * e | 0;
          f[g] = c - Math.sin(g * Math.PI / 15) * e | 0;
        }
        f[15] += 5;
        d[16] = 320;
        f[16] = c;
        d[17] = 320;
        f[17] = 0;
        d[18] = 0;
        f[18] = 0;
        d[19] = 0;
        f[19] = c;
        a.fillStyle = "#000";
        a.beginPath();
        a.moveTo(d[0], f[0]);
        for (let g = 0; g <= d.length - 1; g++)
          a.lineTo(d[g], f[g]);
        a.closePath();
        a.fill();
      }
    };
    AddSprite(a) {
      this.Sprites.Add(a);
    };
    RemoveSprite(a) {
      this.Sprites.Remove(a);
    };
    Bump(a, b, c) {
      let e = this.Level.GetBlock(a, b);
      if ((Mario.Tile.Behaviors[e & 255] & Mario.Tile.Bumpable) > 0) {
        this.BumpInto(a, b - 1);
        this.Level.SetBlock(a, b, 4);
        this.Level.SetBlockData(a, b, 4);
        if ((Mario.Tile.Behaviors[e & 255] & Mario.Tile.Special) > 0) {
          Enjine.Resources.PlaySound("sprout");
          if (Mario.MarioCharacter.Large) this.AddSprite(new Mario.FireFlower(this, a * 16 + 8, b * 16 + 8));
          else this.AddSprite(new Mario.Mushroom(this, a * 16 + 8, b * 16 + 8));
        } else {
          Mario.MarioCharacter.GetCoin();
          Enjine.Resources.PlaySound("coin");
          this.AddSprite(new Mario.CoinAnim(this, a, b));
        }
      }
      if ((Mario.Tile.Behaviors[e & 255] & Mario.Tile.Breakable) > 0 && (this.BumpInto(a, b - 1), c)) {
        Enjine.Resources.PlaySound("breakblock");
        this.Level.SetBlock(a, b, 0);
        for (let d = 0; d < 2; d++)
          for (let f = 0; f < 2; f++)
            this.AddSprite(new Mario.Particle(this, a * 16 + d * 8 + 4, b * 16 + f * 8 + 4, (d * 2 - 1) * 4, (f * 2 - 1) * 4 - 8));
      }
    };
    BumpInto(a, b) {
      if ((Mario.Tile.Behaviors[this.Level.GetBlock(a, b) & 255] & Mario.Tile.PickUpable) > 0) {
        Mario.MarioCharacter.GetCoin();
        Enjine.Resources.PlaySound("coin");
        this.Level.SetBlock(a, b, 0);
        this.AddSprite(new Mario.CoinAnim(a, b + 1));
      }
      this.Sprites.Objects.forEach(obj => obj.BumpCheck(a, b));
    };
    CheckForChange(a) {
      if (this.GotoLoseState) a.ChangeState(new Mario.LoseState);
      else if (this.GotoMapState) a.ChangeState(Mario.GlobalMapState);
    };
  }
})();
