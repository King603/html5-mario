import * as Enjine from "../Enjine/index.js";
import { NotchSprite } from "./NotchSprite.js";
import { Sparkle } from "./Sparkle.js";

export class Fireball extends NotchSprite {
	constructor(a, b, c, e) {
		super(Enjine.Resources.Images.particles);
		this.AirInertia = this.GroundInertia = .89;
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
				this.World.AddSprite(new Sparkle(this.World, (
					this.X + Math.random() * 8 - 4 | 0) + 4,
					(this.Y + Math.random() * 8 - 4 | 0) + 2,
					Math.random() * 2 - 1 * this.Facing,
					Math.random() * 2 - 1, 0, 1, 5
				));
			this.World.RemoveSprite(this);
		}
		else {
			if (this.Facing != 0)
				this.Anim++;
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
			this.Ya *= .95;
			this.Xa *= this.OnGround ? this.GroundInertia : this.AirInertia;
			if (!this.OnGround)
				this.Ya += 1.5;
		}
	}
	SubMove(a, b) {
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
