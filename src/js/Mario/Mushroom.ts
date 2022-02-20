import * as Enjine from "../Enjine/index.js";
import { NotchSprite } from "./NotchSprite";
import Mario from "./index.js";
import { LevelState } from "./LevelState.js";

export class Mushroom extends NotchSprite {
	RunTime: number;
	AirInertia: number;
	GroundInertia: number;
	OnGround: boolean;
	Width: number;
	Height: number;
	Facing: number;
	Life: number;
	JumpTime: number = 0;
	constructor(public World: LevelState, public X: number, public Y: number) {
		super(Enjine.Resources.Images?.items as HTMLImageElement);
		this.RunTime = 0;
		this.AirInertia = this.GroundInertia = .89;
		this.OnGround = !1;
		this.Width = 4;
		this.Height = 24;
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
			this.IsBlocking(x - this.Width, y, a, 0) ||
			this.IsBlocking(x + this.Width, y, a, 0) ||
			this.IsBlocking(x - this.Width, y + 1, a, b) ||
			this.IsBlocking(x + this.Width, y + 1, a, b)
		))
			c = !0;
		if (b < 0 && (
			this.IsBlocking(x, y - this.Height, a, b) || c ||
			this.IsBlocking(x - this.Width, y - this.Height, a, b) || c ||
			this.IsBlocking(x + this.Width, y - this.Height, a, b)
		))
			c = !0;
		if (a > 0 && (
			this.IsBlocking(x + this.Width, y - this.Height, a, b) ||
			this.IsBlocking(x + this.Width, y - (this.Height / 2 | 0), a, b) ||
			this.IsBlocking(x + this.Width, y, a, b)
		))
			c = !0;
		if (a < 0 && (
			this.IsBlocking(x - this.Width, y - this.Height, a, b) ||
			this.IsBlocking(x - this.Width, y - (this.Height / 2 | 0), a, b) ||
			this.IsBlocking(x - this.Width, y, a, b)
		))
			c = !0;
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
	IsBlocking(a: number, b: number, c: any, e: number) {
		a = a / 16 | 0;
		b = b / 16 | 0;
		if (a === (this.X / 16 | 0) && b === (this.Y / 16 | 0))
			return !1;
		return this.World.Level?.IsBlocking(a, b, c);
	}
	BumpCheck(a: number, b: number) {
		if (this.X + this.Width > a * 16 && this.X - this.Width < a * 16 - 16 && b === ((b - 1) / 16 | 0)) {
			this.Facing = -Mario.MarioCharacter.Facing;
			this.Ya = -10;
		}
	}
}
