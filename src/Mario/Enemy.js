import * as Enjine from "../Enjine/index.js";
import NotchSprite from "./NotchSprite.js";
import Mario from "./index.js";
import Sparkle from "./Sparkle.js";
import Shell from "./Shell.js";

export default class Enemy extends NotchSprite {
	constructor(a, b, c, e, d, f) {
		super();
		this.AirInertia = this.GroundInertia = 0.89;
		this.RunTime = 0;
		this.MayJump = this.OnGround = !1;
		this.YJumpSpeed = this.XJumpSpeed = this.JumpTime = 0;
		this.Width = 4;
		this.Height = 24;
		this.DeadTime = 0;
		this.FlyDeath = !1;
		this.WingTime = 0;
		this.NoFireballDeath = !1;
		this.X = b;
		this.Y = c;
		this.World = a;
		this.Type = d;
		this.Winged = f;
		this.Image = Enjine.Resources.Images.enemies;
		this.XPicO = 8;
		this.YPicO = 31;
		this.AvoidCliffs = this.Type === Enemy.RedKoopa;
		this.NoFireballDeath = this.Type === Enemy.Spiky;
		this.YPic = this.Type;
		if (this.YPic > 1)
			this.Height = 12;
		this.Facing = e;
		if (this.Facing === 0)
			this.Facing = 1;
		this.PicWidth = 16;
	}
	CollideCheck() {
		if (this.DeadTime === 0) {
			var a = Mario.MarioCharacter.X - this.X, b = Mario.MarioCharacter.Y - this.Y;
			if (a > -this.Width * 2 - 4 &&
				a < this.Width * 2 + 4 &&
				b > -this.Height &&
				b < Mario.MarioCharacter.Height)
				if (this.Type !== Enemy.Spiky &&
					Mario.MarioCharacter.Ya > 0 &&
					b <= 0 &&
					(!Mario.MarioCharacter.OnGround ||
						!Mario.MarioCharacter.WasOnGround))
					if ((Mario.MarioCharacter.Stomp(this), this.Winged))
						(this.Winged = !1), (this.Ya = 0);
					else {
						this.YPicO = 7;
						this.PicHeight = 8;
						if (this.SpriteTemplate !== undefined)
							this.SpriteTemplate.IsDead = !0;
						this.DeadTime = 10;
						this.Winged = !1;
						this.Type === Enemy.RedKoopa
							? this.World.AddSprite(
								new Shell(this.World, this.X, this.Y, 0)
							)
							: this.Type === Enemy.GreenKoopa &&
							this.World.AddSprite(
								new Shell(this.World, this.X, this.Y, 1)
							);
					}

				else
					Mario.MarioCharacter.GetHurt();
		}
	}
	Move() {
		var a = 0, a = 0;
		this.WingTime++;
		if (this.DeadTime > 0) {
			this.DeadTime--;
			if (this.DeadTime === 0) {
				this.DeadTime = 1;
				for (a = 0; a < 8; a++)
					this.World.AddSprite(
						new Sparkle(
							this.World,
							((this.X + Math.random() * 16 - 8) | 0) + 4,
							((this.Y - Math.random() * 8) | 0) + 4,
							Math.random() * 2 - 1,
							Math.random() * -1,
							0,
							1,
							5
						)
					);
				this.World.RemoveSprite(this);
			}
			this.FlyDeath &&
				((this.X += this.Xa),
					(this.Y += this.Ya),
					(this.Ya *= 0.95),
					(this.Ya += 1));
		} else {
			if (this.Xa > 2)
				this.Facing = 1;
			if (this.Xa < -2)
				this.Facing = -1;
			this.Xa = this.Facing * 1.75;
			this.MayJump = this.OnGround;
			this.XFlip = this.Facing === -1;
			this.RunTime += Math.abs(this.Xa) + 5;
			a = ((this.RunTime / 20) | 0) % 2;
			this.OnGround || (a = 1);
			if (!this.SubMove(this.Xa, 0))
				this.Facing = -this.Facing;
			this.OnGround = !1;
			this.SubMove(0, this.Ya);
			this.Ya *= this.Winged ? 0.95 : 0.85;
			this.Xa *= this.OnGround ? this.GroundInertia : this.AirInertia;
			if (this.OnGround) {
				if (this.Winged)
					this.Ya = -10;
			}
			else
				this.Ya += this.Winged ? 0.6 : 2;
			this.Winged && (a = ((this.WingTime / 4) | 0) % 2);
			this.XPic = a;
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
				(c = !0),
				this.AvoidCliffs &&
				this.OnGround &&
				!this.World.Level.IsBlocking(
					((this.X + this.Xa + this.Width) / 16) | 0,
					(this.Y / 16 + 1) | 0,
					this.Xa,
					1
				) &&
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
				(c = !0),
				this.AvoidCliffs &&
				this.OnGround &&
				!this.World.Level.IsBlocking(
					((this.X + this.Xa - this.Width) / 16) | 0,
					(this.Y / 16 + 1) | 0,
					this.Xa,
					1
				) &&
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
	ShellCollideCheck(a) {
		if (this.DeadTime !== 0)
			return !1;
		var b = a.X - this.X, c = a.Y - this.Y;
		if (b > -16 && b < 16 && c > -this.Height && c < a.Height) {
			Enjine.Resources.PlaySound("kick");
			this.Xa = a.Facing * 2;
			this.Ya = -5;
			this.FlyDeath = !0;
			if (this.SpriteTemplate !== undefined)
				this.SpriteTemplate.IsDead = !0;
			this.DeadTime = 100;
			this.Winged = !1;
			return (this.YFlip = !0);
		}
		return !1;
	}
	FireballCollideCheck(a) {
		if (this.DeadTime !== 0)
			return !1;
		var b = a.X - this.X, c = a.Y - this.Y;
		if (b > -16 && b < 16 && c > -this.Height && c < a.Height) {
			if (this.NoFireballDeath)
				return !0;
			Enjine.Resources.PlaySound("kick");
			this.Xa = a.Facing * 2;
			this.Ya = -5;
			this.FlyDeath = !0;
			if (this.SpriteTemplate !== undefined)
				this.SpriteTemplate.IsDead = !0;
			this.DeadTime = 100;
			this.Winged = !1;
			return (this.YFlip = !0);
		}
	}
	BumpCheck(a, b) {
		if (this.DeadTime === 0 &&
			this.X + this.Width > a * 16 &&
			this.X - this.Width < a * 16 + 16 &&
			(b === (this.Y - 1) / 16) | 0) {
			Enjine.Resources.PlaySound("kick");
			this.Xa = -Mario.MarioCharacter.Facing * 2;
			this.Ya = -5;
			this.FlyDeath = !0;
			if (this.SpriteTemplate !== undefined)
				this.SpriteTemplate.IsDead = !0;
			this.DeadTime = 100;
			this.Winged = !1;
			this.YFlip = !0;
		}
	}
	Draw(a, b) {
		var c = 0, e = 0;
		if (this.Winged &&
			((c =
				((this.XOld + (this.X - this.XOld) * this.Delta) | 0) - this.XPicO),
				(e =
					((this.YOld + (this.Y - this.YOld) * this.Delta) | 0) - this.YPicO),
				this.Type !== Enemy.RedKoopa &&
				this.Type !== Enemy.GreenKoopa))
			(this.XFlip = !this.XFlip),
				a.save(),
				a.scale(this.XFlip ? -1 : 1, this.YFlip ? -1 : 1),
				a.translate(this.XFlip ? -320 : 0, this.YFlip ? -240 : 0),
				a.drawImage(
					this.Image,
					(((this.WingTime / 4) | 0) % 2) * 16,
					128,
					16,
					32,
					this.XFlip ? 320 - c - 24 : c - 8,
					this.YFlip ? 240 - e - 32 : e - 8,
					16,
					32
				),
				a.restore(),
				(this.XFlip = !this.XFlip);
		this.SubDraw(a, b);
		this.Winged &&
			((c =
				((this.XOld + (this.X - this.XOld) * this.Delta) | 0) - this.XPicO),
				(e =
					((this.YOld + (this.Y - this.YOld) * this.Delta) | 0) - this.YPicO),
				this.Type === Enemy.RedKoopa &&
					this.Type === Enemy.GreenKoopa
					? (a.save(),
						a.scale(this.XFlip ? -1 : 1, this.YFlip ? -1 : 1),
						a.translate(this.XFlip ? -320 : 0, this.YFlip ? -240 : 0),
						a.drawImage(
							this.Image,
							(((this.WingTime / 4) | 0) % 2) * 16,
							128,
							16,
							32,
							this.XFlip ? 320 - c - 24 : c - 8,
							this.YFlip ? 240 - e : e - 8,
							16,
							32
						))
					: (a.save(),
						a.scale(this.XFlip ? -1 : 1, this.YFlip ? -1 : 1),
						a.translate(this.XFlip ? -320 : 0, this.YFlip ? -240 : 0),
						a.drawImage(
							this.Image,
							(((this.WingTime / 4) | 0) % 2) * 16,
							128,
							16,
							32,
							this.XFlip ? 320 - c - 24 : c - 8,
							this.YFlip ? 240 - e - 32 : e - 8,
							16,
							32
						)),
				a.restore());
	}
	SubDraw = super.Draw;
	static RedKoopa = 0;
	static GreenKoopa = 1;
	static Goomba = 2;
	static Spiky = 3;
	static Flower = 4;
}
