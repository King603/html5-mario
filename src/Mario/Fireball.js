import * as Enjine from "../Enjine/index.js";
import NotchSprite from "./NotchSprite.js";
import Sparkle from "./Sparkle.js";

export default class extends NotchSprite {
	constructor(a, b, c, e) {
		super();
		this.AirInertia = this.GroundInertia = 0.89;
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
		var a = 0;
		if (this.DeadTime > 0) {
			for (a = 0; a < 8; a++)
				this.World.AddSprite(
					new Sparkle(
						this.World,
						((this.X + Math.random() * 8 - 4) | 0) + 4,
						((this.Y + Math.random() * 8 - 4) | 0) + 2,
						Math.random() * 2 - 1 * this.Facing,
						Math.random() * 2 - 1,
						0,
						1,
						5
					)
				);
			this.World.RemoveSprite(this);
		} else {
			this.Facing != 0 && this.Anim++;
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
			this.Ya *= 0.95;
			this.Xa *= this.OnGround ? this.GroundInertia : this.AirInertia;
			this.OnGround || (this.Ya += 1.5);
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
					(this.Ya = 0);
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
	Die() {
		this.Dead = !0;
		this.Xa = -this.Facing * 2;
		this.Ya = -5;
		this.DeadTime = 100;
	}
}
