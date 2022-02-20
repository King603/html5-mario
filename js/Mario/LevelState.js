import * as Enjine from "../Enjine/index.js";
import { BackgroundGenerator } from "./BackgroundGenerator.js";
import { BackgroundRenderer } from "./BackgroundRenderer.js";
import { BulletBill } from "./BulletBill.js";
import { CoinAnim } from "./CoinAnim.js";
import { Fireball } from "./Fireball.js";
import { FireFlower } from "./FireFlower.js";
import Mario from "./index.js";
import { LevelGenerator } from "./LevelGenerator.js";
import { LevelRenderer } from "./LevelRenderer.js";
import { LoseState } from "./LoseState.js";
import { Mushroom } from "./Mushroom.js";
import { Particle } from "./Particle.js";
import { Sparkle } from "./Sparkle.js";
import { SpriteCuts } from "./SpriteCuts.js";
import { Tile } from "./Tile.js";

export class LevelState extends Enjine.GameState {
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
		this.Level = new LevelGenerator(320, 15).CreateLevel(this.LevelType, this.LevelDifficulty);
		this.Paused = !1;
		this.Layer = new LevelRenderer(this.Level, 320, 240);
		this.Sprites = new Enjine.DrawableManager();
		this.Camera = new Enjine.Camera();
		this.Tick = 0;
		this.ShellsToCheck = [];
		this.FireballsToCheck = [];
		this.SpritesToAdd = [];
		this.SpritesToRemove = [];
		this.FontShadow = SpriteCuts.CreateBlackFont();
		this.Font = SpriteCuts.CreateWhiteFont();
		for (let a = 0; a < 2; a++) {
			let b = 4 >> a;
			let c = ((this.Level.Width * 16 - 320) / b | 0) + 320;
			let e = ((this.Level.Height * 16 - 240) / b | 0) + 240;
			c = new BackgroundGenerator(c / 32 + 1, e / 32 + 1, a === 0, this.LevelType);
			this.BgLayer[a] = new BackgroundRenderer(c.CreateLevel(), 320, 240, b);
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
				if (c < -64 || c > 384 || e < -64 || e > 304)
					this.Sprites.RemoveAt(b);
				else if (d instanceof Fireball)
					this.FireballsOnScreen++;
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
					if (d !== 0 && (f = this.Level.GetBlock(c, e), (Tile.Behaviors[f & 255] & Tile.Animated) > 0 && (f % 16 / 4 | 0) === 3 && (f / 16 | 0) === 0 && (this.Tick - c * 2) % 100 === 0)) {
						for (let b = 0; b < 8; b++)
							this.AddSprite(new Sparkle(this, c * 16 + 8, e * 16 + (Math.random() * 16 | 0), Math.random() * d, 0, 0, 1, 5));
						this.AddSprite(new BulletBill(this, c * 16 + 8 + d * 8, e * 16 + 15, d));
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
			if (Obj.Layer === 0)
				Obj.Draw(a, this.Camera);
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
			if (b > 900) {
				Mario.GlobalMapState.LevelWon();
				this.GotoMapState = !0;
			}
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
		if ((Tile.Behaviors[e & 255] & Tile.Bumpable) > 0) {
			this.BumpInto(a, b - 1);
			this.Level.SetBlock(a, b, 4);
			this.Level.SetBlockData(a, b, 4);
			if ((Tile.Behaviors[e & 255] & Tile.Special) > 0) {
				Enjine.Resources.PlaySound("sprout");
				if (Mario.MarioCharacter.Large)
					this.AddSprite(new FireFlower(this, a * 16 + 8, b * 16 + 8));
				else
					this.AddSprite(new Mushroom(this, a * 16 + 8, b * 16 + 8));
			} else {
				Mario.MarioCharacter.GetCoin();
				Enjine.Resources.PlaySound("coin");
				this.AddSprite(new CoinAnim(this, a, b));
			}
		}
		if ((Tile.Behaviors[e & 255] & Tile.Breakable) > 0 && (this.BumpInto(a, b - 1), c)) {
			Enjine.Resources.PlaySound("breakblock");
			this.Level.SetBlock(a, b, 0);
			for (let d = 0; d < 2; d++)
				for (let f = 0; f < 2; f++)
					this.AddSprite(new Particle(this, a * 16 + d * 8 + 4, b * 16 + f * 8 + 4, (d * 2 - 1) * 4, (f * 2 - 1) * 4 - 8));
		}
	};
	BumpInto(a, b) {
		if ((Tile.Behaviors[this.Level.GetBlock(a, b) & 255] & Tile.PickUpable) > 0) {
			Mario.MarioCharacter.GetCoin();
			Enjine.Resources.PlaySound("coin");
			this.Level.SetBlock(a, b, 0);
			this.AddSprite(new CoinAnim(a, b + 1));
		}
		this.Sprites.Objects.forEach(obj => obj.BumpCheck(a, b));
	};
	CheckForChange(a) {
		if (this.GotoLoseState)
			a.ChangeState(new LoseState());
		else if (this.GotoMapState)
			a.ChangeState(Mario.GlobalMapState);
	};
}
