import * as Enjine from "../Enjine/index.js";
import NotchSprite from "./NotchSprite.js";
import Sparkle from "./Sparkle.js";
import Mario from "./index.js";

export default class extends NotchSprite {
	constructor(a, b, c, e) {
		super();
		this.World = a;
		this.X = b;
		this.Y = c;
		this.YPic = e;
		this.Image = Enjine.Resources.Images.enemies;
		this.XPicO = 8;
		this.YPicO = 31;
		this.Width = 4;
		this.Height = 12;
		this.Facing = 0;
		this.PicWidth = 16;
		this.XPic = 4;
		this.Ya = -5;
		this.Dead = !1;
		this.DeadTime = 0;
		this.Carried = !1;
		this.AirInertia = this.GroundInertia = 0.89;
		this.OnGround = !1;
		this.Anim = 0;
	}
	FireballCollideCheck(a) {
		if (this.DeadTime !== 0)
			return !1;
		var b = a.X - this.X, c = a.Y - this.Y;
		if (b > -16 && b < 16 && c > -this.Height && c < a.Height) {
			if (this.Facing !== 0)
				return !0;
			Enjine.Resources.PlaySound("kick");
			this.Xa = a.Facing * 2;
			this.Ya = -5;
			if (this.SpriteTemplate !== undefined)
				this.SpriteTemplate.IsDead = !0;
			this.DeadTime = 100;
			return (this.YFlip = !0);
		}
		return !1;
	}
	CollideCheck() {
		if (!this.Carried && !(this.Dead || this.DeadTime > 0)) {
			var a = Mario.MarioCharacter.X - this.X, b = Mario.MarioCharacter.Y - this.Y;
			if (a > -16 &&
				a < 16 &&
				b > -this.Height &&
				b < Mario.MarioCharacter.Height)
				Mario.MarioCharacter.Ya > 0 &&
					b <= 0 &&
					(!Mario.MarioCharacter.OnGround ||
						!Mario.MarioCharacter.WasOnGround)
					? (Mario.MarioCharacter.Stomp(this),
						(this.Facing =
							this.Facing !== 0
								? (this.Xa = 0)
								: Mario.MarioCharacter.Facing))
					: this.Facing !== 0
						? Mario.MarioCharacter.GetHurt()
						: (Mario.MarioCharacter.Kick(this),
							(this.Facing = Mario.MarioCharacter.Facing));
		}
	}
	Move() {
		var a = 0;
		if (this.Carried)
			this.World.CheckShellCollide(this);
		else if (this.DeadTime > 0) {
			this.DeadTime--;
			if (this.DeadTime === 0) {
				this.DeadTime = 1;
				for (a = 0; a < 8; a++)
					this.World.AddSprite(
						new Sparkle(
							((this.X + Math.random() * 16 - 8) | 0) + 4,
							((this.Y + Math.random() * 8) | 0) + 4,
							Math.random() * 2 - 1,
							Math.random() * -1,
							0,
							1,
							5
						)
					);
				this.World.RemoveSprite(this);
			}
			this.X += this.Xa;
			this.Y += this.Ya;
			this.Ya *= 0.95;
			this.Ya += 1;
		} else {
			this.Facing !== 0 && this.Anim++;
			if (this.Xa > 2)
				this.Facing = 1;
			if (this.Xa < -2)
				this.Facing = -1;
			this.Xa = this.Facing * 11;
			this.Facing !== 0 && this.World.CheckShellCollide(this);
			this.XFlip = this.Facing === -1;
			this.XPic = (((this.Anim / 2) | 0) % 4) + 3;
			if (!this.SubMove(this.Xa, 0))
				Enjine.Resources.PlaySound("bump"), (this.Facing = -this.Facing);
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
		if (a === ((this.X / 16) | 0) && b === ((this.Y / 16) | 0))
			return !1;
		var d = this.World.Level.IsBlocking(a, b, c, e);
		d && e === 0 && c !== 0 && this.World.Bump(a, b, !0);
		return d;
	}
	BumpCheck(a, b) {
		if (this.X + this.Width > a * 16 &&
			this.X - this.Width < a * 16 + 16 &&
			b === (((this.Y - 1) / 16) | 0))
			(this.Facing = -Mario.MarioCharacter.Facing), (this.Ya = -10);
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
		var b = a.X - this.X, c = a.Y - this.Y;
		if (b > -16 && b < 16 && c > -this.Height && c < a.Height) {
			Enjine.Resources.PlaySound("kick");
			if (Mario.MarioCharacter.Carried === a ||
				Mario.MarioCharacter.Carried === this)
				Mario.MarioCharacter.Carried = undefined;
			this.Die();
			a.Die();
			return !0;
		}
		return !1;
	}
	Release() {
		this.Carried = !1;
		this.Facing = Mario.MarioCharacter.Facing;
		this.X += this.Facing * 8;
	}
}
