import * as Enjine from "../Enjine/index.js";
import NotchSprite from "./NotchSprite.js";
import Sparkle from "./Sparkle.js";
import Mario from "./index.js";

export default class extends NotchSprite {
	constructor(a, b, c, e) {
		super();
		this.Image = Enjine.Resources.Images.enemies;
		this.World = a;
		this.X = b;
		this.Y = c;
		this.Facing = e;
		this.XPicO = 8;
		this.YPicO = 31;
		this.Height = 12;
		this.Width = 4;
		this.PicWidth = 16;
		this.YPic = 5;
		this.XPic = 0;
		this.Ya = -5;
		this.DeadTime = 0;
		this.Dead = !1;
		this.Anim = 0;
	}
	CollideCheck() {
		if (!this.Dead) {
			var a = Mario.MarioCharacter.X - this.X, b = Mario.MarioCharacter.Y - this.Y;
			if (a > -16 &&
				a < 16 &&
				b > -this.Height &&
				b < this.World.Mario.Height)
				Mario.MarioCharacter.Y > 0 &&
					b <= 0 &&
					(!Mario.MarioCharacter.OnGround ||
						!Mario.MarioCharacter.WasOnGround)
					? (Mario.MarioCharacter.Stomp(this),
						(this.Dead = !0),
						(this.Xa = 0),
						(this.Ya = 1),
						(this.DeadTime = 100))
					: Mario.MarioCharacter.GetHurt();
		}
	}
	Move() {
		var a = 0;
		if (this.DeadTime > 0) {
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
		}

		else
			(this.Xa = this.Facing * 4),
				(this.XFlip = this.Facing === -1),
				this.Move(this.Xa, 0);
	}
	SubMove(a) {
		this.X += a;
		return !0;
	}
	FireballCollideCheck(a) {
		if (this.DeadTime !== 0)
			return !1;
		var b = a.X - this.X, c = a.Y - this.Y;
		if (b > -16 && b < 16 && c > -this.Height && c < a.Height)
			return !0;
		return !1;
	}
	ShellCollideCheck(a) {
		if (this.DeadTime !== 0)
			return !1;
		var b = a.X - this.X, c = a.Y - this.Y;
		if (b > -16 && b < 16 && c > -this.Height && c < a.Height)
			return (
				Enjine.Resources.PlaySound("kick"),
				(this.Dead = !0),
				(this.Xa = 0),
				(this.Ya = 1),
				(this.DeadTime = 100),
				!0
			);
		return !1;
	}
}
