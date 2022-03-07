import * as Enjine from "../Enjine/index.js";
import NotchSprite from "./NotchSprite.js";
import Tile from "./Tile.js";
import Enemy from "./Enemy.js";
import Fireball from "./Fireball.js";
import Sparkle from "./Sparkle.js";
import BulletBill from "./BulletBill.js";
import Shell from "./Shell.js";

export default class extends NotchSprite {
	constructor(img) {
		super();
		this.Image = img
		this.Fire = this.Large = !1;
		this.Coins = 0;
		this.Lives = 3;
		this.LevelString = "none";
		this.AirInertia = this.GroundInertia = 0.89;
		this.RunTime = 0;
		this.Sliding =
			this.Ducking =
			this.MayJump =
			this.OnGround =
			this.WasOnGround =
			!1;
		this.YJumpSpeed = this.XJumpSpeed = this.JumpTime = 0;
		this.CanShoot = !1;
		this.Width = 4;
		this.Height = 24;
		this.World = undefined;
		this.InvulnerableTime =
			this.WinTime =
			this.DeathTime =
			this.YDeathPos =
			this.XDeathPos =
			this.PowerUpTime =
			this.Facing =
			0;
		this.Carried = undefined;
		this.NewFire = this.NewLarge = this.LastFire = this.LastLarge = !1;
	}
	Initialize(a) {
		this.World = a;
		this.X = 32;
		this.RunTime = this.PowerUpTime = this.Y = 0;
		this.Sliding =
			this.Ducking =
			this.MayJump =
			this.OnGround =
			this.WasOnGround =
			!1;
		this.YJumpSpeed = this.XJumpSpeed = this.JumpTime = 0;
		this.CanShoot = !1;
		this.Width = 4;
		this.Height = 24;
		this.World = a;
		this.InvulnerableTime =
			this.WinTime =
			this.DeathTime =
			this.YDeathPos =
			this.XDeathPos =
			this.PowerUpTime =
			this.Facing =
			0;
		this.Carried = undefined;
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
		this.Large
			? ((this.Image = this.Fire
				? Enjine.Resources.Images.fireMario
				: Enjine.Resources.Images.mario),
				(this.XPicO = 16),
				(this.YPicO = 31),
				(this.PicWidth = this.PicHeight = 32))
			: ((this.Image = Enjine.Resources.Images.smallMario),
				(this.XPicO = 8),
				(this.YPicO = 15),
				(this.PicWidth = this.PicHeight = 16));
	}
	Move() {
		if (this.WinTime > 0) {
			this.WinTime++;
			this.Ya = this.Xa = 0;
		} else if (this.DeathTime > 0) {
			this.DeathTime++;
			this.DeathTime < 11
				? this.Ya = this.Xa = 0
				: this.DeathTime === 11
					? this.Ya = -15
					: this.Ya += 2;
			(this.X += this.Xa);
			(this.Y += this.Ya);
		} else if (this.PowerUpTime !== 0) {
			this.PowerUpTime > 0
				? (this.PowerUpTime--, this.Blink((((this.PowerUpTime / 3) | 0) & 1) === 0))
				: (this.PowerUpTime++, this.Blink((((-this.PowerUpTime / 3) | 0) & 1) === 0));
			if (this.PowerUpTime === 0)
				this.World.Paused = !1;
			this.CalcPic();
		} else {
			this.InvulnerableTime > 0 && this.InvulnerableTime--;
			this.Visible = (((this.InvulerableTime / 2) | 0) & 1) === 0;
			this.WasOnGround = this.OnGround;
			var a = Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.A) ? 1.2 : 0.6;
			if (this.OnGround)
				this.Ducking =
					Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.Down) && this.Large
						? !0
						: !1;
			if (this.Xa > 2)
				this.Facing = 1;
			if (this.Xa < -2)
				this.Facing = -1;
			if (Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.S) ||
				(this.JumpTime < 0 && !this.OnGround && !this.Sliding)) {
				if (this.JumpTime < 0)
					(this.Xa = this.XJumpSpeed),
						(this.Ya = -this.JumpTime * this.YJumpSpeed),
						this.JumpTime++;
				else if (this.OnGround && this.MayJump)
					Enjine.Resources.PlaySound("jump"),
						(this.XJumpSpeed = 0),
						(this.YJumpSpeed = -1.9),
						(this.JumpTime = 7),
						(this.Ya = this.JumpTime * this.YJumpSpeed),
						(this.Sliding = this.OnGround = !1);
				else if (this.Sliding && this.MayJump)
					Enjine.Resources.PlaySound("jump"),
						(this.XJumpSpeed = -this.Facing * 6),
						(this.YJumpSpeed = -2),
						(this.JumpTime = -6),
						(this.Xa = this.XJumpSpeed),
						(this.Ya = -this.JumpTime * this.YJumpSpeed),
						(this.Sliding = this.OnGround = !1),
						(this.Facing = -this.Facing);
				else {
					if (this.JumpTime > 0)
						(this.Xa += this.XJumpSpeed),
							(this.Ya = this.JumpTime * this.YJumpSpeed),
							this.JumpTime--;
				}

			} else {
				this.JumpTime = 0;
			}
			if (Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.Left) &&
				!this.Ducking) {
				if (this.Facing === 1)
					this.Sliding = !1;
				this.Xa -= a;
				if (this.JumpTime >= 0)
					this.Facing = -1;
			}
			if (Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.Right) &&
				!this.Ducking) {
				if (this.Facing === -1)
					this.Sliding = !1;
				this.Xa += a;
				if (this.JumpTime >= 0)
					this.Facing = 1;
			}
			if ((!Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.Left) &&
				!Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.Right)) ||
				this.Ducking ||
				this.Ya < 0 ||
				this.OnGround) {
				this.Sliding = !1;
			}
			Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.A) &&
				this.CanShoot &&
				this.Fire &&
				this.World.FireballsOnScreen < 2 &&
				(Enjine.Resources.PlaySound("fireball"),
					this.World.AddSprite(
						new Fireball(
							this.World,
							this.X + this.Facing * 6,
							this.Y - 20,
							this.Facing
						)
					));
			this.CanShoot = !Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.A);
			this.MayJump = (this.OnGround || this.Sliding) && !Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.S);
			this.XFlip = this.Facing === -1;
			this.RunTime += Math.abs(this.Xa) + 5;
			if (Math.abs(this.Xa) < 0.5)
				this.Xa = this.RunTime = 0;
			this.CalcPic();
			this.Sliding &&
				(this.World.AddSprite(
					new Sparkle(
						this.World,
						((this.X + Math.random() * 4 - 2) | 0) + this.Facing * 8,
						((this.Y + Math.random() * 4) | 0) - 24,
						Math.random() * 2 - 1,
						Math.random(),
						0,
						1,
						5
					)
				),
					(this.Ya *= 0.5));
			this.OnGround = !1;
			this.SubMove(this.Xa, 0);
			this.SubMove(0, this.Ya);
			this.Y > this.World.Level.Height * 16 + 16 && this.Die();
			if (this.X < 0)
				this.Xa = this.X = 0;
			this.X > this.World.Level.ExitX * 16 && this.Win();
			if (this.X > this.World.Level.Width * 16)
				(this.X = this.World.Level.Width * 16), (this.Xa = 0);
			this.Ya *= 0.85;
			this.Xa *= this.OnGround ? this.GroundInertia : this.AirInertia;
			this.OnGround || (this.Ya += 3);
			if (this.Carried !== undefined &&
				((this.Carried.X *= this.X + this.Facing * 8),
					(this.Carried.Y *= this.Y - 2),
					!Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.A)))
				this.Carried.Release(this), (this.Carried = undefined);
		}
	}
	CalcPic() {
		var a = 0, b = 0;
		this.Large
			? (
				(a = ((this.RunTime / 20) | 0) % 4),
				a === 3 && (a = 1),
				this.Carried === undefined && Math.abs(this.Xa) > 10 && (a += 3),
				this.Carried !== undefined && (a += 10),
				this.OnGround ||
				(a = this.Carried !== undefined ? 12 : Math.abs(this.Xa) > 10 ? 7 : 6)
			)
			: (
				(a = ((this.RunTime / 20) | 0) % 2),
				this.Carried === undefined && Math.abs(this.Xa) > 10 && (a += 2),
				this.Carried !== undefined && (a += 8),
				this.OnGround ||
				(a = this.Carried !== undefined ? 9 : Math.abs(this.Xa) > 10 ? 5 : 4)
			);
		if (this.OnGround &&
			((this.Facing === -1 && this.Xa > 0) ||
				(this.Facing === 1 && this.Xa < 0))) {
			if (this.Xa > 1 || this.Xa < -1) {
				a = this.Large ? 9 : 7;
			}
			if (this.Xa > 3 || this.Xa < -3) {
				for (b = 0; b < 3; b++) {
					this.World.AddSprite(
						new Sparkle(
							this.World,
							(this.X + Math.random() * 8 - 4) | 0,
							(this.Y + Math.random() * 4) | 0,
							Math.random() * 2 - 1,
							Math.random() * -1,
							0,
							1,
							5
						)
					);
				}
			}
		}
		this.Large
			? (this.Ducking && (a = 14), (this.Height = this.Ducking ? 12 : 24))
			: (this.Height = 12);
		this.XPic = a;
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
		if (b > 0) {
			(this.IsBlocking(this.X + a - this.Width, this.Y + b, a, 0)
				? (c = !0)
				: this.IsBlocking(this.X + a + this.Width, this.Y + b, a, 0)
					? (c = !0)
					: this.IsBlocking(this.X + a - this.Width, this.Y + b + 1, a, b)
						? (c = !0)
						: this.IsBlocking(this.X + a + this.Width, this.Y + b + 1, a, b) &&
						(c = !0));
		} else if (b < 0) {
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
		}
		if (a > 0) {
			(this.Sliding = !0),
				this.IsBlocking(
					this.X + a + this.Width,
					this.Y + b - this.Height,
					a,
					b
				)
					? (c = !0)
					: (this.Sliding = !1),
				this.IsBlocking(
					this.X + a + this.Width,
					this.Y + b - ((this.Height / 2) | 0),
					a,
					b
				)
					? (c = !0)
					: (this.Sliding = !1),
				this.IsBlocking(this.X + a + this.Width, this.Y + b, a, b)
					? (c = !0)
					: (this.Sliding = !1);
		} else if (a < 0) {
			(this.Sliding = !0),
				this.IsBlocking(
					this.X + a - this.Width,
					this.Y + b - this.Height,
					a,
					b
				)
					? (c = !0)
					: (this.Sliding = !1),
				this.IsBlocking(
					this.X + a - this.Width,
					this.Y + b - ((this.Height / 2) | 0),
					a,
					b
				)
					? (c = !0)
					: (this.Sliding = !1),
				this.IsBlocking(this.X + a - this.Width, this.Y + b, a, b)
					? (c = !0)
					: (this.Sliding = !1);
		}
		if (c) {
			if (a < 0) {
				this.X = (((this.X - this.Width) / 16) | 0) * 16 + this.Width;
				this.Xa = 0;
			} else if (a > 0) {
				this.X = (((this.X + this.Width) / 16 + 1) | 0) * 16 - this.Width - 1;
				this.Xa = 0;
			}
			if (b < 0) {
				this.Y = (((this.Y - this.Height) / 16) | 0) * 16 + this.Height;
				this.Ya = this.JumpTime = 0;
			} else if (b > 0) {
				this.Y = (((this.Y - 1) / 16 + 1) | 0) * 16 - 1;
				this.OnGround = !0;
			}
			return !1;
		}
		this.X += a;
		this.Y += b;
		return !0;
	}
	IsBlocking(a, b, c, e) {
		a = (a / 16) | 0;
		b = (b / 16) | 0;
		if (a === ((this.X / 16) | 0) && b === ((this.Y / 16) | 0))
			return !1;
		if ((Tile.Behaviors[this.World.Level.GetBlock(a, b) & 255] & Tile.PickUpable) > 0) {
			this.GetCoin();
			Enjine.Resources.PlaySound("coin");
			this.World.Level.SetBlock(a, b, 0);
			for (let d = 0; d < 2; d++) {
				for (let f = 0; f < 2; f++) {
					this.World.AddSprite(
						new Sparkle(
							this.World,
							a * 16 + d * 8 + ((Math.random() * 8) | 0),
							b * 16 + f * 8 + ((Math.random() * 8) | 0),
							0,
							0,
							0,
							2,
							5
						)
					);
				}
			}
		}
		let d = this.World.Level.IsBlocking(a, b, c, e);
		(d) && e < 0 && this.World.Bump(a, b, this.Large);
		return d;
	}
	Stomp(a) {
		if (!(this.DeathTime > 0 || this.World.Paused)) {
			this.SubMove(0, a.Y - a.Height / 2 - this.Y);
			if (a instanceof Enemy || a instanceof BulletBill) {
				Enjine.Resources.PlaySound("kick");
				this.XJumpSpeed = 0;
				this.YJumpSpeed = -1.9;
				this.JumpTime = 8;
				this.Ya = this.JumpTime * this.YJumpSpeed;
				this.Sliding = this.OnGround = !1;
				this.InvulnerableTime = 1;
			} else if (a instanceof Shell) {
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
		if (!(this.DeathTime > 0 || this.World.Paused) && !(this.InvulnerableTime > 0)) {
			if (this.Large) {
				this.World.Paused = !0;
				this.PowerUpTime = -18;
				Enjine.Resources.PlaySound("powerdown");
				this.Fire ? this.SetLarge(!0, !1) : this.SetLarge(!1, !1);
				this.InvulnerableTime = 32;
			} else {
				this.Die();
			}
		}
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
		if (!(this.DeathTime > 0 && this.World.Paused)) {
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
	}
	GetMushroom() {
		if (!(this.DeathTime > 0 && this.World.Paused)) {
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
	}
	Kick(a) {
		if (!(this.DeathTime > 0 && this.World.Paused)) {
			if (Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.A)) {
				this.Carried = a;
				a.Carried = !0;
			} else {
				Enjine.Resources.PlaySound("kick");
				this.InvulnerableTime = 1;
			}
		}
	}
	Get1Up() {
		Enjine.Resources.PlaySound("1up");
		if (++this.Lives === 99) {
			this.Lives = 99;
		}
	}
	GetCoin() {
		if (++this.Coins === 100) {
			this.Coins = 0;
			this.Get1Up();
		}
	}
}
