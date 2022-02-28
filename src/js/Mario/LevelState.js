import { Enjine } from "../Enjine/index.js";
import { DrawableManager } from "../Enjine/DrawableManager.js";
import { Camera } from "../Enjine/Camera.js";
import { GameState } from "../Enjine/GameState.js";
import { Mario } from "./index.js";
import { Fireball } from "./Fireball.js";

/**
 * 关卡状态
 * @extends GameState
 */
export class LevelState extends GameState {
  /**
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
    this.Sprites = new DrawableManager;
    this.Camera = new Camera;
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
        if (x < -64 || x > 384 || y < -64 || y > 304)
          this.Sprites.RemoveAt(i);
        else if (Obj instanceof Fireball)
          this.FireballsOnScreen++;
      }
    });
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
      if (Obj.Layer === 0)
        Obj.Draw(ctx, this.Camera);
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
   * @param { Shell | Mario["BulletBill"] | Mario["Sparkle"] | Mario["FireFlower"] | Mario["Mushroom"] | Mario["CoinAnim"] | Mario["Particle"]} sprite
   */
  AddSprite(sprite) {
    this.Sprites.Add(sprite);
  }
  /**
   * 移除部件
   * @param { Shell | Mario["BulletBill"] | Mario["Sparkle"] | Mario["FireFlower"] | Mario["Mushroom"] | Mario["CoinAnim"] | Mario["Particle"]} sprite
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
        if (Mario.Character.Large)
          this.AddSprite(new Mario.FireFlower(this, x * 16 + 8, y * 16 + 8));
        else
          this.AddSprite(new Mario.Mushroom(this, x * 16 + 8, y * 16 + 8));
      }
      else {
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
   * @param {GameStateContext} ctx
   */
  CheckForChange(ctx) {
    if (this.GotoLoseState)
      ctx.ChangeState(new Mario.LoseState);
    else if (this.GotoMapState)
      ctx.ChangeState(Mario.GlobalMapState);
  }
}
