import * as Enjine from "../Enjine/index.js";
import { NotchSprite } from "./NotchSprite.js";
import Mario from "./index.js";
import { Shell } from "./Shell.js";
import { Sparkle } from "./Sparkle.js";
import { LevelState } from "./LevelState.js";

export class Enemy extends NotchSprite {
	AirInertia = .89;
	GroundInertia = .89;
	RunTime = 0;
	MayJump = !1;
	OnGround = !1;
	YJumpSpeed = 0;
	XJumpSpeed = 0;
	JumpTime = 0;
	Width = 4;
	Height = 24;
	DeadTime = 0;
	FlyDeath = !1;
	WingTime = 0;
	NoFireballDeath = !1;
	AvoidCliffs: boolean;
	constructor(public World: LevelState, public X: number, public Y: number, public Facing: number, public Type: number, public Winged: boolean) {
		super(Enjine.Resources.Images?.enemies as HTMLImageElement);
		this.XPicO = 8;
		this.YPicO = 31;
		this.AvoidCliffs = this.Type === Enemy.RedKoopa;
		this.NoFireballDeath = this.Type === Enemy.Spiky;
		this.YPic = this.Type;
		if (this.YPic > 1)
			this.Height = 12;
		if (this.Facing === 0)
			this.Facing = 1;
		this.PicWidth = 16;
	}
	CollideCheck() {
		if (this.DeadTime === 0) {
			let a = Mario.MarioCharacter.X - this.X, b = Mario.MarioCharacter.Y - this.Y;
			if (a > -this.Width * 2 - 4 && a < this.Width * 2 + 4 && b > -this.Height && b < Mario.MarioCharacter.Height)
				if (this.Type !== Enemy.Spiky && Mario.MarioCharacter.Ya > 0 && b <= 0 && (!Mario.MarioCharacter.OnGround || !Mario.MarioCharacter.WasOnGround))
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
							case Enemy.RedKoopa: this.World.AddSprite(new Shell(this.World, this.X, this.Y, 0)); break;
							case Enemy.GreenKoopa: this.World.AddSprite(new Shell(this.World, this.X, this.Y, 1)); break;
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
					this.World.AddSprite(new Sparkle(
						this.World,
						(this.X + Math.random() * 16 - 8 | 0) + 4,
						(this.Y - Math.random() * 8 | 0) + 4,
						Math.random() * 2 - 1,
						Math.random() * -1
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
	SubMove(a: number, b: number) {
		let c = !1;
		while (a > 8) {
			if (!this.SubMove(8, 0))
				return !1;
			a -= 8;
		}
		while (a < -8) {
			if (!this.SubMove(-8, 0))
				return !1;
			a += 8;
		}
		while (b > 8) {
			if (!this.SubMove(0, 8))
				return !1;
			b -= 8;
		}
		while (b < -8) {
			if (!this.SubMove(0, -8))
				return !1;
			b += 8;
		}
		let x = this.X + a;
		let y = this.Y + b;
		if (b > 0 && (
			this.IsBlocking(x - this.Width, y, a) ||
			this.IsBlocking(x + this.Width, y, a) ||
			this.IsBlocking(x - this.Width, y + 1, a) ||
			this.IsBlocking(x + this.Width, y + 1, a)
		))
			c = !0;
		if (b < 0 && (
			this.IsBlocking(x, y - this.Height, a) || c ||
			this.IsBlocking(x - this.Width, y - this.Height, a) || c ||
			this.IsBlocking(x + this.Width, y - this.Height, a)
		))
			c = !0;
		if (a > 0 && (
			this.IsBlocking(x + this.Width, y - this.Height, a) ||
			this.IsBlocking(x + this.Width, y - (this.Height / 2 | 0), a) ||
			this.IsBlocking(x + this.Width, y, a) ||
			(this.AvoidCliffs && this.OnGround && !this.World.Level?.IsBlocking((this.X + this.Xa + this.Width) / 16 | 0, this.Y / 16 + 1 | 0, this.Xa))
		))
			c = !0;
		if (a < 0 && (
			this.IsBlocking(x - this.Width, y - this.Height, a) ||
			this.IsBlocking(x - this.Width, y - (this.Height / 2 | 0), a) ||
			this.IsBlocking(x - this.Width, y, a) ||
			(this.AvoidCliffs && this.OnGround && !this.World.Level?.IsBlocking((this.X + this.Xa - this.Width) / 16 | 0, this.Y / 16 + 1 | 0, this.Xa))
		))
			c = !0;
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
	IsBlocking(a: number, b: number, c: number) {
		a = a / 16 | 0;
		b = b / 16 | 0;
		if (a === (this.X / 16 | 0) && b === (this.Y / 16 | 0))
			return !1;
		return this.World.Level?.IsBlocking(a, b, c);
	}
	ShellCollideCheck(a: { X: number; Y: number; Height: number; Facing: number; }) {
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
	FireballCollideCheck(a: { X: number; Y: number; Height: number; Facing: number; }) {
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
	BumpCheck(x: number, y: number) {
		if (this.DeadTime === 0 && this.X + this.Width > x * 16 && this.X - this.Width < x * 16 + 16 && y === ((this.Y - 1) / 16 | 0)) {
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
	Draw(ctx: CanvasRenderingContext2D) {
		if (this.Winged) {
			let c = (this.XOld + (this.X - this.XOld) * this.Delta | 0) - this.XPicO;
			let e = (this.YOld + (this.Y - this.YOld) * this.Delta | 0) - this.YPicO;
			if (this.Type !== Enemy.RedKoopa && this.Type !== Enemy.GreenKoopa) {
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
					this.XFlip ? 320 - c - 24 : c - 8,
					this.YFlip ? 240 - e - 32 : e - 8,
					16,
					32
				);
				ctx.restore();
				this.XFlip = !this.XFlip;
			}
		}
		this.SubDraw(ctx);
		if (this.Winged) {
			let c = (this.XOld + (this.X - this.XOld) * this.Delta | 0) - this.XPicO;
			let e = (this.YOld + (this.Y - this.YOld) * this.Delta | 0) - this.YPicO;
			ctx.save();
			ctx.scale(this.XFlip ? -1 : 1, this.YFlip ? -1 : 1);
			ctx.translate(this.XFlip ? -320 : 0, this.YFlip ? -240 : 0);
			ctx.drawImage(this.Image, (this.WingTime / 4 | 0) % 2 * 16, 128, 16, 32, this.XFlip ? 320 - c - 24 : c - 8, this.YFlip ? 240 - e - (this.Type === Enemy.RedKoopa && this.Type === Enemy.GreenKoopa ? 0 : 32) : e - 8, 16, 32);
			ctx.restore();
		}
	}
	static RedKoopa = 0;
	static GreenKoopa = 1;
	static Goomba = 2;
	static Spiky = 3;
	static Flower = 4;
}
