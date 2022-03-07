import * as Enjine from "../Enjine/index.js";
import NotchSprite from "./NotchSprite.js";
import Mario from "./index.js";

export default class extends NotchSprite {
	constructor(a, b, c) {
		super();
		this.RunTime = 0;
		this.AirInertia = this.GroundInertia = 0.89;
		this.OnGround = !1;
		this.Width = 4;
		this.Height = 24;
		this.World = a;
		this.X = b;
		this.Y = c;
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
		var a = Mario.MarioCharacter.X - this.X, b = Mario.MarioCharacter.Y - this.Y;
		a > -16 &&
			a < 16 &&
			b > -this.Height &&
			b < Mario.MarioCharacter.Height &&
			(Mario.MarioCharacter.GetMushroom(), this.World.RemoveSprite(this));
	}
	Move() {
		if (this.Life < 9)
			(this.Layer = 0), this.Y--, this.Life++;
		else {
			this.Layer = 1;
			if (this.Xa > 2)
				this.Facing = 1;
			if (this.Xa < -2)
				this.Facing = -1;
			this.Xa = this.Facing * 1.75;
			this.XFlip = this.Facing === -1;
			this.RunTime += Math.abs(this.Xa) + 5;
			if (!this.SubMove(this.Xa, 0))
				this.Facing = -this.Facing;
			this.OnGround = !1;
			this.SubMove(0, this.Ya);
			this.Ya *= 0.85;
			this.Xa *= this.OnGround ? this.GroundInertia : this.AirInertia;
			this.OnGround || (this.Ya += 2);
		}
	}
	SubMove(a, b) {
		for (var c = !1; a > 8;) {
			if (!this.SubMove(8, 0))
				return !1;
			a -= 8;
		}
		for (; a < -8;) {
			if (!this.SubMove(-8, 0))
				return !1;
			a += 8;
		}
		for (; b > 8;) {
			if (!this.SubMove(0, 8))
				return !1;
			b -= 8;
		}
		for (; b < -8;) {
			if (!this.SubMove(0, -8))
				return !1;
			b += 8;
		}
		b > 0 &&
			(this.IsBlocking(this.X + a - this.Width, this.Y + b, a, 0)
				? (c = !0)
				: this.IsBlocking(this.X + a + this.Width, this.Y + b, a, 0)
					? (c = !0)
					: this.IsBlocking(this.X + a - this.Width, this.Y + b + 1, a, b)
						? (c = !0)
						: this.IsBlocking(this.X + a + this.Width, this.Y + b + 1, a, b) &&
						(c = !0));
		if (b < 0)
			if (this.IsBlocking(this.X + a, this.Y + b - this.Height, a, b))
				c = !0;
			else if (c ||
				this.IsBlocking(
					this.X + a - this.Width,
					this.Y + b - this.Height,
					a,
					b
				))
				c = !0;
			else if (c ||
				this.IsBlocking(
					this.X + a + this.Width,
					this.Y + b - this.Height,
					a,
					b
				))
				c = !0;
		a > 0 &&
			(this.IsBlocking(
				this.X + a + this.Width,
				this.Y + b - this.Height,
				a,
				b
			) && (c = !0),
				this.IsBlocking(
					this.X + a + this.Width,
					this.Y + b - ((this.Height / 2) | 0),
					a,
					b
				) && (c = !0),
				this.IsBlocking(this.X + a + this.Width, this.Y + b, a, b) &&
				(c = !0));
		a < 0 &&
			(this.IsBlocking(
				this.X + a - this.Width,
				this.Y + b - this.Height,
				a,
				b
			) && (c = !0),
				this.IsBlocking(
					this.X + a - this.Width,
					this.Y + b - ((this.Height / 2) | 0),
					a,
					b
				) && (c = !0),
				this.IsBlocking(this.X + a - this.Width, this.Y + b, a, b) &&
				(c = !0));
		if (c) {
			if (a < 0)
				(this.X = (((this.X - this.Width) / 16) | 0) * 16 + this.Width),
					(this.Xa = 0);
			if (a > 0)
				(this.X =
					(((this.X + this.Width) / 16 + 1) | 0) * 16 - this.Width - 1),
					(this.Xa = 0);
			if (b < 0)
				(this.Y = (((this.Y - this.Height) / 16) | 0) * 16 + this.Height),
					(this.Ya = this.JumpTime = 0);
			if (b > 0)
				(this.Y = (((this.Y - 1) / 16 + 1) | 0) * 16 - 1),
					(this.OnGround = !0);
			return !1;
		}
		else
			return (this.X += a), (this.Y += b), !0;
	}
	IsBlocking(a, b, c, e) {
		a = (a / 16) | 0;
		b = (b / 16) | 0;
		if ((a === this.X / 16) | 0 && (b === this.Y / 16) | 0)
			return !1;
		return this.World.Level.IsBlocking(a, b, c, e);
	}
	BumpCheck(a, b) {
		if (this.X + this.Width > a * 16 &&
			this.X - this.Width < a * 16 - 16 &&
			(b === (b - 1) / 16) | 0)
			(this.Facing = -Mario.MarioCharacter.Facing), (this.Ya = -10);
	}
}
